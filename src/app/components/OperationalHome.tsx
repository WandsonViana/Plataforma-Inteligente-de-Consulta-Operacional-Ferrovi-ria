import { useState } from 'react';
import { Search, AlertCircle, Clock, Star, Wifi, TrendingUp, Zap } from 'lucide-react';

interface OperationalCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  color: string;
  onClick: () => void;
}

interface Protocol {
  id: string;
  code: string;
  title: string;
  type: 'emergency' | 'procedure' | 'regulation' | 'notice';
  lastAccess?: string;
  isFavorite: boolean;
  isOffline: boolean;
}

export function OperationalHome({ 
  onNavigate, 
  onProtocolSelect 
}: { 
  onNavigate: (module: string) => void;
  onProtocolSelect?: (id: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Protocol[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const recentProtocols: Protocol[] = [
    { id: '1', code: 'EOT-2024-001', title: 'Estação de Origem/Término - Procedimento Padrão', type: 'procedure', lastAccess: '5 min', isFavorite: true, isOffline: true },
    { id: '2', code: 'EMG-2024-005', title: 'Protocolo de Emergência - Desacoplamento de Vagoneta', type: 'emergency', lastAccess: '2h', isFavorite: false, isOffline: true },
    { id: '3', code: 'ATC-2024-012', title: 'Sistema de Controle Automático de Tráfego', type: 'regulation', lastAccess: '1d', isFavorite: true, isOffline: false },
  ];

  const favorites: Protocol[] = [
    { id: '1', code: 'EOT-2024-001', title: 'Estação de Origem/Término - Procedimento Padrão', type: 'procedure', isFavorite: true, isOffline: true },
    { id: '4', code: 'HELPER-2024-003', title: 'Acoplamento Dinâmico de Helper', type: 'procedure', isFavorite: true, isOffline: true },
  ];

  const criticalProcedures: Protocol[] = [
    { id: '2', code: 'EMG-2024-005', title: 'Protocolo de Emergência - Desacoplamento', type: 'emergency', isFavorite: false, isOffline: true },
    { id: '5', code: 'CCO-2024-007', title: 'Centro de Controle Operacional - Procedimentos', type: 'regulation', isFavorite: false, isOffline: false },
  ];

  const offlineProtocols: Protocol[] = [
    { id: '1', code: 'EOT-2024-001', title: 'Estação de Origem/Término - Procedimento Padrão', type: 'procedure', isFavorite: true, isOffline: true },
    { id: '2', code: 'EMG-2024-005', title: 'Protocolo de Emergência - Desacoplamento', type: 'emergency', isFavorite: false, isOffline: true },
    { id: '4', code: 'HELPER-2024-003', title: 'Acoplamento Dinâmico de Helper', type: 'procedure', isFavorite: true, isOffline: true },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = recentProtocols.filter(p => 
        p.code.toLowerCase().includes(query.toLowerCase()) ||
        p.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const operationalCards: OperationalCard[] = [
    {
      id: 'recent',
      title: 'Protocolos Recentes',
      description: `${recentProtocols.length} protocolos`,
      icon: <Clock className="w-6 h-6" />,
      color: 'from-blue-900 to-blue-800',
      onClick: () => onNavigate('search'),
    },
    {
      id: 'favorites',
      title: 'Favoritos',
      description: `${favorites.length} protocolos`,
      icon: <Star className="w-6 h-6" />,
      color: 'from-amber-900 to-amber-800',
      onClick: () => onNavigate('favorites'),
    },
    {
      id: 'critical',
      title: 'Procedimentos Críticos',
      description: `${criticalProcedures.length} urgentes`,
      icon: <AlertCircle className="w-6 h-6" />,
      color: 'from-red-900 to-red-800',
      onClick: () => onNavigate('search'),
      badge: 'CRÍTICO',
    },
    {
      id: 'offline',
      title: 'Disponível Offline',
      description: `${offlineProtocols.length} protocolos`,
      icon: <Wifi className="w-6 h-6" />,
      color: 'from-green-900 to-green-800',
      onClick: () => onNavigate('search'),
    },
  ];

  const getTypeColor = (type: Protocol['type']) => {
    switch(type) {
      case 'emergency': return 'bg-red-900/30 border-red-700 text-red-200';
      case 'procedure': return 'bg-blue-900/30 border-blue-700 text-blue-200';
      case 'regulation': return 'bg-purple-900/30 border-purple-700 text-purple-200';
      case 'notice': return 'bg-yellow-900/30 border-yellow-700 text-yellow-200';
      default: return 'bg-zinc-800 border-zinc-700 text-zinc-200';
    }
  };

  const getTypeBadge = (type: Protocol['type']) => {
    switch(type) {
      case 'emergency': return 'EMERGÊNCIA';
      case 'procedure': return 'PROCEDIMENTO';
      case 'regulation': return 'REGULAMENTO';
      case 'notice': return 'NOTIFICAÇÃO';
      default: return 'PROTOCOLO';
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white">Central Operacional</h1>
        <p className="text-zinc-400">Busca inteligente de protocolos ferroviários</p>
      </div>

      {/* Main Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="w-5 h-5 text-zinc-500" />
        </div>
        <input
          type="text"
          placeholder="Pesquise por protocolo, emergência, helper, desacoplamento, ATC, CCO..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        
        {/* Search Results Dropdown */}
        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-50">
            {searchResults.map(protocol => (
              <button
                key={protocol.id}
                onClick={() => {
                  onProtocolSelect?.(protocol.id);
                  setShowSearchResults(false);
                  setSearchQuery('');
                }}
                className="w-full px-4 py-3 text-left hover:bg-zinc-800 border-b border-zinc-700 last:border-b-0 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{protocol.code}</p>
                    <p className="text-sm text-zinc-400">{protocol.title}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${getTypeColor(protocol.type)}`}>
                    {getTypeBadge(protocol.type)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Operational Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {operationalCards.map(card => (
          <button
            key={card.id}
            onClick={card.onClick}
            className={`relative overflow-hidden rounded-lg p-6 text-left transition-all hover:scale-105 hover:shadow-xl group`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-80`} />
            
            {/* Industrial Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent), linear-gradient(rgba(255,255,255,.03) 24%, transparent 25%, transparent 74%, rgba(255,255,255,.03) 75%, rgba(255,255,255,.03))',
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between">
                <div className="text-white/80 group-hover:text-white transition-colors">
                  {card.icon}
                </div>
                {card.badge && (
                  <span className="text-xs font-bold px-2 py-1 bg-black/50 text-red-300 rounded">
                    {card.badge}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-white font-bold">{card.title}</h3>
                <p className="text-sm text-white/70">{card.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Protocols Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Protocolos Recentes
          </h2>
          <button onClick={() => onNavigate('search')} className="text-blue-400 hover:text-blue-300 text-sm">
            Ver todos →
          </button>
        </div>
        <div className="space-y-2">
          {recentProtocols.map(protocol => (
            <button
              key={protocol.id}
              onClick={() => onProtocolSelect?.(protocol.id)}
              className="w-full p-4 bg-zinc-900/50 border border-zinc-700 rounded-lg hover:bg-zinc-800/50 hover:border-zinc-600 transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-blue-400">{protocol.code}</span>
                    <span className={`text-xs px-2 py-1 rounded ${getTypeColor(protocol.type)}`}>
                      {getTypeBadge(protocol.type)}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-300 mt-1 group-hover:text-white transition-colors">{protocol.title}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  {protocol.isFavorite && <Star className="w-4 h-4 fill-amber-500 text-amber-500" />}
                  {protocol.isOffline && <Wifi className="w-4 h-4 text-green-500" />}
                  {protocol.lastAccess && <span>{protocol.lastAccess}</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button 
          onClick={() => onNavigate('search')}
          className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg hover:bg-zinc-800 hover:border-zinc-600 transition-all text-center"
        >
          <Search className="w-5 h-5 mx-auto mb-2 text-zinc-400" />
          <p className="text-xs text-zinc-300">Buscar</p>
        </button>
        <button 
          onClick={() => onNavigate('favorites')}
          className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg hover:bg-zinc-800 hover:border-zinc-600 transition-all text-center"
        >
          <Star className="w-5 h-5 mx-auto mb-2 text-amber-500" />
          <p className="text-xs text-zinc-300">Favoritos</p>
        </button>
        <button 
          onClick={() => onNavigate('list')}
          className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg hover:bg-zinc-800 hover:border-zinc-600 transition-all text-center"
        >
          <Zap className="w-5 h-5 mx-auto mb-2 text-purple-400" />
          <p className="text-xs text-zinc-300">Protocolos</p>
        </button>
        <button 
          onClick={() => onNavigate('notifications')}
          className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg hover:bg-zinc-800 hover:border-zinc-600 transition-all text-center"
        >
          <AlertCircle className="w-5 h-5 mx-auto mb-2 text-red-500" />
          <p className="text-xs text-zinc-300">Alertas</p>
        </button>
      </div>
    </div>
  );
}
