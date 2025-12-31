/**
 * Sistema de Traduções - MU Server Manager
 * Suporta: PT-BR, EN-US, ES-ES
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

      // Auto OK Section
      autoOKTitle: 'Auto OK em Diálogos',
      autoOKDescription: 'Clica automaticamente em "OK" nos diálogos do MUDevs ao iniciar processos',
      autoOKLabel: 'Auto-click em caixas de diálogos com OK',
      autoOKHelp: 'Detecta e clica automaticamente no botão OK dos executáveis',
      autoOKActiveInfo: 'Ativo: O sistema clicará automaticamente em caixas de diálogos ao iniciar processos.',
      
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

      // Auto OK Section
      autoOKTitle: 'Auto OK on Dialogs',
      autoOKDescription: 'Automatically clicks "OK" on MUDevs dialogs when starting processes',
      autoOKLabel: 'Auto-click on dialog boxes with OK',
      autoOKHelp: 'Detects and automatically clicks the OK button on executables',
      autoOKActiveInfo: 'Active: The system will automatically click on dialog boxes when starting processes.',
      
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

      // Auto OK Section
      autoOKTitle: 'Auto OK en Diálogos',
      autoOKDescription: 'Hace clic automáticamente en "OK" en los diálogos de MUDevs al iniciar procesos',
      autoOKLabel: 'Auto-clic en cuadros de diálogos con OK',
      autoOKHelp: 'Detecta y hace clic automáticamente en el botón OK de los ejecutables',
      autoOKActiveInfo: 'Activo: El sistema hará clic automáticamente en cuadros de diálogos al iniciar procesos.',
      
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
    },
  },
};

/**
 * Retorna a tradução para a chave especificada
 * @param {string} locale - Idioma (pt-BR, en-US, es-ES)
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
