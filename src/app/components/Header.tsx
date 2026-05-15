import { Train, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors lg:hidden"
          aria-label="Menu"
        >
          <Menu className="w-6 h-6 text-zinc-100" />
        </button>
        <div className="flex items-center gap-2">
          <Train className="w-8 h-8 text-green-500" />
          <div>
            <h1 className="text-xl font-bold text-zinc-100">Maquinista 4.0</h1>
            <p className="text-xs text-zinc-400">Sistema de Operação Ferroviária</p>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
        <span className="px-2 py-1 bg-zinc-800 rounded">Vale S.A.</span>
      </div>
    </header>
  );
}
