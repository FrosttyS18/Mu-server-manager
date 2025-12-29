import React from 'react';
import { useTranslation } from '../../hooks';

export function CrashModal({ 
  processName, 
  attempts, 
  maxAttempts, 
  countdown, 
  needsManualIntervention,
  queueLength = 0,
  onCancel,
  onSkipAndContinue,
  onManualRestart
}) {
  const { t } = useTranslation();

  if (needsManualIntervention) {
    // Falhou 3 vezes - precisa de intervenção manual
    return (
      <div className="fixed inset-0 z-[3000] flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-black/80" />
        
        <div className="relative w-full max-w-[480px] rounded-[22px] bg-[#111111] border border-red-500/30 shadow-[0_30px_90px_rgba(255,0,0,0.40)] p-6 sm-glass-card">
          <div className="flex items-start gap-4">
            {/* Texto à esquerda */}
            <div className="flex-1">
              <div className="text-[18px] font-bold text-red-400">
                {t('crash.manualIntervention')}
              </div>
              <div className="mt-2 text-[14px] text-white/80 leading-relaxed">
                {t('crash.processFailed', { processName, maxAttempts })}
              </div>
              <div className="mt-2 text-[13px] text-white/60">
                {t('crash.checkExecutable')}
              </div>
            </div>

            {/* Ícone de erro crítico à direita */}
            <div className="flex-shrink-0 flex items-center justify-center w-[110px] h-[110px]">
              <svg
                className="w-20 h-20 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onSkipAndContinue}
              className="h-[40px] px-6 rounded-[10px] bg-black/40 backdrop-blur-sm border border-white/10 text-white/90 text-[13px] font-medium hover:bg-black/50 hover:border-white/20 transition-all"
            >
              {queueLength > 0 ? `${t('crash.skip')} (${queueLength} ${t('crash.inQueue')})` : t('crash.skip')}
            </button>
            <button
              type="button"
              onClick={onManualRestart}
              className="h-[40px] px-6 rounded-[10px] bg-[#0056B9] text-white text-[13px] font-semibold hover:bg-[#0066D9] transition-all shadow-[0_0_20px_rgba(0,86,185,0.3)]"
            >
              {t('crash.tryAgain')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Modo de contagem regressiva para auto-restart
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="relative w-full max-w-[460px] rounded-[22px] bg-[#111111] border border-yellow-500/20 shadow-[0_30px_90px_rgba(255,200,0,0.30)] p-6 sm-glass-card">
        <div className="flex items-start gap-4">
          {/* Texto à esquerda */}
          <div className="flex-1">
            <div className="text-[16px] font-semibold text-white">
              {t('crash.title')}
            </div>
            <div className="mt-2 text-[14px] text-white/80 leading-relaxed">
              {t('crash.processTerminated', { processName })}
            </div>
            <div className="mt-3 text-[13px] text-white/60">
              {t('crash.attemptLabel')} <span className="font-bold text-yellow-400">{attempts}/{maxAttempts}</span> {t('crash.autoRestartIn')}:
            </div>
          </div>

          {/* Ícone de atenção à direita */}
          <div className="flex-shrink-0 flex items-center justify-center w-[72px] h-[72px]">
            <svg
              className="w-14 h-14 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Contador regressivo grande */}
        <div className="mt-6 flex items-center justify-center">
          <div className="text-[48px] font-bold text-[#0056B9] tabular-nums">
            {countdown}s
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-[11px] text-white/50">
            {queueLength > 0 ? (
              <span className="text-yellow-400 font-semibold">
                +{queueLength} {queueLength === 1 ? t('crash.processInQueue') : t('crash.processesInQueue')}
              </span>
            ) : (
              t('crash.clickToCancel')
            )}
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="h-[38px] px-5 rounded-[10px] bg-black/40 backdrop-blur-sm border border-white/10 text-white/90 text-[13px] font-medium hover:bg-black/50 hover:border-white/20 transition-all"
          >
            {t('crash.cancelAutoRestart')}
          </button>
        </div>
      </div>
    </div>
  );
}

