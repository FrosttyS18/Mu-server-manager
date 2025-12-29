import React from 'react';

export function useMetrics() {
  const [metrics, setMetrics] = React.useState({
    totalCpu: 0,
    totalMemory: 0,
    processes: []
  });

  const api = typeof window !== 'undefined' ? window.mu : {};

  // Listener para receber atualizações de métricas (a cada 4 segundos)
  React.useEffect(() => {
    if (typeof api.onMetricsUpdate !== 'function') return;
    
    return api.onMetricsUpdate((metricsData) => {
      setMetrics(metricsData);
    });
  }, [api]);

  // Formatar memória
  const formatMemory = React.useCallback((bytes) => {
    if (!bytes || bytes === 0) return '0 MB';
    const mb = bytes / (1024 * 1024);
    if (mb < 1024) {
      return `${mb.toFixed(1)} MB`;
    }
    return `${(mb / 1024).toFixed(2)} GB`;
  }, []);

  // Formatar CPU
  const formatCpu = React.useCallback((percent) => {
    if (typeof percent !== 'number' || isNaN(percent)) return '0%';
    return `${percent.toFixed(1)}%`;
  }, []);

  return {
    metrics,
    formatMemory,
    formatCpu,
  };
}

