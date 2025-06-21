
import { useState } from 'react';
import { User, FolderOpen, Mail, Eye, Settings, LogOut } from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (id: string, title: string, content: string) => void;
}

const StartMenu = ({ isOpen, onClose, onOpenWindow }: StartMenuProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  if (!isOpen) return null;

  const menuItems = [
    { id: 'about', title: 'Sobre Mim', icon: User, description: 'Informações pessoais' },
    { id: 'projects', title: 'Projetos', icon: FolderOpen, description: 'Portfolio de trabalhos' },
    { id: 'vision', title: 'Visão', icon: Eye, description: 'Missão e objetivos' },
    { id: 'contact', title: 'Contacto', icon: Mail, description: 'Formas de me contactar' },
  ];

  const handleItemClick = (id: string, title: string) => {
    console.log('🔊 Menu item click sound');
    onOpenWindow(id, title, id);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Start Menu */}
      <div className="fixed bottom-12 left-2 z-50 animate-slide-up">
        <div className="window-glass rounded-lg p-4 w-80 shadow-2xl">
          {/* User Profile Section */}
          <div className="flex items-center space-x-3 p-3 mb-4 glass rounded-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Meu Nome</h3>
              <p className="text-blue-200 text-sm">Desenvolvedor</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id, item.title)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-left
                  ${hoveredItem === item.id 
                    ? 'bg-white/20 transform scale-105' 
                    : 'hover:bg-white/10'
                  }
                `}
              >
                <item.icon 
                  size={18} 
                  className={`
                    ${hoveredItem === item.id ? 'text-yellow-200' : 'text-blue-200'}
                    transition-colors duration-200
                  `} 
                />
                <div>
                  <div className="text-white font-medium text-sm">{item.title}</div>
                  <div className="text-blue-200 text-xs">{item.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex justify-between">
              <button className="vista-button p-2 text-white hover:bg-white/20">
                <Settings size={16} />
              </button>
              <button className="vista-button p-2 text-white hover:bg-red-500/20">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
