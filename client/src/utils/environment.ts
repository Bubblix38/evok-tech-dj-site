// Utilitário para detectar ambiente de desenvolvimento local (mais restritivo)
export function isLocalDevelopment(): boolean {
  const hostname = window.location.hostname;
  
  // Apenas hostnames claramente locais
  const isLocalHost = 
    hostname === 'localhost' || 
    hostname === '127.0.0.1' ||
    hostname === '::1';
    
  // Variáveis de ambiente Vite (mais confiável)
  const isDevEnv = 
    import.meta.env?.DEV === true ||
    import.meta.env?.MODE === 'development';
    
  const result = isLocalHost || isDevEnv;
  
  // Log para debug
  if (result) {
    console.log('Ambiente de desenvolvimento detectado:', {
      hostname,
      protocol: window.location.protocol,
      DEV: import.meta.env?.DEV,
      MODE: import.meta.env?.MODE
    });
  }
  
  return result;
}

// Função para forçar modo desenvolvimento (útil para testes)
export function forceDevMode(): void {
  (window as any).__FORCE_DEV_MODE__ = true;
  console.log('Modo desenvolvimento forçado ativado');
}

// Verificar se modo desenvolvimento foi forçado
export function isForcedDevMode(): boolean {
  return !!(window as any).__FORCE_DEV_MODE__;
}

// Função combinada final
export function isDevelopmentMode(): boolean {
  return isForcedDevMode() || isLocalDevelopment();
}