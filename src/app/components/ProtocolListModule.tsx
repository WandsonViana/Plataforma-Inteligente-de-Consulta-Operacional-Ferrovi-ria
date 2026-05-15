import { FileText, ChevronRight, AlertTriangle } from 'lucide-react';
import { protocols, categories } from '../data/protocols';
import { useState } from 'react';

interface ProtocolListModuleProps {
  onProtocolSelect: (protocolId: string) => void;
}

export function ProtocolListModule({ onProtocolSelect }: ProtocolListModuleProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProtocols = selectedCategory === 'all'
    ? protocols
    : protocols.filter(p => p.category === selectedCategory);

  const groupedProtocols = categories.reduce((acc, category) => {
    acc[category] = protocols.filter(p => p.category === category);
    return acc;
  }, {} as Record<string, typeof protocols>);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">Lista de Protocolos</h2>
        <p className="text-zinc-400">
          Todos os protocolos disponíveis organizados por categoria
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-zinc-300 mb-3">Filtrar por Categoria</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
            }`}
          >
            Todos ({protocols.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
              }`}
            >
              {category} ({groupedProtocols[category]?.length || 0})
            </button>
          ))}
        </div>
      </div>

      {selectedCategory === 'all' ? (
        // Mostrar agrupado por categoria
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryProtocols = groupedProtocols[category] || [];
            if (categoryProtocols.length === 0) return null;

            return (
              <div key={category} className="bg-zinc-800 border border-zinc-700 rounded-lg p-5">
                <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-500" />
                  {category}
                  <span className="text-sm font-normal text-zinc-500">
                    ({categoryProtocols.length})
                  </span>
                </h3>
                <div className="space-y-2">
                  {categoryProtocols.map((protocol) => (
                    <button
                      key={protocol.id}
                      onClick={() => onProtocolSelect(protocol.id)}
                      className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-700 hover:border-green-600 border border-zinc-800 rounded-lg transition-all group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <span className="px-3 py-1 bg-green-600/20 border border-green-600/40 rounded font-mono text-sm text-green-400 font-semibold">
                          {protocol.code}
                        </span>
                        <div className="text-left flex-1">
                          <h4 className="font-semibold text-zinc-100 group-hover:text-green-400 transition-colors">
                            {protocol.title}
                          </h4>
                          <p className="text-xs text-zinc-500 mt-1">
                            {protocol.revision} • {protocol.lastUpdate}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-green-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Mostrar lista simples filtrada
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5">
          <h3 className="text-lg font-bold text-zinc-100 mb-4">
            {selectedCategory} ({filteredProtocols.length})
          </h3>
          <div className="space-y-2">
            {filteredProtocols.map((protocol) => (
              <button
                key={protocol.id}
                onClick={() => onProtocolSelect(protocol.id)}
                className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-700 hover:border-green-600 border border-zinc-800 rounded-lg transition-all group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="px-3 py-1 bg-green-600/20 border border-green-600/40 rounded font-mono text-sm text-green-400 font-semibold">
                    {protocol.code}
                  </span>
                  <div className="text-left flex-1">
                    <h4 className="font-semibold text-zinc-100 group-hover:text-green-400 transition-colors">
                      {protocol.title}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1">
                      {protocol.revision} • {protocol.lastUpdate}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-green-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-950/20 border border-blue-600/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-zinc-300">
            <p className="font-medium text-blue-400 mb-1">Total de Protocolos</p>
            <p>O sistema possui {protocols.length} protocolos disponíveis para consulta, organizados em {categories.length} categorias diferentes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
