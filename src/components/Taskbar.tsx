
import { useState } from 'react';
import { WindowState } from '../hooks/useWindowManager';
import ClockComponent from './Clock';
import StartMenu from './StartMenu';

interface TaskbarProps {
  windows: WindowState[];
  onRestoreWindow: (id: string) => void;
  onOpenWindow: (id: string, title: string, content: string) => void;
}

const Taskbar = ({ windows, onRestoreWindow, onOpenWindow }: TaskbarProps) => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const activeWindows = windows.filter(w => !w.isMinimized);
  const minimizedWindows = windows.filter(w => w.isMinimized);

  const handleStartClick = () => {
    console.log('🔊 Start button click sound');
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const handleTaskClick = (windowId: string) => {
    console.log('🔊 Task click sound');
    onRestoreWindow(windowId);
  };

  return (
    <>
      <StartMenu 
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onOpenWindow={onOpenWindow}
      />
      
      <div className="fixed bottom-0 left-0 right-0 h-12 z-30 taskbar-shine border-t border-white/20">
        <div className="flex items-center justify-between h-full px-2">
          {/* Start Button - Circular and protruding */}
          <div className="relative">
            <button
              onClick={handleStartClick}
              className={`
                relative w-14 h-14 -mt-2 rounded-full transition-all duration-200 overflow-hidden
                ${isStartMenuOpen 
                  ? 'bg-white/30 shadow-inner' 
                  : 'hover:bg-white/20'
                }
              `}
              style={{
                background: isStartMenuOpen 
                  ? 'rgba(255, 255, 255, 0.3)' 
                  : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: isStartMenuOpen 
                  ? 'inset 0 2px 4px rgba(0, 0, 0, 0.3)' 
                  : '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Placeholder for Windows logo */}
              <div className="w-full h-full bg-gradient-to-br from-black to-black rounded-full flex items-center justify-center">
                <div 
                  className="w-16 h-16 bg-cover bg-center bg-no-repeat opacity-90"
                  style={{
                    backgroundImage: 'url(/vista.png)',
                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))'
                  }}
                >
                  {/* Fallback icon if image doesn't load 
                  <span className="text-white text-lg font-bold flex items-center justify-center w-full h-full">⊞</span>
                  */}
                </div>
              </div>
            </button>
          </div>

          {/* Task Buttons */}
          <div className="flex-1 flex items-center space-x-1 mx-4 overflow-x-auto">
            {minimizedWindows.map((window) => (
              <button
                key={window.id}
                onClick={() => handleTaskClick(window.id)}
                className="vista-button px-3 py-1 text-white text-sm min-w-32 max-w-48 truncate hover:bg-white/20"
                title={window.title}
              >
                {window.title}
              </button>
            ))}
          </div>

          {/* System Tray */}
          <div className="flex items-center space-x-3">
            <ClockComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Taskbar;
