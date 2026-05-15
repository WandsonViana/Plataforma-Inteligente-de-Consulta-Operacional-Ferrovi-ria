import { useState } from 'react';
import { Search, X, AlertTriangle, FileText, Clock, Star } from 'lucide-react';
import { protocols, commonOccurrences, categories } from '../data/protocols';

interface SearchModuleProps {
  onProtocolSelect: (protocolId: string) => void;
}

export function SearchModule({ onProtocolSelect }: SearchModuleProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProtocols = protocols.filter((protocol) => {
    const matchesSearch = searchQuery === '' ||
      protocol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      protocol.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      protocol.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      protocol.occurrenceTypes.some(o => o.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || protocol.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">Consulta de Protocolos</h2>
        <p className="text-zinc-400">
          Busque rapidamente por código, tipo de ocorrência ou palavra-chave
        </p>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Digite o código do protocolo, tipo de ocorrência ou palavra-chave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-green-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-zinc-300 mb-3">Busca Rápida por Ocorrência</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {commonOccurrences.map((occurrence) => (
            <button
              key={occurrence}
              onClick={() => setSearchQuery(occurrence)}
              className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700 hover:border-green-600 transition-colors text-left"
            >
              {occurrence}
            </button>
          ))}
        </div>
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
            Todas
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
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-zinc-300">
            Resultados ({filteredProtocols.length})
          </h3>
        </div>

        {filteredProtocols.length === 0 ? (
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8 text-center">
            <Search className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400">
              Nenhum protocolo encontrado com os critérios de busca
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProtocols.map((protocol) => (
              <button
                key={protocol.id}
                onClick={() => onProtocolSelect(protocol.id)}
                className="w-full bg-zinc-800 border border-zinc-700 hover:border-green-600 rounded-lg p-5 text-left transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-1 bg-green-600/20 border border-green-600/40 rounded text-xs font-mono text-green-400">
                        {protocol.code}
                      </span>
                      <span className="px-2 py-1 bg-zinc-900 rounded text-xs text-zinc-400">
                        {protocol.category}
                      </span>
                    </div>
                    <h4 className="font-semibold text-zinc-100 group-hover:text-green-400 transition-colors">
                      {protocol.title}
                    </h4>
                  </div>
                  <FileText className="w-5 h-5 text-zinc-500 group-hover:text-green-500 transition-colors flex-shrink-0" />
                </div>

                <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {protocol.lastUpdate}
                  </span>
                  <span>{protocol.revision}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {protocol.occurrenceTypes.slice(0, 3).map((type, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-zinc-900 rounded text-xs text-zinc-400"
                    >
                      {type}
                    </span>
                  ))}
                  {protocol.occurrenceTypes.length > 3 && (
                    <span className="px-2 py-0.5 text-xs text-zinc-500">
                      +{protocol.occurrenceTypes.length - 3}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="bg-yellow-950/20 border border-yellow-600/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-zinc-300">
            <p className="font-medium text-yellow-400 mb-1">Dica de Uso</p>
            <p>Para encontrar o protocolo correto rapidamente, busque por: código (ex: PRO-031252), tipo de ocorrência (ex: "falha de freios") ou palavras-chave relacionadas à situação.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
