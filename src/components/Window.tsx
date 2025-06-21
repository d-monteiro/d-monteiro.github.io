import { useState, useRef, useEffect } from 'react';
import { X, Minimize2, Maximize2, RotateCcw } from 'lucide-react';
import { WindowState } from '../hooks/useWindowManager';

interface WindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onRestore: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  onBringToFront: () => void;
}

const Window = ({ 
  window, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onRestore, 
  onPositionChange,
  onBringToFront 
}: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        // Keep window within viewport bounds
        const maxX = window.innerWidth - window.size.width;
        const maxY = window.innerHeight - window.size.height - 48; // Account for taskbar
        
        onPositionChange({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onPositionChange, window.size]);

  const handleMouseDown = (e: React.MouseEvent) => {
    onBringToFront();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y
    });
  };

  const getWindowContent = () => {
    switch (window.id) {
      case 'about':
        return (
          <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4 text-yellow-200">Sobre Mim</h2>
            <p className="mb-4 leading-relaxed">
              Olá! Sou um desenvolvedor apaixonado por criar experiências digitais únicas e inovadoras.
            </p>
            <p className="mb-4 leading-relaxed">
              Com experiência em React, TypeScript e design moderno, procuro sempre encontrar o equilíbrio 
              perfeito entre funcionalidade e estética.
            </p>
            <p className="text-blue-200">
              Este website é inspirado no Windows Vista, combinando nostalgia com tecnologias modernas.
            </p>
          </div>
        );
      case 'projects':
        return (
          <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4 text-yellow-200">Projetos</h2>
            <div className="space-y-4">
              <div className="glass p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-200">Vista Desktop</h3>
                <p className="text-sm mt-2">Website pessoal inspirado no Windows Vista com React e Tailwind.</p>
              </div>
              <div className="glass p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-200">Dashboard Analytics</h3>
                <p className="text-sm mt-2">Plataforma de análise de dados com visualizações interativas.</p>
              </div>
              <div className="glass p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-200">E-commerce App</h3>
                <p className="text-sm mt-2">Aplicação de comércio eletrônico com React Native.</p>
              </div>
            </div>
          </div>
        );
      case 'vision':
        return (
          <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4 text-yellow-200">Visão</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                <strong className="text-blue-200">Missão:</strong> Criar soluções digitais que combinam 
                funcionalidade excepcional com design memorável.
              </p>
              <p className="leading-relaxed">
                <strong className="text-blue-200">Visão:</strong> Ser reconhecido como um desenvolvedor 
                que transforma ideias complexas em experiências simples e elegantes.
              </p>
              <p className="leading-relaxed">
                <strong className="text-blue-200">Valores:</strong> Inovação, qualidade, colaboração 
                e aprendizagem contínua.
              </p>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4 text-yellow-200">Contacto</h2>
            <div className="space-y-4">
              <div className="glass p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-200">Email</h3>
                <p className="text-sm mt-1">exemplo@email.com</p>
              </div>
              <div className="glass p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-200">LinkedIn</h3>
                <p className="text-sm mt-1">/in/seu-perfil</p>
              </div>
              <div className="glass p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-200">GitHub</h3>
                <p className="text-sm mt-1">github.com/seu-usuario</p>
              </div>
              <div className="glass p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-200">Localização</h3>
                <p className="text-sm mt-1">Portugal</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6 text-white">
            <p>Conteúdo da janela {window.title}</p>
          </div>
        );
    }
  };

  if (window.isMinimized) {
    return null;
  }

  return (
    <div
      ref={windowRef}
      className="absolute window-glass rounded-lg overflow-hidden animate-fade-in"
      style={{
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex
      }}
      onClick={onBringToFront}
    >
      {/* Window Header */}
      <div
        className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-600/50 to-blue-500/50 border-b border-white/20 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <folder size={16} className="text-yellow-200" />
          <span className="text-white font-medium text-sm">{window.title}</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={onMinimize}
            className="vista-button p-1 hover:bg-yellow-500/20"
            title="Minimizar"
          >
            <Minimize2 size={14} className="text-white" />
          </button>
          
          <button
            onClick={window.isMaximized ? onRestore : onMaximize}
            className="vista-button p-1 hover:bg-green-500/20"
            title={window.isMaximized ? "Restaurar" : "Maximizar"}
          >
            {window.isMaximized ? (
              <RotateCcw size={14} className="text-white" />
            ) : (
              <Maximize2 size={14} className="text-white" />
            )}
          </button>
          
          <button
            onClick={onClose}
            className="vista-button p-1 hover:bg-red-500/50"
            title="Fechar"
          >
            <X size={14} className="text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="overflow-auto" style={{ height: window.size.height - 48 }}>
        {getWindowContent()}
      </div>
    </div>
  );
};

export default Window;
