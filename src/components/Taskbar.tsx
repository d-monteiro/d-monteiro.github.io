
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
      
      <div className="fixed bottom-0 left-0 right-0 h-12 window-glass border-t border-white/30 z-30">
        <div className="flex items-center justify-between h-full px-2">
          {/* Start Button */}
          <button
            onClick={handleStartClick}
            className={`
              px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200
              ${isStartMenuOpen 
                ? 'bg-white/30 text-white shadow-inner' 
                : 'vista-button text-white hover:bg-white/20'
              }
            `}
          >
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">⊞</span>
              </div>
              <span>Início</span>
            </div>
          </button>

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
