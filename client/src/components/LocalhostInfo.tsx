import { isDevelopmentMode } from '../utils/environment';

interface LocalhostInfoProps {
  isLocalhost: boolean;
}

export default function LocalhostInfo({ isLocalhost }: LocalhostInfoProps) {
  // Usar utilitário compartilhado
  const showInfo = isLocalhost || isDevelopmentMode();
    
  if (!showInfo) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm border border-blue-400" data-testid="status-local-dev">
      <div className="flex items-start gap-3">
        <div className="text-2xl">DEV</div>
        <div>
          <h3 className="font-bold text-sm mb-2">Modo Desenvolvimento Local</h3>
          <ul className="text-xs space-y-1 text-blue-100">
            <li>• Vídeos adaptados para localhost</li>
            <li>• Proteções anti-download desabilitadas</li>
            <li>• Ad-block detection desativada</li>
            <li>• Efeitos retro funcionando</li>
          </ul>
          <div className="mt-2 text-xs text-blue-200">
            Em produção todos os recursos funcionarão normalmente!
          </div>
        </div>
      </div>
    </div>
  );
}