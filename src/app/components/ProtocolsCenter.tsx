import { useState } from 'react';
import { Search, Filter, Download, Eye, Grid3x3, List, TrendingUp, AlertCircle, BookOpen } from 'lucide-react';

interface Protocol {
  id: string;
  code: string;
  title: string;
  description: string;
  type: 'emergency' | 'procedure' | 'regulation' | 'notice';
  lastUpdated: string;
  downloads: number;
  isFavorite: boolean;
  isOffline: boolean;
  version: string;
}

interface ProtocolsCenterProps {
  onProtocolSelect?: (id: string) => void;
}

export function ProtocolsCenter({ onProtocolSelect }: ProtocolsCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'alphabetic'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const protocols: Protocol[] = [
    {
      id: '1',
      code: 'EOT-2024-001',
      title: 'Estação de Origem/Término - Procedimento Padrão',
      description: 'Procedimento operacional para operações em EOT',
      type: 'procedure',
      lastUpdated: '2024-05-15',
      downloads: 1240,
      isFavorite: true,
      isOffline: true,
      version: '2.1.0',
    },
    {
      id: '2',
      code: 'EMG-2024-005',
      title: 'Protocolo de Emergência - Desacoplamento de Vagoneta',
      description: 'Procedimento crítico para situações de emergência',
      type: 'emergency',
      lastUpdated: '2024-05-10',
      downloads: 856,
      isFavorite: false,
      isOffline: true,
      version: '1.5.2',
    },
    {
      id: '3',
      code: 'ATC-2024-012',
      title: 'Sistema de Controle Automático de Tráfego',
      description: 'Regulamento para sistema ATC',
      type: 'regulation',
      lastUpdated: '2024-04-28',
      downloads: 642,
      isFavorite: true,
      isOffline: false,
      version: '3.0.0',
    },
    {
      id: '4',
      code: 'HELPER-2024-003',
      title: 'Acoplamento Dinâmico de Helper',
      description: 'Procedimento técnico para helper dinâmico',
      type: 'procedure',
      lastUpdated: '2024-05-12',
      downloads: 523,
      isFavorite: true,
      isOffline: true,
      version: '2.0.1',
    },
    {
      id: '5',
      code: 'CCO-2024-007',
      title: 'Centro de Controle Operacional - Procedimentos',
      description: 'Regulamento operacional do CCO',
      type: 'regulation',
      lastUpdated: '2024-05-01',
      downloads: 789,
      isFavorite: false,
      isOffline: false,
      version: '1.8.3',
    },
    {
      id: '6',
      code: 'NOT-2024-015',
      title: 'Notificação de Revisão de Procedimentos',
      description: 'Comunicado sobre atualização de procedimentos',
      type: 'notice',
      lastUpdated: '2024-05-14',
      downloads: 234,
      isFavorite: false,
      isOffline: false,
      version: '1.0.0',
    },
  ];

  const getFilteredProtocols = () => {
    let filtered = protocols;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.code.toLowerCase().includes(query) ||
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'recent':
        filtered.sort(
          (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );
        break;
      case 'popular':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'alphabetic':
        filtered.sort((a, b) => a.code.localeCompare(b.code));
        break;
    }

    return filtered;
  };

  const filteredProtocols = getFilteredProtocols();

  const getTypeColor = (type: Protocol['type']) => {
    switch (type) {
      case 'emergency':
        return 'bg-red-900/30 border-red-700 text-red-200';
      case 'procedure':
        return 'bg-blue-900/30 border-blue-700 text-blue-200';
      case 'regulation':
        return 'bg-purple-900/30 border-purple-700 text-purple-200';
      case 'notice':
        return 'bg-yellow-900/30 border-yellow-700 text-yellow-200';
      default:
        return 'bg-zinc-800 border-zinc-700 text-zinc-200';
    }
  };

  const getTypeBadge = (type: Protocol['type']) => {
    switch (type) {
      case 'emergency':
        return '🚨 EMERGÊNCIA';
      case 'procedure':
        return '📋 PROCEDIMENTO';
      case 'regulation':
        return '📜 REGULAMENTO';
      case 'notice':
        return '📢 NOTIFICAÇÃO';
      default:
        return '📄 PROTOCOLO';
    }
  };

  const stats = {
    total: protocols.length,
    favorites: protocols.filter(p => p.isFavorite).length,
    offline: protocols.filter(p => p.isOffline).length,
    totalDownloads: protocols.reduce((sum, p) => sum + p.downloads, 0),
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-blue-400" />
          Central de Protocolos
        </h1>
        <p className="text-zinc-400">Gerenciamento completo de documentação operacional ferroviária</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4">
          <p className="text-zinc-500 text-sm">Total de Protocolos</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4">
          <p className="text-zinc-500 text-sm">Favoritos</p>
          <p className="text-2xl font-bold text-amber-400">{stats.favorites}</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4">
          <p className="text-zinc-500 text-sm">Offline</p>
          <p className="text-2xl font-bold text-green-400">{stats.offline}</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4">
          <p className="text-zinc-500 text-sm">Total Downloads</p>
          <p className="text-2xl font-bold text-blue-400">{stats.totalDownloads.toLocaleString()}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 bg-zinc-900/30 border border-zinc-700 rounded-lg p-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="w-5 h-5 text-zinc-500" />
          </div>
          <input
            type="text"
            placeholder="Buscar por código, título ou descrição..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Type Filter */}
          <div className="flex-1">
            <label className="text-sm text-zinc-400 mb-2 block">Tipo</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">Todos os tipos</option>
              <option value="emergency">🚨 Emergência</option>
              <option value="procedure">📋 Procedimento</option>
              <option value="regulation">📜 Regulamento</option>
              <option value="notice">📢 Notificação</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex-1">
            <label className="text-sm text-zinc-400 mb-2 block">Ordenar por</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="recent">Mais Recentes</option>
              <option value="popular">Mais Popular</option>
              <option value="alphabetic">Alfabético</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex-1">
            <label className="text-sm text-zinc-400 mb-2 block">Visualização</label>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
                Lista
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">
          Exibindo <span className="font-bold text-white">{filteredProtocols.length}</span> de{' '}
          <span className="font-bold text-white">{protocols.length}</span> protocolos
        </p>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProtocols.map(protocol => (
            <button
              key={protocol.id}
              onClick={() => onProtocolSelect?.(protocol.id)}
              className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4 hover:border-zinc-600 hover:bg-zinc-800/50 transition-all text-left group"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <span className={`text-xs px-2 py-1 rounded border ${getTypeColor(protocol.type)}`}>
                    {getTypeBadge(protocol.type)}
                  </span>
                  <div className="flex gap-1">
                    {protocol.isFavorite && (
                      <span className="text-amber-500 text-lg">⭐</span>
                    )}
                    {protocol.isOffline && (
                      <span className="text-green-500 text-lg">📡</span>
                    )}
                  </div>
                </div>

                {/* Code and Title */}
                <div>
                  <p className="font-mono text-sm font-bold text-blue-400">{protocol.code}</p>
                  <p className="font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                    {protocol.title}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 line-clamp-2">{protocol.description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-700">
                  <div className="flex gap-3 text-xs text-zinc-500">
                    <span>v{protocol.version}</span>
                    <span>📥 {protocol.downloads}</span>
                  </div>
                  <Eye className="w-4 h-4 text-zinc-500 group-hover:text-blue-400" />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-2">
          {filteredProtocols.map(protocol => (
            <button
              key={protocol.id}
              onClick={() => onProtocolSelect?.(protocol.id)}
              className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg p-4 hover:border-zinc-600 hover:bg-zinc-800/50 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                {/* Type Icon */}
                <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800">
                  {protocol.type === 'emergency' && <AlertCircle className="w-5 h-5 text-red-500" />}
                  {protocol.type === 'procedure' && <BookOpen className="w-5 h-5 text-blue-500" />}
                  {protocol.type === 'regulation' && <Filter className="w-5 h-5 text-purple-500" />}
                  {protocol.type === 'notice' && <TrendingUp className="w-5 h-5 text-yellow-500" />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-bold text-blue-400">{protocol.code}</span>
                    <span className={`text-xs px-2 py-0.5 rounded border ${getTypeColor(protocol.type)}`}>
                      {getTypeBadge(protocol.type)}
                    </span>
                  </div>
                  <p className="text-white group-hover:text-blue-300 transition-colors">{protocol.title}</p>
                  <p className="text-xs text-zinc-500 mt-1">{protocol.description}</p>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-4 text-xs text-zinc-500">
                  <div className="text-right">
                    <p className="text-zinc-400">v{protocol.version}</p>
                    <p className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {protocol.downloads}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {protocol.isFavorite && <span>⭐</span>}
                    {protocol.isOffline && <span>📡</span>}
                  </div>
                </div>

                <Eye className="w-5 h-5 text-zinc-500 group-hover:text-blue-400 transition-colors flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredProtocols.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-400 text-lg">Nenhum protocolo encontrado</p>
          <p className="text-zinc-600 text-sm mt-1">Tente ajustar seus filtros de busca</p>
        </div>
      )}
    </div>
  );
}
