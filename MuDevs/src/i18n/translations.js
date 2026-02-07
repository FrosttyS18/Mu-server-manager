/**
 * Sistema de Traduções - MU Server Manager
 * Suporta: PT-BR, EN-US, ES-ES, ZH-CN
 */

export const translations = {
  'pt-BR': {
    // Sidebar
    sidebar: {
      serverName: 'Novo Nome',
      serverNamePlaceholder: 'Digite o nome do servidor',
      statusServer: 'Status server',
      statusOnline: 'Online',
      statusOffline: 'Offline',
      statusWarning: 'Alerta',
      addProcess: 'Adicionar',
      startAll: 'Iniciar Todos',
      stopAll: 'Parar Todos',
      restartAll: 'Reiniciar Todos',
      removeChecked: 'Remover Marcados',
      clearAll: 'Limpar todos',
      showAll: 'Mostrar Todos',
      hideAll: 'Ocultar Todos',
    },

    // Header / Main
    header: {
      processes: 'Processos',
      settings: 'Configurações',
      search: 'Procurar Processos...',
    },

    // Process Actions
    process: {
      start: 'Iniciar',
      stop: 'Parar',
      restart: 'Reiniciar',
      running: 'Rodando',
      stopped: 'Parado',
      cpu: 'CPU',
      ram: 'RAM',
      pid: 'PID',
      status: 'Status',
      name: 'Nome',
      path: 'Caminho',
    },

    // Toasts / Notifications
    toast: {
      processStarted: 'Processo iniciado',
      processStopped: 'Processo parado',
      processRestarted: 'Processo reiniciado',
      allStarted: 'Todos os processos foram iniciados',
      allStopped: 'Todos os processos foram parados',
      allRestarted: 'Todos os processos foram reiniciados',
      processAdded: 'Processo adicionado',
      processRemoved: 'Processo removido',
      processesRemoved: 'processos removidos',
      allProcessesCleared: 'Todos os processos foram limpos',
      error: 'Erro',
      success: 'Sucesso',
      warning: 'Atenção',
      backupSuccess: 'Backup realizado com sucesso',
      backupError: 'Erro ao fazer backup',
      connected: 'Conectado',
      disconnected: 'Desconectado',
      sqlConnected: 'SQL Server conectado',
      mysqlConnected: 'MySQL conectado',
      connectionError: 'Erro de conexão',
      settingsSaved: 'Configurações salvas',
      // Process Actions
      errorStarting: 'Erro ao iniciar',
      unknownError: 'Falha desconhecida',
      noProcessToStart: 'Nenhum processo para iniciar.',
      allProcessesRunning: 'Todos os processos já estão rodando.',
      processStarted_count: 'processo iniciado',
      processesStarted_count: 'processos iniciados',
      genericError: 'Erro',
      noProcessRunning: 'Nenhum processo está rodando.',
      processStopped_count: 'processo parado',
      processesStopped_count: 'processos parados',
      noProcessInList: 'Nenhum processo na lista.',
      processRestarted_count: 'processo reiniciado',
      processesRestarted_count: 'processos reiniciados',
      // Backup
      backupSuccess_count: 'Backup de {count} banco de dados realizado com sucesso!',
      backupSuccess_multiple: 'Backup de {count} bancos de dados realizado com sucesso!',
      backupPartial: 'Backup parcial: {success} realizados, {fail} falharam.',
      backupFailed: 'Falha ao fazer backup dos bancos de dados.',
      backupSingleSuccess: 'Backup realizado com sucesso!',
    },

    // Crash Detection Modal
    crash: {
      title: 'Processo Encerrado Inesperadamente',
      detected: 'detectado como encerrado inesperadamente',
      autoRestart: 'Reiniciando automaticamente em',
      seconds: 'segundos',
      attempt: 'Tentativa',
      of: 'de',
      queueInfo: 'na fila',
      inQueue: 'na fila',
      cancel: 'Cancelar',
      restartNow: 'Reiniciar Agora',
      tryAgain: 'Tentar Reiniciar Mesmo Assim',
      skip: 'Pular e Continuar',
      cancelAll: 'Cancelar Tudo',
      manualIntervention: 'Intervenção Manual Necessária',
      maxAttemptsReached: 'atingiu o máximo de tentativas automáticas.',
      whatToDo: 'O que deseja fazer?',
      processTerminated: 'O processo {processName} foi encerrado.',
      processFailed: 'O processo {processName} falhou {maxAttempts} vezes consecutivas nos últimos 2 minutos.',
      checkExecutable: 'Por favor, verifique se há algum problema com o executável ou suas dependências antes de tentar reiniciar novamente.',
      attemptLabel: 'Tentativa',
      autoRestartIn: 'de reinicialização automática em',
      processInQueue: 'processo na fila',
      processesInQueue: 'processos na fila',
      clickToCancel: 'Clique para cancelar ou aguarde',
      cancelAutoRestart: 'Cancelar Auto-Restart',
    },

    // Confirm Modal
    confirm: {
      title: 'Confirmação',
      areYouSure: 'Tem certeza?',
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      yes: 'Sim',
      no: 'Não',
    },

    // Console Modal
    console: {
      title: 'Console Log',
      tabErrors: 'Console de Erros',
      tabInfo: 'Informações',
      tabSettings: 'Configurações',
      noErrors: 'Nenhum erro registrado',
      errorsRegistered: 'erro(s) registrado(s)',
      noErrorsDetected: 'Nenhum erro detectado',
      errorsWillAppear: 'Os erros aparecerão aqui',
      clearLogs: 'Limpar Console',
      close: 'Fechar',
      typeProcess: 'Processo',
      typeSqlServer: 'SQL Server',
      typeMysql: 'MySQL',
      typeSystem: 'Sistema',
      appVersion: 'Versão do Aplicativo',
      developer: 'Desenvolvedor',
      copyright: '© Todos os direitos reservados 2026',
      disclaimer: 'Disclaimer',
      disclaimerText: 'Desenvolvido com dedicação para a comunidade de MU Online',
    },

    // Settings / Configuration
    settings: {
      title: 'Configurações',
      
      // Language Section
      languageTitle: 'Idioma / Language',
      languageDescription: 'Selecione o idioma da interface do aplicativo',
      portugueseBR: 'Português',
      englishUS: 'English',
      spanishES: 'Español',
      chineseCN: '中文',

      // Auto OK Section
      autoOKTitle: 'Auto OK em Diálogos',
      autoOKDescription: 'Clica automaticamente em "OK" nos diálogos do MUDevs ao iniciar processos',
      autoOKLabel: 'Auto-click em caixas de diálogos com OK',
      autoOKHelp: 'Detecta e clica automaticamente no botão OK dos executáveis',
      autoOKActiveInfo: 'Ativo: O sistema clicará automaticamente em caixas de diálogos ao iniciar processos.',
      
      // Startup Delay Section
      startupDelayTitle: 'Delay de Inicialização',
      startupDelayLabel: 'Tempo de espera antes de ocultar janelas',
      startupDelayHelp: 'Ajuste o tempo de espera (2-5 segundos) para dar tempo de clicar no OK dos diálogos dos executáveis',
      
      // Version Info
      version: 'Server Manager v1.0.0',
      developedBy: 'Desenvolvido por Dev-Frostty © 2026',
      
      // Language Change
      languageChanged: 'Idioma alterado para Português',
    },

    // Backup Modal
    backup: {
      title: 'Configurações SQL',
      close: 'Fechar',
      save: 'Salvar',
      cancel: 'Cancelar',
      
      // Database Type
      dbTypeTitle: 'Tipo de Banco de Dados',
      sqlServer: 'SQL Server',
      mysql: 'MySQL',
      
      // Connection
      connectionTitle: 'Conexão',
      host: 'Host',
      port: 'Porta',
      user: 'Usuário',
      password: 'Senha',
      database: 'Banco de Dados',
      testConnection: 'Testar Conexão',
      connected: 'Conectado',
      disconnected: 'Desconectado',
      
      // Backup Options
      databaseLabel: 'Database para Backup',
      allDatabases: '✓ Todos (fazer backup de todos)',
      backupAllHelp: 'Backup será feito em todos os databases',
      backupSingleHelp: 'Database que será feito backup',
      backupPath: 'Pasta de Backup',
      browse: 'Escolher',
      selectFolder: 'Selecionar Pasta',
      noFolderSelected: 'Nenhuma pasta selecionada',
      
      // Schedule
      scheduleTitle: 'Próximo Backup Programado',
      setDate: 'Definir Data',
      confirmDate: 'Confirmar',
      cancelDate: 'Cancelar',
      dateLabel: 'Data',
      timeLabel: 'Horário',
      scheduleHelp: 'Define a data e horário do próximo backup automático',
      noDateSet: 'Nenhuma data definida',
      
      // Recurrence
      recurrenceTitle: 'Recorrência do Backup',
      recurrenceNone: 'Nenhum (desativado)',
      recurrenceOnce: 'Única vez',
      recurrenceDaily: 'Diariamente',
      recurrenceWeekly: 'Semanalmente',
      recurrenceMonthly: 'Mensalmente',
      recurrenceNoneHelp: 'Backup automático está desativado',
      recurrenceOnceHelp: 'Backup será executado apenas uma vez na data definida',
      recurrenceDailyHelp: 'Backup será executado todo dia no horário definido',
      recurrenceWeeklyHelp: 'Backup será executado toda semana no mesmo dia e horário',
      recurrenceMonthlyHelp: 'Backup será executado todo mês no mesmo dia e horário',
      
      // Actions
      backupNow: 'Fazer Backup Agora',
      
      // Warnings
      dbDisconnected: 'Banco desconectado',
      dbDisconnectedHelp: 'Conecte ao banco de dados para executar backups. As configurações serão salvas mas só serão executadas quando o banco estiver conectado.',
    },

    // Metrics
    metrics: {
      totalCPU: 'Total CPU',
      totalRAM: 'Total RAM',
      sqlServerConnection: 'SQL Server Connection',
      processes: 'processos',
      active: 'ativos',
    },

    // SQL
    sql: {
      title: 'SQL Server Connect',
      connect: 'Conectar',
      disconnect: 'Desconectar',
      connected: 'Conectado',
      disconnected: 'Desconectado',
      online: 'Online',
      offline: 'Offline',
      serverPlaceholder: 'Digite o Server Name',
      userPlaceholder: 'Usuário',
      passwordPlaceholder: 'Digite a Senha',
      portPlaceholder: 'Porta',
      connecting: 'Conectando',
      connectSuccess: 'Conectado ao Banco de dados com sucesso!',
      disconnectSuccess: 'Desconectado do Banco de dados',
      connectError: 'Erro ao conectar',
      fillAllFields: 'Preencha todos os campos de conexão!',
      fillPort: 'Preencha o campo porta para conectar',
      invalidPort: 'Porta inválida! Digite um número entre 1 e 65535',
      autoConnectFailed: 'Falha na Conexão Automática',
      tryAgain: 'Tentar Novamente',
      configFirst: 'Configure as credenciais',
      dbOfflineMsg: 'Banco de dados desconectado. Conecte para executar backups.',
      configSaved: 'Configurações salvas com sucesso!',
      configSavedConnect: 'Configurações salvas! Conecte ao banco para ativá-las',
      configSaveError: 'Erro ao salvar configurações!',
      autoConnectFailedMsg: 'Não foi possível conectar ao banco de dados após 2 tentativas.',
      possibleCauses: 'Possíveis causas:',
      causeDbOff: 'Banco de dados está desligado',
      causeNetwork: 'Servidor não está acessível na rede',
      causeCredentials: 'Credenciais foram alteradas',
      verifyCredentials: 'Verifique as credenciais ao lado e tente novamente.',
      checkCredentials: 'Verificar Credenciais',
      server: 'Servidor',
      user: 'Usuário',
      password: 'Senha',
      port: 'Porta',
      type: 'Tipo',
    },

    // Context Menu
    contextMenu: {
      start: 'Iniciar',
      stop: 'Parar',
      restart: 'Reiniciar',
      show: 'Mostrar Janela',
      hide: 'Ocultar Janela',
      remove: 'Remover',
      edit: 'Editar',
      properties: 'Propriedades',
    },

    // Dialogs
    dialog: {
      selectExecutable: 'Selecione o executável',
      selectFolder: 'Selecione a pasta',
      exeFiles: 'Arquivos Executáveis',
      allFiles: 'Todos os Arquivos',
    },

    // Errors
    error: {
      processNotFound: 'Processo não encontrado',
      failedToStart: 'Falha ao iniciar processo',
      failedToStop: 'Falha ao parar processo',
      failedToRestart: 'Falha ao reiniciar processo',
      invalidPath: 'Caminho inválido',
      invalidName: 'Nome inválido',
      connectionFailed: 'Falha na conexão',
      backupFailed: 'Falha ao fazer backup',
      unknown: 'Erro desconhecido',
      // Error Logs
      backupError: 'Falha ao fazer backup de {db}',
      backupException: 'Falha ao fazer backup de {db}',
      backupSingleError: 'Falha ao fazer backup',
      autoConnectFailed_log: 'Falha na conexão automática',
      stopError: 'Erro ao parar {name}',
      restartError: 'Erro ao reiniciar {name}',
      processCrashed: 'O processo {name} foi encerrado inesperadamente',
    },

    // Undo
    undo: {
      action: 'Desfazer',
      processRemoved: 'Processo removido',
      processesRemoved: 'processos removidos',
      allCleared: 'Lista limpa',
    },

    // Common
    common: {
      loading: 'Iniciando...',
      saving: 'Salvando...',
      processing: 'Processando...',
      done: 'Concluído',
      ok: 'OK',
      cancel: 'Cancelar',
      close: 'Fechar',
      save: 'Salvar',
      delete: 'Excluir',
      edit: 'Editar',
      add: 'Adicionar',
      remove: 'Remover',
      search: 'Buscar',
      filter: 'Filtrar',
      all: 'Todos',
      none: 'Nenhum',
      yes: 'Sim',
      no: 'Não',
      enabled: 'Ativado',
      disabled: 'Desativado',
      on: 'Ligado',
      off: 'Desligado',
      footerCredits: 'Dev-Frostty © todos os direitos reservados 2026',
      imageTooLarge: 'Imagem muito grande. Use uma imagem de até 5MB.',
    },
  },

  'en-US': {
    // Sidebar
    sidebar: {
      serverName: 'New Name',
      serverNamePlaceholder: 'Enter server name',
      statusServer: 'Server status',
      statusOnline: 'Online',
      statusOffline: 'Offline',
      statusWarning: 'Warning',
      addProcess: 'Add Process',
      startAll: 'Start All',
      stopAll: 'Stop All',
      restartAll: 'Restart All',
      removeChecked: 'Remove Checked',
      clearAll: 'Clear All',
      showAll: 'Show All',
      hideAll: 'Hide All',
    },

    // Header / Main
    header: {
      processes: 'Processes',
      settings: 'Settings',
      search: 'Search Processes...',
    },

    // Process Actions
    process: {
      start: 'Start',
      stop: 'Stop',
      restart: 'Restart',
      running: 'Running',
      stopped: 'Stopped',
      cpu: 'CPU',
      ram: 'RAM',
      pid: 'PID',
      status: 'Status',
      name: 'Name',
      path: 'Path',
    },

    // Toasts / Notifications
    toast: {
      processStarted: 'Process started',
      processStopped: 'Process stopped',
      processRestarted: 'Process restarted',
      allStarted: 'All processes have been started',
      allStopped: 'All processes have been stopped',
      allRestarted: 'All processes have been restarted',
      processAdded: 'Process added',
      processRemoved: 'Process removed',
      processesRemoved: 'processes removed',
      allProcessesCleared: 'All processes have been cleared',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      backupSuccess: 'Backup completed successfully',
      backupError: 'Backup failed',
      connected: 'Connected',
      disconnected: 'Disconnected',
      sqlConnected: 'SQL Server connected',
      mysqlConnected: 'MySQL connected',
      connectionError: 'Connection error',
      settingsSaved: 'Settings saved',
      // Process Actions
      errorStarting: 'Error starting',
      unknownError: 'Unknown error',
      noProcessToStart: 'No processes to start.',
      allProcessesRunning: 'All processes are already running.',
      processStarted_count: 'process started',
      processesStarted_count: 'processes started',
      genericError: 'Error',
      noProcessRunning: 'No processes running.',
      processStopped_count: 'process stopped',
      processesStopped_count: 'processes stopped',
      noProcessInList: 'No processes in list.',
      processRestarted_count: 'process restarted',
      processesRestarted_count: 'processes restarted',
      // Backup
      backupSuccess_count: 'Backup of {count} database completed!',
      backupSuccess_multiple: 'Backup of {count} databases completed!',
      backupPartial: 'Partial backup: {success} ok, {fail} failed.',
      backupFailed: 'Failed to backup databases.',
      backupSingleSuccess: 'Backup completed successfully!',
    },

    // Crash Detection Modal
    crash: {
      title: 'Process Terminated Unexpectedly',
      detected: 'was detected as unexpectedly terminated',
      autoRestart: 'Auto-restarting in',
      seconds: 'seconds',
      attempt: 'Attempt',
      of: 'of',
      queueInfo: 'in queue',
      inQueue: 'in queue',
      cancel: 'Cancel',
      restartNow: 'Restart Now',
      tryAgain: 'Try Restart Anyway',
      skip: 'Skip and Continue',
      cancelAll: 'Cancel All',
      manualIntervention: 'Manual Intervention Required',
      maxAttemptsReached: 'reached maximum automatic attempts.',
      whatToDo: 'What would you like to do?',
      processTerminated: 'The process {processName} was terminated.',
      processFailed: 'The process {processName} failed {maxAttempts} consecutive times in the last 2 minutes.',
      checkExecutable: 'Please check if there is any problem with the executable or its dependencies before trying to restart again.',
      attemptLabel: 'Attempt',
      autoRestartIn: 'of automatic restart in',
      processInQueue: 'process in queue',
      processesInQueue: 'processes in queue',
      clickToCancel: 'Click to cancel or wait',
      cancelAutoRestart: 'Cancel Auto-Restart',
    },

    // Confirm Modal
    confirm: {
      title: 'Confirmation',
      areYouSure: 'Are you sure?',
      confirm: 'Confirm',
      cancel: 'Cancel',
      yes: 'Yes',
      no: 'No',
    },

    // Console Modal
    console: {
      title: 'Console Log',
      tabErrors: 'Error Console',
      tabInfo: 'Information',
      tabSettings: 'Settings',
      noErrors: 'No errors registered',
      errorsRegistered: 'error(s) registered',
      noErrorsDetected: 'No errors detected',
      errorsWillAppear: 'Errors will appear here',
      clearLogs: 'Clear Console',
      close: 'Close',
      typeProcess: 'Process',
      typeSqlServer: 'SQL Server',
      typeMysql: 'MySQL',
      typeSystem: 'System',
      appVersion: 'Application Version',
      developer: 'Developer',
      copyright: '© All rights reserved 2026',
      disclaimer: 'Disclaimer',
      disclaimerText: 'Developed with dedication for the MU Online community',
    },

    // Settings / Configuration
    settings: {
      title: 'Settings',
      
      // Language Section
      languageTitle: 'Language / Idioma',
      languageDescription: 'Select the application interface language',
      portugueseBR: 'Português',
      englishUS: 'English',
      spanishES: 'Español',
      chineseCN: '中文',
      chineseCN: '中文',

      // Auto OK Section
      autoOKTitle: 'Auto OK on Dialogs',
      autoOKDescription: 'Automatically clicks "OK" on MUDevs dialogs when starting processes',
      autoOKLabel: 'Auto-click on dialog boxes with OK',
      autoOKHelp: 'Detects and automatically clicks the OK button on executables',
      autoOKActiveInfo: 'Active: The system will automatically click on dialog boxes when starting processes.',
      
      // Startup Delay Section
      startupDelayTitle: 'Startup Delay',
      startupDelayLabel: 'Wait time before hiding windows',
      startupDelayHelp: 'Adjust the wait time (2-5 seconds) to allow time to click OK on executable dialogs',
      
      // Version Info
      version: 'Server Manager v1.0.0',
      developedBy: 'Developed by Dev-Frostty © 2026',
      
      // Language Change
      languageChanged: 'Language changed to English',
    },

    // Backup Modal
    backup: {
      title: 'SQL Settings',
      close: 'Close',
      save: 'Save',
      cancel: 'Cancel',
      
      // Database Type
      dbTypeTitle: 'Database Type',
      sqlServer: 'SQL Server',
      mysql: 'MySQL',
      
      // Connection
      connectionTitle: 'Connection',
      host: 'Host',
      port: 'Port',
      user: 'User',
      password: 'Password',
      database: 'Database',
      testConnection: 'Test Connection',
      connected: 'Connected',
      disconnected: 'Disconnected',
      
      // Backup Options
      databaseLabel: 'Database for Backup',
      allDatabases: '✓ All (backup all databases)',
      backupAllHelp: 'Backup will be done on all databases',
      backupSingleHelp: 'Database that will be backed up',
      backupPath: 'Backup Folder',
      browse: 'Browse',
      selectFolder: 'Select Folder',
      noFolderSelected: 'No folder selected',
      
      // Schedule
      scheduleTitle: 'Next Scheduled Backup',
      setDate: 'Set Date',
      confirmDate: 'Confirm',
      cancelDate: 'Cancel',
      dateLabel: 'Date',
      timeLabel: 'Time',
      scheduleHelp: 'Set the date and time for the next automatic backup',
      noDateSet: 'No date set',
      
      // Recurrence
      recurrenceTitle: 'Backup Recurrence',
      recurrenceNone: 'None (disabled)',
      recurrenceOnce: 'Once',
      recurrenceDaily: 'Daily',
      recurrenceWeekly: 'Weekly',
      recurrenceMonthly: 'Monthly',
      recurrenceNoneHelp: 'Automatic backup is disabled',
      recurrenceOnceHelp: 'Backup will run only once on the set date',
      recurrenceDailyHelp: 'Backup will run every day at the set time',
      recurrenceWeeklyHelp: 'Backup will run every week on the same day and time',
      recurrenceMonthlyHelp: 'Backup will run every month on the same day and time',
      
      // Actions
      backupNow: 'Backup Now',
      
      // Warnings
      dbDisconnected: 'Database disconnected',
      dbDisconnectedHelp: 'Connect to the database to perform backups. Settings will be saved but will only be executed when the database is connected.',
    },

    // Metrics
    metrics: {
      totalCPU: 'Total CPU',
      totalRAM: 'Total RAM',
      sqlServerConnection: 'SQL Server Connection',
      processes: 'processes',
      active: 'active',
    },

    // SQL
    sql: {
      title: 'SQL Server Connect',
      connect: 'Connect',
      disconnect: 'Disconnect',
      connected: 'Connected',
      disconnected: 'Disconnected',
      online: 'Online',
      offline: 'Offline',
      serverPlaceholder: 'Server Name',
      userPlaceholder: 'User',
      passwordPlaceholder: 'Password',
      portPlaceholder: 'Port',
      connecting: 'Connecting',
      connectSuccess: 'Database connected successfully!',
      disconnectSuccess: 'Database disconnected',
      connectError: 'Connection error',
      fillAllFields: 'Fill in all connection fields!',
      fillPort: 'Fill in the port field to connect',
      invalidPort: 'Invalid port! Enter a number between 1 and 65535',
      autoConnectFailed: 'Auto-Connection Failed',
      tryAgain: 'Try Again',
      configFirst: 'Configure credentials',
      dbOfflineMsg: 'Database disconnected. Connect to perform backups.',
      configSaved: 'Settings saved successfully!',
      configSavedConnect: 'Settings saved! Connect to database to activate them',
      configSaveError: 'Error saving settings!',
      autoConnectFailedMsg: 'Could not connect to database after 2 attempts.',
      possibleCauses: 'Possible causes:',
      causeDbOff: 'Database is offline',
      causeNetwork: 'Server is not accessible on the network',
      causeCredentials: 'Credentials have been changed',
      verifyCredentials: 'Check credentials and try again.',
      checkCredentials: 'Check Credentials',
      server: 'Server',
      user: 'User',
      password: 'Password',
      port: 'Port',
      type: 'Type',
    },

    // Context Menu
    contextMenu: {
      start: 'Start',
      stop: 'Stop',
      restart: 'Restart',
      show: 'Show Window',
      hide: 'Hide Window',
      remove: 'Remove',
      edit: 'Edit',
      properties: 'Properties',
    },

    // Dialogs
    dialog: {
      selectExecutable: 'Select executable',
      selectFolder: 'Select folder',
      exeFiles: 'Executable Files',
      allFiles: 'All Files',
    },

    // Errors
    error: {
      processNotFound: 'Process not found',
      failedToStart: 'Failed to start process',
      failedToStop: 'Failed to stop process',
      failedToRestart: 'Failed to restart process',
      invalidPath: 'Invalid path',
      invalidName: 'Invalid name',
      connectionFailed: 'Connection failed',
      backupFailed: 'Backup failed',
      unknown: 'Unknown error',
      // Error Logs
      backupError: 'Failed to backup {db}',
      backupException: 'Failed to backup {db}',
      backupSingleError: 'Backup failed',
      autoConnectFailed_log: 'Automatic connection failed',
      stopError: 'Error stopping {name}',
      restartError: 'Error restarting {name}',
      processCrashed: 'The process {name} stopped unexpectedly',
    },

    // Undo
    undo: {
      action: 'Undo',
      processRemoved: 'Process removed',
      processesRemoved: 'processes removed',
      allCleared: 'List cleared',
    },

    // Common
    common: {
      loading: 'Starting...',
      saving: 'Saving...',
      processing: 'Processing...',
      done: 'Done',
      ok: 'OK',
      cancel: 'Cancel',
      close: 'Close',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      remove: 'Remove',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      none: 'None',
      yes: 'Yes',
      no: 'No',
      enabled: 'Enabled',
      disabled: 'Disabled',
      on: 'On',
      off: 'Off',
      footerCredits: 'Dev-Frostty © All rights reserved 2026',
      imageTooLarge: 'Image too large. Use an image up to 5MB.',
    },
  },

  'es-ES': {
    // Sidebar
    sidebar: {
      serverName: 'Nuevo Nombre',
      serverNamePlaceholder: 'Ingrese el nombre del servidor',
      statusServer: 'Estado del servidor',
      statusOnline: 'En línea',
      statusOffline: 'Desconectado',
      statusWarning: 'Alerta',
      addProcess: 'Agregar Proceso',
      startAll: 'Iniciar Todos',
      stopAll: 'Detener Todos',
      restartAll: 'Reiniciar Todos',
      removeChecked: 'Eliminar Marcados',
      clearAll: 'Limpiar Todo',
      showAll: 'Mostrar Todos',
      hideAll: 'Ocultar Todos',
    },

    // Header / Main
    header: {
      processes: 'Procesos',
      settings: 'Configuración',
      search: 'Buscar Procesos...',
    },

    // Process Actions
    process: {
      start: 'Iniciar',
      stop: 'Detener',
      restart: 'Reiniciar',
      running: 'Ejecutando',
      stopped: 'Detenido',
      cpu: 'CPU',
      ram: 'RAM',
      pid: 'PID',
      status: 'Estado',
      name: 'Nombre',
      path: 'Ruta',
    },

    // Toasts / Notifications
    toast: {
      processStarted: 'Proceso iniciado',
      processStopped: 'Proceso detenido',
      processRestarted: 'Proceso reiniciado',
      allStarted: 'Todos los procesos han sido iniciados',
      allStopped: 'Todos los procesos han sido detenidos',
      allRestarted: 'Todos los procesos han sido reiniciados',
      processAdded: 'Proceso agregado',
      processRemoved: 'Proceso eliminado',
      processesRemoved: 'procesos eliminados',
      allProcessesCleared: 'Todos los procesos han sido limpiados',
      error: 'Error',
      success: 'Éxito',
      warning: 'Advertencia',
      backupSuccess: 'Respaldo completado con éxito',
      backupError: 'Error al hacer respaldo',
      connected: 'Conectado',
      disconnected: 'Desconectado',
      sqlConnected: 'SQL Server conectado',
      mysqlConnected: 'MySQL conectado',
      connectionError: 'Error de conexión',
      settingsSaved: 'Configuración guardada',
      // Process Actions
      errorStarting: 'Error al iniciar',
      unknownError: 'Error desconocido',
      noProcessToStart: 'No hay procesos para iniciar.',
      allProcessesRunning: 'Todos los procesos ya están ejecutándose.',
      processStarted_count: 'proceso iniciado',
      processesStarted_count: 'procesos iniciados',
      genericError: 'Error',
      noProcessRunning: 'Ningún proceso está ejecutándose.',
      processStopped_count: 'proceso detenido',
      processesStopped_count: 'procesos detenidos',
      noProcessInList: 'No hay procesos en la lista.',
      processRestarted_count: 'proceso reiniciado',
      processesRestarted_count: 'procesos reiniciados',
      // Backup
      backupSuccess_count: '¡Respaldo de {count} base de datos completado!',
      backupSuccess_multiple: '¡Respaldo de {count} bases de datos completado!',
      backupPartial: 'Respaldo parcial: {success} ok, {fail} fallaron.',
      backupFailed: 'Fallo al respaldar las bases de datos.',
      backupSingleSuccess: '¡Respaldo completado con éxito!',
    },

    // Crash Detection Modal
    crash: {
      title: 'Proceso Terminado Inesperadamente',
      detected: 'fue detectado como terminado inesperadamente',
      autoRestart: 'Reiniciando automáticamente en',
      seconds: 'segundos',
      attempt: 'Intento',
      of: 'de',
      queueInfo: 'en cola',
      inQueue: 'en cola',
      cancel: 'Cancelar',
      restartNow: 'Reiniciar Ahora',
      tryAgain: 'Intentar Reiniciar De Todos Modos',
      skip: 'Omitir y Continuar',
      cancelAll: 'Cancelar Todo',
      manualIntervention: 'Intervención Manual Requerida',
      maxAttemptsReached: 'alcanzó el máximo de intentos automáticos.',
      whatToDo: '¿Qué desea hacer?',
      processTerminated: 'El proceso {processName} fue terminado.',
      processFailed: 'El proceso {processName} falló {maxAttempts} veces consecutivas en los últimos 2 minutos.',
      checkExecutable: 'Por favor, verifique si hay algún problema con el ejecutable o sus dependencias antes de intentar reiniciar nuevamente.',
      attemptLabel: 'Intento',
      autoRestartIn: 'de reinicio automático en',
      processInQueue: 'proceso en cola',
      processesInQueue: 'procesos en cola',
      clickToCancel: 'Haga clic para cancelar o espere',
      cancelAutoRestart: 'Cancelar Auto-Reinicio',
    },

    // Confirm Modal
    confirm: {
      title: 'Confirmación',
      areYouSure: '¿Está seguro?',
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      yes: 'Sí',
      no: 'No',
    },

    // Console Modal
    console: {
      title: 'Registro de Consola',
      tabErrors: 'Consola de Errores',
      tabInfo: 'Información',
      tabSettings: 'Configuración',
      noErrors: 'No hay errores registrados',
      errorsRegistered: 'error(es) registrado(s)',
      noErrorsDetected: 'No se detectaron errores',
      errorsWillAppear: 'Los errores aparecerán aquí',
      clearLogs: 'Limpiar Consola',
      close: 'Cerrar',
      typeProcess: 'Proceso',
      typeSqlServer: 'SQL Server',
      typeMysql: 'MySQL',
      typeSystem: 'Sistema',
      appVersion: 'Versión de la Aplicación',
      developer: 'Desarrollador',
      copyright: '© Todos los derechos reservados 2026',
      disclaimer: 'Aviso',
      disclaimerText: 'Desarrollado con dedicación para la comunidad de MU Online',
    },

    // Settings / Configuration
    settings: {
      title: 'Configuración',
      
      // Language Section
      languageTitle: 'Idioma / Language',
      languageDescription: 'Seleccione el idioma de la interfaz de la aplicación',
      portugueseBR: 'Português',
      englishUS: 'English',
      spanishES: 'Español',
      chineseCN: '中文',
      chineseCN: '中文',

      // Auto OK Section
      autoOKTitle: 'Auto OK en Diálogos',
      autoOKDescription: 'Hace clic automáticamente en "OK" en los diálogos de MUDevs al iniciar procesos',
      autoOKLabel: 'Auto-clic en cuadros de diálogos con OK',
      autoOKHelp: 'Detecta y hace clic automáticamente en el botón OK de los ejecutables',
      autoOKActiveInfo: 'Activo: El sistema hará clic automáticamente en cuadros de diálogos al iniciar procesos.',
      
      // Startup Delay Section
      startupDelayTitle: 'Retraso de Inicio',
      startupDelayLabel: 'Tiempo de espera antes de ocultar ventanas',
      startupDelayHelp: 'Ajuste el tiempo de espera (2-5 segundos) para dar tiempo de hacer clic en OK en los diálogos de los ejecutables',
      
      // Version Info
      version: 'Server Manager v1.0.0',
      developedBy: 'Desarrollado por Dev-Frostty © 2026',
      
      // Language Change
      languageChanged: 'Idioma cambiado a Español',
    },

    // Backup Modal
    backup: {
      title: 'Configuración SQL',
      close: 'Cerrar',
      save: 'Guardar',
      cancel: 'Cancelar',
      
      // Database Type
      dbTypeTitle: 'Tipo de Base de Datos',
      sqlServer: 'SQL Server',
      mysql: 'MySQL',
      
      // Connection
      connectionTitle: 'Conexión',
      host: 'Host',
      port: 'Puerto',
      user: 'Usuario',
      password: 'Contraseña',
      database: 'Base de Datos',
      testConnection: 'Probar Conexión',
      connected: 'Conectado',
      disconnected: 'Desconectado',
      
      // Backup Options
      databaseLabel: 'Base de Datos para Respaldo',
      allDatabases: '✓ Todas (respaldar todas las bases de datos)',
      backupAllHelp: 'Se hará respaldo de todas las bases de datos',
      backupSingleHelp: 'Base de datos de la que se hará respaldo',
      backupPath: 'Carpeta de Respaldo',
      browse: 'Examinar',
      selectFolder: 'Seleccionar Carpeta',
      noFolderSelected: 'Ninguna carpeta seleccionada',
      
      // Schedule
      scheduleTitle: 'Próximo Respaldo Programado',
      setDate: 'Definir Fecha',
      confirmDate: 'Confirmar',
      cancelDate: 'Cancelar',
      dateLabel: 'Fecha',
      timeLabel: 'Hora',
      scheduleHelp: 'Define la fecha y hora del próximo respaldo automático',
      noDateSet: 'Sin fecha definida',
      
      // Recurrence
      recurrenceTitle: 'Recurrencia del Respaldo',
      recurrenceNone: 'Ninguno (desactivado)',
      recurrenceOnce: 'Una vez',
      recurrenceDaily: 'Diariamente',
      recurrenceWeekly: 'Semanalmente',
      recurrenceMonthly: 'Mensualmente',
      recurrenceNoneHelp: 'El respaldo automático está desactivado',
      recurrenceOnceHelp: 'El respaldo se ejecutará solo una vez en la fecha definida',
      recurrenceDailyHelp: 'El respaldo se ejecutará todos los días a la hora definida',
      recurrenceWeeklyHelp: 'El respaldo se ejecutará cada semana en el mismo día y hora',
      recurrenceMonthlyHelp: 'El respaldo se ejecutará cada mes en el mismo día y hora',
      
      // Actions
      backupNow: 'Hacer Respaldo Ahora',
      
      // Warnings
      dbDisconnected: 'Base de datos desconectada',
      dbDisconnectedHelp: 'Conéctese a la base de datos para realizar respaldos. La configuración se guardará pero solo se ejecutará cuando la base de datos esté conectada.',
    },

    // Metrics
    metrics: {
      totalCPU: 'CPU Total',
      totalRAM: 'RAM Total',
      sqlServerConnection: 'Conexión SQL Server',
      processes: 'procesos',
      active: 'activos',
    },

    // SQL
    sql: {
      title: 'SQL Server Connect',
      connect: 'Conectar',
      disconnect: 'Desconectar',
      connected: 'Conectado',
      disconnected: 'Desconectado',
      online: 'En línea',
      offline: 'Desconectado',
      serverPlaceholder: 'Nombre del Servidor',
      userPlaceholder: 'Usuario',
      passwordPlaceholder: 'Contraseña',
      portPlaceholder: 'Puerto',
      connecting: 'Conectando',
      connectSuccess: '¡Base de datos conectada con éxito!',
      disconnectSuccess: 'Base de datos desconectada',
      connectError: 'Error de conexión',
      fillAllFields: '¡Complete todos los campos de conexión!',
      fillPort: 'Complete el campo de puerto para conectar',
      invalidPort: '¡Puerto inválido! Ingrese un número entre 1 y 65535',
      autoConnectFailed: 'Conexión Automática Fallida',
      tryAgain: 'Intentar de Nuevo',
      configFirst: 'Configure las credenciales',
      dbOfflineMsg: 'Base de datos desconectada. Conéctese para realizar respaldos.',
      configSaved: '¡Configuración guardada con éxito!',
      configSavedConnect: '¡Configuración guardada! Conéctese a la base de datos para activarla',
      configSaveError: '¡Error al guardar la configuración!',
      autoConnectFailedMsg: 'No se pudo conectar a la base de datos después de 2 intentos.',
      possibleCauses: 'Posibles causas:',
      causeDbOff: 'La base de datos está apagada',
      causeNetwork: 'El servidor no es accesible en la red',
      causeCredentials: 'Las credenciales han sido cambiadas',
      verifyCredentials: 'Verifique las credenciales e intente nuevamente.',
      checkCredentials: 'Verificar Credenciales',
      server: 'Servidor',
      user: 'Usuario',
      password: 'Contraseña',
      port: 'Puerto',
      type: 'Tipo',
    },

    // Context Menu
    contextMenu: {
      start: 'Iniciar',
      stop: 'Detener',
      restart: 'Reiniciar',
      show: 'Mostrar Ventana',
      hide: 'Ocultar Ventana',
      remove: 'Eliminar',
      edit: 'Editar',
      properties: 'Propiedades',
    },

    // Dialogs
    dialog: {
      selectExecutable: 'Seleccione el ejecutable',
      selectFolder: 'Seleccione la carpeta',
      exeFiles: 'Archivos Ejecutables',
      allFiles: 'Todos los Archivos',
    },

    // Errors
    error: {
      processNotFound: 'Proceso no encontrado',
      failedToStart: 'Error al iniciar proceso',
      failedToStop: 'Error al detener proceso',
      failedToRestart: 'Error al reiniciar proceso',
      invalidPath: 'Ruta inválida',
      invalidName: 'Nombre inválido',
      connectionFailed: 'Conexión fallida',
      backupFailed: 'Respaldo fallido',
      unknown: 'Error desconocido',
      // Error Logs
      backupError: 'Falló el respaldo de {db}',
      backupException: 'Falló el respaldo de {db}',
      backupSingleError: 'Falló el respaldo',
      autoConnectFailed_log: 'Falló la conexión automática',
      stopError: 'Error al detener {name}',
      restartError: 'Error al reiniciar {name}',
      processCrashed: 'El proceso {name} se detuvo inesperadamente',
    },

    // Undo
    undo: {
      action: 'Deshacer',
      processRemoved: 'Proceso eliminado',
      processesRemoved: 'procesos eliminados',
      allCleared: 'Lista limpiada',
    },

    // Common
    common: {
      loading: 'Iniciando...',
      saving: 'Guardando...',
      processing: 'Procesando...',
      done: 'Completado',
      ok: 'OK',
      cancel: 'Cancelar',
      close: 'Cerrar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      add: 'Agregar',
      remove: 'Eliminar',
      search: 'Buscar',
      filter: 'Filtrar',
      all: 'Todos',
      none: 'Ninguno',
      yes: 'Sí',
      no: 'No',
      enabled: 'Activado',
      disabled: 'Desactivado',
      on: 'Encendido',
      off: 'Apagado',
      footerCredits: 'Dev-Frostty © Todos los derechos reservados 2026',
      imageTooLarge: 'Imagen muy grande. Use una imagen de hasta 5MB.',
    },
  },

  'zh-CN': {
    // Sidebar
    sidebar: {
      serverName: '新名称',
      serverNamePlaceholder: '输入服务器名称',
      statusServer: '服务器状态',
      statusOnline: '在线',
      statusOffline: '离线',
      statusWarning: '警告',
      addProcess: '添加',
      startAll: '全部启动',
      stopAll: '全部停止',
      restartAll: '全部重启',
      removeChecked: '移除已选',
      clearAll: '清空全部',
      showAll: '显示全部',
      hideAll: '隐藏全部',
    },

    // Header / Main
    header: {
      processes: '进程',
      settings: '设置',
      search: '搜索进程...',
    },

    // Process Actions
    process: {
      start: '启动',
      stop: '停止',
      restart: '重启',
      running: '运行中',
      stopped: '已停止',
      cpu: 'CPU',
      ram: '内存',
      pid: 'PID',
      status: '状态',
      name: '名称',
      path: '路径',
    },

    // Toasts / Notifications
    toast: {
      processStarted: '进程已启动',
      processStopped: '进程已停止',
      processRestarted: '进程已重启',
      allStarted: '所有进程已启动',
      allStopped: '所有进程已停止',
      allRestarted: '所有进程已重启',
      processAdded: '进程已添加',
      processRemoved: '进程已移除',
      processesRemoved: '个进程已移除',
      allProcessesCleared: '所有进程已清空',
      error: '错误',
      success: '成功',
      warning: '警告',
      backupSuccess: '备份成功',
      backupError: '备份失败',
      connected: '已连接',
      disconnected: '已断开',
      sqlConnected: 'SQL Server 已连接',
      mysqlConnected: 'MySQL 已连接',
      connectionError: '连接错误',
      settingsSaved: '设置已保存',
      // Process Actions
      errorStarting: '启动错误',
      unknownError: '未知错误',
      noProcessToStart: '没有要启动的进程。',
      allProcessesRunning: '所有进程已在运行。',
      processStarted_count: '个进程已启动',
      processesStarted_count: '个进程已启动',
      genericError: '错误',
      noProcessRunning: '没有正在运行的进程。',
      processStopped_count: '个进程已停止',
      processesStopped_count: '个进程已停止',
      noProcessInList: '列表中没有进程。',
      processRestarted_count: '个进程已重启',
      processesRestarted_count: '个进程已重启',
      // Backup
      backupSuccess_count: '成功备份 {count} 个数据库！',
      backupSuccess_multiple: '成功备份 {count} 个数据库！',
      backupPartial: '部分备份：{success} 成功，{fail} 失败。',
      backupFailed: '备份数据库失败。',
      backupSingleSuccess: '备份成功！',
    },

    // Crash Detection Modal
    crash: {
      title: '进程意外终止',
      detected: '检测到意外终止',
      autoRestart: '自动重启中，倒计时',
      seconds: '秒',
      attempt: '尝试',
      of: '/',
      queueInfo: '在队列中',
      inQueue: '在队列中',
      cancel: '取消',
      restartNow: '立即重启',
      tryAgain: '仍然尝试重启',
      skip: '跳过并继续',
      cancelAll: '取消全部',
      manualIntervention: '需要手动干预',
      maxAttemptsReached: '已达到最大自动尝试次数。',
      whatToDo: '您想要做什么？',
      processTerminated: '进程 {processName} 已终止。',
      processFailed: '进程 {processName} 在过去 2 分钟内连续失败 {maxAttempts} 次。',
      checkExecutable: '请检查可执行文件或其依赖项是否有问题，然后再尝试重启。',
      attemptLabel: '尝试',
      autoRestartIn: '自动重启倒计时',
      processInQueue: '个进程在队列中',
      processesInQueue: '个进程在队列中',
      clickToCancel: '点击取消或等待',
      cancelAutoRestart: '取消自动重启',
    },

    // Confirm Modal
    confirm: {
      title: '确认',
      areYouSure: '您确定吗？',
      confirm: '确认',
      cancel: '取消',
      yes: '是',
      no: '否',
    },

    // Console Modal
    console: {
      title: '控制台日志',
      tabErrors: '错误控制台',
      tabInfo: '信息',
      tabSettings: '设置',
      noErrors: '没有注册的错误',
      errorsRegistered: '个错误已注册',
      noErrorsDetected: '未检测到错误',
      errorsWillAppear: '错误将显示在此处',
      clearLogs: '清空控制台',
      close: '关闭',
      typeProcess: '进程',
      typeSqlServer: 'SQL Server',
      typeMysql: 'MySQL',
      typeSystem: '系统',
      appVersion: '应用程序版本',
      developer: '开发者',
      copyright: '© 2026 版权所有',
      disclaimer: '免责声明',
      disclaimerText: '专为 MU Online 社区开发',
    },

    // Settings / Configuration
    settings: {
      title: '设置',
      
      // Language Section
      languageTitle: '语言 / Language',
      languageDescription: '选择应用程序界面语言',
      portugueseBR: 'Português',
      englishUS: 'English',
      spanishES: 'Español',
      chineseCN: '中文',
      chineseCN: '中文',

      // Auto OK Section
      autoOKTitle: '对话框自动确认',
      autoOKDescription: '启动进程时自动点击 MUDevs 对话框中的"确定"',
      autoOKLabel: '自动点击带"确定"的对话框',
      autoOKHelp: '检测并自动点击可执行文件的确定按钮',
      autoOKActiveInfo: '已激活：系统将在启动进程时自动点击对话框。',
      
      // Startup Delay Section
      startupDelayTitle: '启动延迟',
      startupDelayLabel: '隐藏窗口前的等待时间',
      startupDelayHelp: '调整等待时间（2-5 秒）以便有时间点击可执行文件对话框中的确定',
      
      // Version Info
      version: 'Server Manager v1.0.0',
      developedBy: '由 Dev-Frostty 开发 © 2026',
      
      // Language Change
      languageChanged: '语言已更改为中文',
    },

    // Backup Modal
    backup: {
      title: 'SQL 设置',
      close: '关闭',
      save: '保存',
      cancel: '取消',
      
      // Database Type
      dbTypeTitle: '数据库类型',
      sqlServer: 'SQL Server',
      mysql: 'MySQL',
      
      // Connection
      connectionTitle: '连接',
      host: '主机',
      port: '端口',
      user: '用户',
      password: '密码',
      database: '数据库',
      testConnection: '测试连接',
      connected: '已连接',
      disconnected: '已断开',
      
      // Backup Options
      databaseLabel: '要备份的数据库',
      allDatabases: '✓ 全部（备份所有数据库）',
      backupAllHelp: '将备份所有数据库',
      backupSingleHelp: '将要备份的数据库',
      backupPath: '备份文件夹',
      browse: '浏览',
      selectFolder: '选择文件夹',
      noFolderSelected: '未选择文件夹',
      
      // Schedule
      scheduleTitle: '下一个计划备份',
      setDate: '设置日期',
      confirmDate: '确认',
      cancelDate: '取消',
      dateLabel: '日期',
      timeLabel: '时间',
      scheduleHelp: '设置下一个自动备份的日期和时间',
      noDateSet: '未设置日期',
      
      // Recurrence
      recurrenceTitle: '备份重复',
      recurrenceNone: '无（已禁用）',
      recurrenceOnce: '一次',
      recurrenceDaily: '每天',
      recurrenceWeekly: '每周',
      recurrenceMonthly: '每月',
      recurrenceNoneHelp: '自动备份已禁用',
      recurrenceOnceHelp: '备份将在设定日期仅运行一次',
      recurrenceDailyHelp: '备份将在设定时间每天运行',
      recurrenceWeeklyHelp: '备份将在同一天同一时间每周运行',
      recurrenceMonthlyHelp: '备份将在同一天同一时间每月运行',
      
      // Actions
      backupNow: '立即备份',
      
      // Warnings
      dbDisconnected: '数据库已断开',
      dbDisconnectedHelp: '连接到数据库以执行备份。设置将被保存，但只有在数据库连接时才会执行。',
    },

    // Metrics
    metrics: {
      totalCPU: '总 CPU',
      totalRAM: '总内存',
      sqlServerConnection: 'SQL Server 连接',
      processes: '个进程',
      active: '活跃',
    },

    // SQL
    sql: {
      title: 'SQL Server 连接',
      connect: '连接',
      disconnect: '断开',
      connected: '已连接',
      disconnected: '已断开',
      online: '在线',
      offline: '离线',
      serverPlaceholder: '输入服务器名称',
      userPlaceholder: '用户',
      passwordPlaceholder: '输入密码',
      portPlaceholder: '端口',
      connecting: '连接中',
      connectSuccess: '数据库连接成功！',
      disconnectSuccess: '数据库已断开',
      connectError: '连接错误',
      fillAllFields: '请填写所有连接字段！',
      fillPort: '请填写端口字段以连接',
      invalidPort: '端口无效！请输入 1 到 65535 之间的数字',
      autoConnectFailed: '自动连接失败',
      tryAgain: '重试',
      configFirst: '配置凭据',
      dbOfflineMsg: '数据库已断开。连接以执行备份。',
      configSaved: '设置保存成功！',
      configSavedConnect: '设置已保存！连接到数据库以激活',
      configSaveError: '保存设置时出错！',
      autoConnectFailedMsg: '2 次尝试后无法连接到数据库。',
      possibleCauses: '可能的原因：',
      causeDbOff: '数据库已关闭',
      causeNetwork: '服务器在网络上不可访问',
      causeCredentials: '凭据已更改',
      verifyCredentials: '请检查凭据并重试。',
      checkCredentials: '检查凭据',
      server: '服务器',
      user: '用户',
      password: '密码',
      port: '端口',
      type: '类型',
    },

    // Context Menu
    contextMenu: {
      start: '启动',
      stop: '停止',
      restart: '重启',
      show: '显示窗口',
      hide: '隐藏窗口',
      remove: '移除',
      edit: '编辑',
      properties: '属性',
    },

    // Dialogs
    dialog: {
      selectExecutable: '选择可执行文件',
      selectFolder: '选择文件夹',
      exeFiles: '可执行文件',
      allFiles: '所有文件',
    },

    // Errors
    error: {
      processNotFound: '未找到进程',
      failedToStart: '启动进程失败',
      failedToStop: '停止进程失败',
      failedToRestart: '重启进程失败',
      invalidPath: '路径无效',
      invalidName: '名称无效',
      connectionFailed: '连接失败',
      backupFailed: '备份失败',
      unknown: '未知错误',
      // Error Logs
      backupError: '备份 {db} 失败',
      backupException: '备份 {db} 失败',
      backupSingleError: '备份失败',
      autoConnectFailed_log: '自动连接失败',
      stopError: '停止 {name} 时出错',
      restartError: '重启 {name} 时出错',
      processCrashed: '进程 {name} 意外停止',
    },

    // Undo
    undo: {
      action: '撤销',
      processRemoved: '进程已移除',
      processesRemoved: '个进程已移除',
      allCleared: '列表已清空',
    },

    // Common
    common: {
      loading: '启动中...',
      saving: '保存中...',
      processing: '处理中...',
      done: '完成',
      ok: '确定',
      cancel: '取消',
      close: '关闭',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      add: '添加',
      remove: '移除',
      search: '搜索',
      filter: '筛选',
      all: '全部',
      none: '无',
      yes: '是',
      no: '否',
      enabled: '已启用',
      disabled: '已禁用',
      on: '开启',
      off: '关闭',
      footerCredits: 'Dev-Frostty © 2026 版权所有',
      imageTooLarge: '图片太大。请使用不超过 5MB 的图片。',
    },
  },
};

/**
 * Retorna a tradução para a chave especificada
 * @param {string} locale - Idioma (pt-BR, en-US, es-ES, zh-CN)
 * @param {string} key - Chave de tradução (ex: 'sidebar.startAll')
 * @returns {string} - Texto traduzido
 */
export function getTranslation(locale, key) {
  const keys = key.split('.');
  let value = translations[locale];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      // Fallback para PT-BR se não encontrar
      console.warn(`Translation key not found: ${key} for locale: ${locale}`);
      let fallback = translations['pt-BR'];
      for (const fk of keys) {
        fallback = fallback?.[fk];
      }
      return fallback || key;
    }
  }
  
  return value || key;
}
