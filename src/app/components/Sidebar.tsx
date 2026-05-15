import { Home, Search, FileText, List, Star, X } from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'home', label: 'Início', icon: Home },
  { id: 'search', label: 'Buscar Protocolos', icon: Search },
  { id: 'list', label: 'Lista de Protocolos', icon: List },
  { id: 'viewer', label: 'Visualizador', icon: FileText },
  { id: 'favorites', label: 'Favoritos', icon: Star },
];

export function Sidebar({ activeModule, onModuleChange, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 transform transition-transform lg:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between lg:hidden">
          <h2 className="font-semibold text-zinc-100">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onModuleChange(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-green-600 text-white'
                        : 'text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
