
import { folder } from 'lucide-react';
import { useState } from 'react';

interface FolderIconProps {
  id: string;
  title: string;
  position: { x: number; y: number };
  onClick: (id: string, title: string) => void;
}

const FolderIcon = ({ id, title, position, onClick }: FolderIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Simple click sound simulation
    console.log('🔊 Folder click sound');
    onClick(id, title);
  };

  const handleDoubleClick = () => {
    console.log('🔊 Folder open sound');
    onClick(id, title);
  };

  return (
    <div
      className="absolute cursor-pointer select-none group"
      style={{ left: position.x, top: position.y }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        flex flex-col items-center p-3 rounded-lg transition-all duration-200
        ${isHovered ? 'bg-white/20 backdrop-blur-sm' : 'hover:bg-white/10'}
        ${isHovered ? 'transform scale-105' : ''}
      `}>
        <div className={`
          mb-2 transition-all duration-200 text-yellow-200
          ${isHovered ? 'animate-bounce-subtle' : ''}
        `}>
          <folder 
            size={48} 
            className="drop-shadow-lg filter"
            fill="currentColor"
          />
        </div>
        <span className={`
          text-white text-sm font-medium drop-shadow-lg text-center max-w-20
          ${isHovered ? 'text-yellow-100' : ''}
        `}>
          {title}
        </span>
      </div>
    </div>
  );
};

export default FolderIcon;
