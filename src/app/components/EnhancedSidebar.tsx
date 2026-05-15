import { useState } from 'react';
import { 
  X, 
  Grid3x3, 
  BookOpen, 
  Star, 
  Wifi, 
  Settings, 
  AlertCircle,
  Download,
  RotateCw,
  ChevronDown,
  BarChart3,
  Bell,
  Shield
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  subItems?: MenuItem[];
}

export function EnhancedSidebar({ activeModule, onModuleChange, isOpen, onClose }: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'Central Operacional',
      icon: <Grid3x3 className="w-5 h-5" />,
    },
    {
      id: 'protocols',
      label: 'Protocolos',
      icon: <BookOpen className="w-5 h-5" />,
      badge: 'Novo',
      subItems: [
        { id: 'protocols-all', label: 'Todos os Protocolos' },
        { id: 'protocols-emergency', label: 'Emergências' },
        { id: 'protocols-procedures', label: 'Procedimentos' },
        { id: 'protocols-regulations', label: 'Regulamentos' },
      ]
    },
    {
      id: 'favorites',
      label: 'Favoritos',
      icon: <Star className="w-5 h-5" />,
    },
    {
      id: 'offline',
      label: 'Offline',
      icon: <Wifi className="w-5 h-5" />,
    },
    {
      id: 'revisions',
      label: 'Revisões',
      icon: <RotateCw className="w-5 h-5" />,
    },
    {
      id: 'emergency',
      label: 'Emergência',
      icon: <AlertCircle className="w-5 h-5" />,
      badge: '2 alertas',
    },
    {
      id: 'downloads',
      label: 'Downloads',
      icon: <Download className="w-5 h-5" />,
    },
    {
      id: 'notifications',
      label: 'Notificações',
      icon: <Bell className="w-5 h-5" />,
      badge: '3 novas',
    },
  ];

  const bottomMenuItems: MenuItem[] = [
    {
      id: 'monitoring',
      label: 'Monitoramento',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      id: 'security',
      label: 'Segurança',
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const handleMenuClick = (id: string) => {
    onModuleChange(id);
    if (isOpen) onClose();
  };

  const handleSubMenuClick = (id: string) => {
    onModuleChange(id);
    if (isOpen) onClose();
  };

  const toggleExpand = (id: string) => {
    setExpandedMenu(expandedMenu === id ? null : id);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative
          h-screen w-64
          bg-black border-r border-zinc-800
          flex flex-col
          transition-all duration-300 ease-in-out
          z-50 lg:z-auto
          ${isOpen ? 'left-0' : '-left-64 lg:left-0'}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">🚂 Ferroviária</h1>
            <p className="text-xs text-zinc-500">Central Operacional</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map(item => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.subItems) {
                    toggleExpand(item.id);
                  } else {
                    handleMenuClick(item.id);
                  }
                }}
                className={`
                  w-full px-4 py-3 rounded-lg
                  flex items-center justify-between
                  transition-colors
                  ${activeModule === item.id
                    ? 'bg-blue-600/20 border border-blue-500/30 text-blue-400'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }
                `}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {item.icon}
                  <span className="text-sm font-medium truncate">{item.label}</span>
                  {item.badge && (
                    <span className="text-xs bg-red-600/20 text-red-400 px-2 py-0.5 rounded whitespace-nowrap">
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.subItems && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform flex-shrink-0 ${
                      expandedMenu === item.id ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {item.subItems && expandedMenu === item.id && (
                <div className="mt-1 ml-4 space-y-1 border-l border-zinc-800 pl-4">
                  {item.subItems.map(subItem => (
                    <button
                      key={subItem.id}
                      onClick={() => handleSubMenuClick(subItem.id)}
                      className={`
                        w-full text-left px-3 py-2 rounded text-sm
                        transition-colors
                        ${activeModule === subItem.id
                          ? 'bg-blue-600/20 text-blue-400'
                          : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                        }
                      `}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Divider */}
        <div className="px-4">
          <div className="h-px bg-zinc-800" />
        </div>

        {/* Bottom Menu */}
        <div className="p-4 space-y-2">
          {bottomMenuItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`
                w-full px-4 py-3 rounded-lg
                flex items-center gap-3
                transition-colors
                ${activeModule === item.id
                  ? 'bg-blue-600/20 border border-blue-500/30 text-blue-400'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }
              `}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Footer Status */}
        <div className="p-4 border-t border-zinc-800 space-y-3">
          <div className="px-3 py-2 bg-zinc-900/50 rounded text-xs">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              Sistema Online
            </div>
            <p className="text-zinc-500">Última sincronização: agora</p>
          </div>
          <p className="text-xs text-zinc-600 text-center">v2.1.0</p>
        </div>
      </aside>
    </>
  );
}
