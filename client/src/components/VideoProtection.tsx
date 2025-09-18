import { useEffect } from 'react';

interface VideoProtectionProps {
  onViolationDetected?: () => void;
  onAdBlockDetected?: () => void;
}

export function VideoProtection({ onViolationDetected, onAdBlockDetected }: VideoProtectionProps) {
  useEffect(() => {
    // Detectar ambiente local e desabilitar proteções
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isLocalhost) {
      console.log("🚀 Modo Local Detectado - Proteções de Vídeo Desabilitadas para Desenvolvimento");
      return;
    }
    
    // 1. Detectar Ad Blockers (com menos falsos positivos)
    const detectAdBlocker = (): Promise<boolean> => {
      return new Promise((resolve) => {
        // Aguardar mais tempo para evitar detecções falsas no carregamento
        setTimeout(() => {
          let detectionScore = 0;
          const tests = [];
          
          // Teste 1: Elemento fake de anúncio
          const test1 = new Promise<number>((resolveTest) => {
            const adElement = document.createElement('div');
            adElement.innerHTML = '&nbsp;';
            adElement.className = 'adsbox';
            adElement.style.cssText = `
              position: absolute !important;
              top: -1px !important;
              left: -1px !important;
              width: 1px !important;
              height: 1px !important;
              visibility: hidden !important;
            `;
            
            document.body.appendChild(adElement);
            
            setTimeout(() => {
              const isBlocked = adElement.offsetHeight === 0 || 
                               adElement.offsetWidth === 0;
              document.body.removeChild(adElement);
              resolveTest(isBlocked ? 1 : 0);
            }, 200);
          });
          
          // Teste 2: Verificar lista de bloqueadores conhecidos
          const test2 = new Promise<number>((resolveTest) => {
            const knownBlockers = [
              'uBlock', 'AdBlock', 'Adblock', 'AdGuard', 'Ghostery'
            ];
            
            let found = 0;
            knownBlockers.forEach(blocker => {
              if (window.hasOwnProperty(blocker.toLowerCase()) ||
                  document.querySelector(`[class*="${blocker.toLowerCase()}"]`) ||
                  navigator.userAgent.includes(blocker)) {
                found++;
              }
            });
            
            resolveTest(found > 0 ? 1 : 0);
          });
          
          // Teste 3: Verificar modificações específicas de ad blockers
          const test3 = new Promise<number>((resolveTest) => {
            const testDiv = document.createElement('div');
            testDiv.innerHTML = 'advertisement';
            testDiv.style.display = 'none';
            document.body.appendChild(testDiv);
            
            setTimeout(() => {
              const computed = window.getComputedStyle(testDiv);
              const isHidden = computed.display === 'none' && 
                              testDiv.offsetHeight === 0;
              document.body.removeChild(testDiv);
              resolveTest(isHidden ? 0 : 1); // Se não foi escondido, pode ter ad blocker
            }, 100);
          });
          
          tests.push(test1, test2, test3);
          
          Promise.all(tests).then((scores) => {
            const totalScore = scores.reduce((a, b) => a + b, 0);
            // Só considera ad blocker se pelo menos 2 testes derem positivo
            resolve(totalScore >= 2);
          });
          
        }, 3000); // Aguardar 3 segundos antes de começar os testes
      });
    };

    // 2. Detectar IDM pelos atributos que ele adiciona
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

    // 3. Detectar extensões de download por mudanças no DOM
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

    // 4. Detectar DevTools (tentativa de inspecionar elementos)
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

    // 5. Bloquear tentativas de debug via console
    const blockConsoleAccess = () => {
      const methods = ['log', 'error', 'warn', 'info', 'debug'];
      methods.forEach(method => {
        (console as any)[method] = () => {};
      });
    };

    // 6. Proteção contra right-click e seleção
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
      // Desabilitar detecção de ad blocker em desenvolvimento para evitar problemas
      let adBlockTimeout: NodeJS.Timeout | null = null;
      if (!import.meta.env.DEV) {
        adBlockTimeout = setTimeout(() => {
          detectAdBlocker().then((hasAdBlocker) => {
            if (hasAdBlocker && onAdBlockDetected) {
              onAdBlockDetected();
            }
          });
        }, 8000); // Aguardar 8 segundos apenas em produção
      }
      
      // Verificar ad blocker apenas em produção e com menos frequência
      let adBlockCheckInterval: NodeJS.Timeout | null = null;
      if (!import.meta.env.DEV) {
        adBlockCheckInterval = setInterval(() => {
          if (!sessionStorage.getItem('adBlockChecked')) {
            detectAdBlocker().then((hasAdBlocker) => {
              if (hasAdBlocker && onAdBlockDetected) {
                sessionStorage.setItem('adBlockChecked', 'true');
                onAdBlockDetected();
                if (adBlockCheckInterval) clearInterval(adBlockCheckInterval);
              }
            });
          } else {
            if (adBlockCheckInterval) clearInterval(adBlockCheckInterval);
          }
        }, 120000); // Verificar a cada 2 minutos apenas em produção
      }
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
        if (adBlockCheckInterval) clearInterval(adBlockCheckInterval);
        if (adBlockTimeout) clearTimeout(adBlockTimeout);
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