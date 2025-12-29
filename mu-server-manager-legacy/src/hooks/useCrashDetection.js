import React from 'react';

const CRASH_MAX_ATTEMPTS = 3;
const CRASH_COUNTDOWN_SECONDS = 10;
const CRASH_COUNTDOWN_SECONDS_FAST = 5; // Countdown reduzido quando há fila
const CRASH_ATTEMPT_WINDOW_MS = 2 * 60 * 1000; // 2 minutos
const CRASH_DEBOUNCE_MS = 3000; // 3 segundos para evitar dupla detecção

export function useCrashDetection(processes, startOne, showToast) {
  const [crashState, setCrashState] = React.useState(null);
  const [crashQueueLength, setCrashQueueLength] = React.useState(0);
  const crashTimerRef = React.useRef(null);
  const restartAttemptsRef = React.useRef(new Map());
  const processingQueueRef = React.useRef(false);
  const crashQueueRef = React.useRef([]); // Usar ref ao invés de state para fila
  const recentCrashesRef = React.useRef(new Map()); // Debounce para evitar dupla detecção
  const sessionCountdownTimeRef = React.useRef(CRASH_COUNTDOWN_SECONDS); // Countdown fixo para toda a sessão
  
  // Usar ref para sempre ter acesso aos processos atualizados
  const processesRef = React.useRef(processes);
  React.useEffect(() => {
    processesRef.current = processes;
  }, [processes]);

  const attemptAutoRestart = React.useCallback(async (processId, processName, attemptNumber) => {
    console.log('[CrashDetection] Tentando reiniciar:', processId, processName, attemptNumber);
    showToast(`Reiniciando ${processName} automaticamente (tentativa ${attemptNumber}/${CRASH_MAX_ATTEMPTS})...`, 'success');

    const process = processesRef.current.find(p => p.id === processId);
    if (!process) {
      console.error('[CrashDetection] Processo não encontrado:', processId);
      showToast(`Erro: Processo ${processName} não encontrado.`, 'error');
      return;
    }

    try {
      console.log('[CrashDetection] Chamando startOne para:', processId);
      const startResult = await startOne(processId, { hidden: true });
      console.log('[CrashDetection] startOne completou para:', processId, 'resultado:', startResult);
    } catch (error) {
      console.error('[CrashDetection] Erro ao reiniciar:', error);
      showToast(`Erro ao reiniciar ${processName}: ${error?.message || 'Erro desconhecido'}`, 'error');
      // NÃO lança o erro - deixa a fila continuar
    }
  }, [startOne, showToast]);

  const processNextInQueue = React.useCallback(() => {
    const queue = crashQueueRef.current;
    
    if (queue.length === 0) {
      console.log('[CrashDetection] Fila vazia, parando processamento e resetando sessão');
      processingQueueRef.current = false;
      setCrashQueueLength(0);
      // Reseta o countdown da sessão para o padrão
      sessionCountdownTimeRef.current = CRASH_COUNTDOWN_SECONDS;
      return;
    }

    const nextCrash = queue.shift(); // Remove primeiro da fila
    setCrashQueueLength(queue.length);
    
    console.log('[CrashDetection] Processando próximo da fila:', nextCrash.processName, '- Restantes na fila:', queue.length);
    
    // Inicia o countdown para o próximo crash
    startCrashCountdownInternal(
      nextCrash.processId, 
      nextCrash.processName, 
      nextCrash.attemptNumber,
      nextCrash.needsManualIntervention
    );
  }, []);

  const startCrashCountdownInternal = React.useCallback((processId, processName, attemptNumber, needsManualIntervention = false) => {
    console.log('[CrashDetection] Iniciando countdown para:', processId, processName, attemptNumber);
    
    if (crashTimerRef.current) {
      clearInterval(crashTimerRef.current);
    }

    // Se precisa de intervenção manual, mostra modal mas NÃO para o processamento
    if (needsManualIntervention) {
      setCrashState({
        processId,
        processName,
        attempts: attemptNumber,
        maxAttempts: CRASH_MAX_ATTEMPTS,
        needsManualIntervention: true
      });
      // NÃO seta processingQueueRef.current = false aqui!
      // O usuário vai decidir se reinicia ou pula
      return;
    }

    // Usa o countdown da sessão (fixo para todos os processos desta sessão)
    let countdown = sessionCountdownTimeRef.current;

    console.log(`[CrashDetection] Usando countdown FIXO de ${countdown}s da sessão`);

    setCrashState({
      processId,
      processName,
      attempts: attemptNumber,
      countdown,
      maxAttempts: CRASH_MAX_ATTEMPTS,
      needsManualIntervention: false
    });

    crashTimerRef.current = setInterval(() => {
      countdown--;
      console.log('[CrashDetection] Countdown:', countdown);
      
      if (countdown <= 0) {
        clearInterval(crashTimerRef.current);
        crashTimerRef.current = null;
        setCrashState(null);
        console.log('[CrashDetection] Countdown finalizado, chamando attemptAutoRestart');
        
        // Restart o processo atual
        console.log('[CrashDetection] Iniciando restart assíncrono...');
        attemptAutoRestart(processId, processName, attemptNumber).then(() => {
          // Após o restart, processa o próximo da fila
          console.log('[CrashDetection] Restart completo, processando próximo em 500ms...');
          setTimeout(() => {
            console.log('[CrashDetection] Chamando processNextInQueue...');
            processNextInQueue();
          }, 500);
        }).catch((err) => {
          // Mesmo se falhar, continua processando a fila
          console.error('[CrashDetection] Erro no restart, mas continua fila:', err);
          setTimeout(() => {
            console.log('[CrashDetection] Processando próximo mesmo com erro...');
            processNextInQueue();
          }, 500);
        });
      } else {
        setCrashState(prev => prev ? { ...prev, countdown } : null);
      }
    }, 1000);
  }, [attemptAutoRestart, processNextInQueue]);

  const handleProcessCrash = React.useCallback((processId) => {
    console.log('[CrashDetection] Crash detectado para:', processId);
    
    // DEBOUNCE: Verifica se esse crash já foi processado recentemente (evita dupla detecção)
    const now = Date.now();
    const lastCrash = recentCrashesRef.current.get(processId);
    
    if (lastCrash && (now - lastCrash) < CRASH_DEBOUNCE_MS) {
      console.log(`[CrashDetection] Ignorando dupla detecção para ${processId} (${now - lastCrash}ms desde último)`);
      return;
    }
    
    // Marca este crash como processado
    recentCrashesRef.current.set(processId, now);
    
    // Limpa crashes antigos do debounce (mais de 10 segundos)
    for (const [pid, timestamp] of recentCrashesRef.current.entries()) {
      if (now - timestamp > 10000) {
        recentCrashesRef.current.delete(pid);
      }
    }
    
    const process = processesRef.current.find(p => p.id === processId);
    if (!process) {
      console.error('[CrashDetection] Processo não encontrado:', processId);
      return;
    }

    const attemptData = restartAttemptsRef.current.get(processId) || { count: 0, lastAttempt: 0 };

    if (now - attemptData.lastAttempt > CRASH_ATTEMPT_WINDOW_MS) {
      attemptData.count = 0;
    }

    attemptData.count++;
    attemptData.lastAttempt = now;
    restartAttemptsRef.current.set(processId, attemptData);

    console.log('[CrashDetection] Tentativa:', attemptData.count, '/', CRASH_MAX_ATTEMPTS);

    const needsManualIntervention = attemptData.count > CRASH_MAX_ATTEMPTS;
    
    if (needsManualIntervention) {
      console.log('[CrashDetection] Máximo de tentativas excedido');
      showToast(
        `${process.name} falhou ${CRASH_MAX_ATTEMPTS} vezes! Intervenção manual necessária.`,
        'error'
      );
    }

    const crashData = {
      processId,
      processName: process.name,
      attemptNumber: attemptData.count,
      needsManualIntervention
    };

    // Se já está processando um crash, adiciona na fila
    if (processingQueueRef.current || crashState !== null) {
      console.log('[CrashDetection] Adicionando à fila:', process.name);
      crashQueueRef.current.push(crashData);
      setCrashQueueLength(crashQueueRef.current.length);
    } else {
      // Se não está processando nada, inicia NOVA SESSÃO
      console.log('[CrashDetection] Iniciando NOVA SESSÃO de crash detection:', process.name);
      processingQueueRef.current = true;
      
      // CALCULA o countdown para TODA A SESSÃO baseado na fila TOTAL (atual + fila)
      const totalInSession = 1 + crashQueueRef.current.length; // Este processo + fila
      const sessionCountdown = totalInSession >= 3 ? CRASH_COUNTDOWN_SECONDS_FAST : CRASH_COUNTDOWN_SECONDS;
      sessionCountdownTimeRef.current = sessionCountdown;
      
      console.log(`[CrashDetection] Nova sessão com ${totalInSession} processo(s) - Countdown FIXO: ${sessionCountdown}s`);
      
      startCrashCountdownInternal(
        crashData.processId,
        crashData.processName,
        crashData.attemptNumber,
        crashData.needsManualIntervention
      );
    }
  }, [showToast, startCrashCountdownInternal, crashState]);

  const cancelCrashRestart = React.useCallback(() => {
    if (crashTimerRef.current) {
      clearInterval(crashTimerRef.current);
      crashTimerRef.current = null;
    }
    setCrashState(null);
    
    // Limpa a fila também
    const queueSize = crashQueueRef.current.length;
    crashQueueRef.current = [];
    setCrashQueueLength(0);
    processingQueueRef.current = false;
    
    // Reseta o countdown da sessão
    sessionCountdownTimeRef.current = CRASH_COUNTDOWN_SECONDS;
    
    if (queueSize > 0) {
      showToast(`Auto-restart cancelado. ${queueSize + 1} processo(s) não serão reiniciados.`, 'info');
    } else {
      showToast('Auto-restart cancelado.', 'info');
    }
  }, [showToast]);

  const skipCrashAndContinue = React.useCallback(() => {
    if (!crashState) return;
    
    console.log('[CrashDetection] Pulando crash atual e continuando fila');
    
    const processId = crashState.processId;
    // Reseta contador para este processo (usuário optou por não reiniciar agora)
    restartAttemptsRef.current.delete(processId);
    
    setCrashState(null);
    showToast(`${crashState.processName} não será reiniciado. Processando próximos...`, 'info');
    
    // Processa próximo da fila
    setTimeout(() => processNextInQueue(), 300);
  }, [crashState, showToast, processNextInQueue]);

  const manualRestartAfterCrash = React.useCallback(async () => {
    if (!crashState) return;
    
    const processId = crashState.processId;
    const processName = crashState.processName;
    
    // Reseta contador (usuário vai tentar manualmente)
    restartAttemptsRef.current.delete(processId);
    
    setCrashState(null);
    showToast(`Reiniciando ${processName} manualmente...`, 'success');
    
    try {
      await startOne(processId, { hidden: true });
      console.log('[CrashDetection] Restart manual completo, processando próximo...');
    } catch (error) {
      console.error('[CrashDetection] Erro no restart manual:', error);
      showToast(`Erro ao reiniciar ${processName}: ${error.message}`, 'error');
    }
    
    // Processa próximo da fila independente de sucesso ou falha
    setTimeout(() => processNextInQueue(), 500);
  }, [crashState, startOne, showToast, processNextInQueue]);

  React.useEffect(() => {
    return () => {
      if (crashTimerRef.current) {
        clearInterval(crashTimerRef.current);
      }
    };
  }, []);

  return {
    crashState,
    crashQueueLength,
    handleProcessCrash,
    cancelCrashRestart,
    skipCrashAndContinue,
    manualRestartAfterCrash,
  };
}
