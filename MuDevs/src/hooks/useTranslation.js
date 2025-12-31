/**
 * Hook de Tradução - useTranslation
 * Retorna função t() para traduzir strings
 */

import { useContext, createContext } from 'react';
import { getTranslation } from '../i18n/translations';

// Context para idioma global
export const LanguageContext = createContext('pt-BR');

/**
 * Hook para acessar traduções
 * @returns {Object} { t: function, locale: string }
 */
export function useTranslation() {
  const locale = useContext(LanguageContext);

  /**
   * Função de tradução
   * @param {string} key - Chave de tradução (ex: 'sidebar.startAll')
   * @param {Object} params - Parâmetros opcionais para interpolação
   * @returns {string} - Texto traduzido
   */
  const t = (key, params = {}) => {
    let text = getTranslation(locale, key);
    
    // Interpolação simples de parâmetros {paramName}
    if (params && typeof text === 'string') {
      Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
      });
    }
    
    return text;
  };

  return { t, locale };
}
