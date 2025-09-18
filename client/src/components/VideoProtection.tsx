import { useEffect } from 'react';

interface VideoProtectionProps {
  onViolationDetected?: () => void;
}

export function VideoProtection({ onViolationDetected }: VideoProtectionProps) {
  useEffect(() => {
    // 1. Detectar IDM pelos atributos que ele adiciona
    const checkForIDM = () => {
      const videos = document.getElementsByTagName('video');
      const iframes = document.getElementsByTagName('iframe');
      
      // Verificar videos
      for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        if (video.hasAttribute('__idm_id__') || 
            video.hasAttribute('idm_id') ||
            video.hasAttribute('data-idm')) {
          return true;
        }
      }
      
      // Verificar iframes
      for (let i = 0; i < iframes.length; i++) {
        const iframe = iframes[i];
        if (iframe.hasAttribute('__idm_id__') || 
            iframe.hasAttribute('idm_id') ||
            iframe.hasAttribute('data-idm')) {
          return true;
        }
      }
      
      return false;
    };

    // 2. Detectar extensões de download por mudanças no DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            
            // Verificar se elementos suspeitos foram adicionados
            const suspiciousClasses = [
              'idm-download-panel',
              'download-helper',
              'video-downloader',
              'media-downloader'
            ];
            
            const suspiciousIds = [
              'idm-cc-interface',
              'download-panel',
              'video-download'
            ];
            
            if (suspiciousClasses.some(cls => element.classList?.contains(cls)) ||
                suspiciousIds.some(id => element.id === id)) {
              if (onViolationDetected) {
                onViolationDetected();
              }
              return;
            }
          }
        });
      });
    });

    // 3. Detectar DevTools (tentativa de inspecionar elementos)
    let devToolsOpen = false;
    const detectDevTools = () => {
      const threshold = 160;
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devToolsOpen) {
          devToolsOpen = true;
          console.clear();
          console.warn('%cATENÇÃO: Proteção de Conteúdo Ativada', 
            'color: red; font-size: 20px; font-weight: bold;');
        }
      } else {
        devToolsOpen = false;
      }
    };

    // 4. Bloquear tentativas de debug via console
    const blockConsoleAccess = () => {
      const methods = ['log', 'error', 'warn', 'info', 'debug'];
      methods.forEach(method => {
        (console as any)[method] = () => {};
      });
    };

    // 5. Proteção contra right-click e seleção
    const preventRightClick = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const preventSelection = (e: Event) => {
      e.preventDefault();
      return false;
    };

    const preventKeyboard = (e: KeyboardEvent) => {
      // Bloquear F12, Ctrl+Shift+I, Ctrl+U, etc.
      if (e.keyCode === 123 || 
          (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
          (e.ctrlKey && e.keyCode === 85) ||
          (e.ctrlKey && e.keyCode === 83) ||
          (e.ctrlKey && e.keyCode === 65)) {
        e.preventDefault();
        return false;
      }
    };

    // Iniciar proteções
    const startProtection = () => {
      // Verificar IDM periodicamente
      const idmCheckInterval = setInterval(() => {
        if (checkForIDM()) {
          if (onViolationDetected) {
            onViolationDetected();
          }
          clearInterval(idmCheckInterval);
        }
      }, 1000);

      // Observar mudanças no DOM
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'id']
      });

      // Detectar DevTools
      setInterval(detectDevTools, 1000);

      // Aplicar proteções de interface
      document.addEventListener('contextmenu', preventRightClick);
      document.addEventListener('selectstart', preventSelection);
      document.addEventListener('keydown', preventKeyboard);
      document.addEventListener('dragstart', preventSelection);

      // Bloquear console em produção
      if (import.meta.env.PROD) {
        blockConsoleAccess();
      }

      // Limpeza quando o componente for desmontado
      return () => {
        clearInterval(idmCheckInterval);
        observer.disconnect();
        document.removeEventListener('contextmenu', preventRightClick);
        document.removeEventListener('selectstart', preventSelection);
        document.removeEventListener('keydown', preventKeyboard);
        document.removeEventListener('dragstart', preventSelection);
      };
    };

    const cleanup = startProtection();
    return cleanup;
  }, [onViolationDetected]);

  return null; // Componente invisible de proteção
}

export default VideoProtection;