
import { useWindowManager } from '../hooks/useWindowManager';
import FolderIcon from './FolderIcon';
import Window from './Window';
import Taskbar from './Taskbar';

const Desktop = () => {
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    updateWindowPosition,
    bringToFront
  } = useWindowManager();

  const folderItems = [
    { id: 'about', title: 'Sobre Mim', position: { x: 42, y: 50 } },
    { id: 'projects', title: 'Projetos', position: { x: 50, y: 150 } },
    { id: 'vision', title: 'Visão', position: { x: 50, y: 250 } },
    { id: 'contact', title: 'Contacto', position: { x: 50, y: 350 } },
  ];

  const handleFolderClick = (id: string, title: string) => {
    openWindow(id, title, id);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]" />
      </div>

      {/* Desktop Icons */}
      {folderItems.map((item) => (
        <FolderIcon
          key={item.id}
          id={item.id}
          title={item.title}
          position={item.position}
          onClick={handleFolderClick}
        />
      ))}

      {/* Windows */}
      {windows.map((window) => (
        <Window
          key={window.id}
          window={window}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onRestore={() => restoreWindow(window.id)}
          onPositionChange={(position) => updateWindowPosition(window.id, position)}
          onBringToFront={() => bringToFront(window.id)}
        />
      ))}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onRestoreWindow={restoreWindow}
        onOpenWindow={openWindow}
      />
    </div>
  );
};

export default Desktop;
