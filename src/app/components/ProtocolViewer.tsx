import { ArrowLeft, FileText, AlertTriangle, Star, BookOpen } from 'lucide-react';
import { protocols, Protocol, ProtocolSection } from '../data/protocols';

interface ProtocolViewerProps {
  protocolId: string;
  onBack: () => void;
}

function SectionContent({ section, level = 0 }: { section: ProtocolSection; level?: number }) {
  return (
    <div className={`${level > 0 ? 'ml-6' : ''}`}>
      <div className={`mb-4 ${section.critical ? 'bg-red-950/20 border-2 border-red-600/40 rounded-lg p-4' : ''}`}>
        <h3 className={`font-bold mb-3 flex items-center gap-2 ${
          level === 0 ? 'text-xl text-zinc-100' :
          level === 1 ? 'text-lg text-zinc-200' :
          'text-base text-zinc-300'
        }`}>
          {section.critical && <AlertTriangle className="w-5 h-5 text-red-500" />}
          {section.title}
        </h3>

        <div className="space-y-2">
          {section.content.map((item, idx) => (
            <p key={idx} className="text-zinc-300 leading-relaxed pl-4 border-l-2 border-green-600/40">
              {item}
            </p>
          ))}
        </div>

        {section.warning && (
          <div className="mt-3 bg-yellow-950/30 border border-yellow-600/40 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs font-semibold text-yellow-400 mb-1">ATENÇÃO</p>
                <p className="text-sm text-yellow-300">{section.warning}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {section.subsections && (
        <div className="space-y-4 mt-4">
          {section.subsections.map((subsection) => (
            <SectionContent
              key={subsection.id}
              section={subsection}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ProtocolViewer({ protocolId, onBack }: ProtocolViewerProps) {
  const protocol = protocols.find(p => p.id === protocolId);

  if (!protocol) {
    return (
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-8 text-center">
          <p className="text-zinc-400">Protocolo não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar para busca
      </button>

      <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700 rounded-lg p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-green-600 rounded font-mono font-bold text-white">
                {protocol.code}
              </span>
              <span className="px-3 py-1 bg-zinc-900 rounded text-sm text-zinc-300">
                {protocol.category}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-zinc-100 mb-2">{protocol.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
              <span>{protocol.revision}</span>
              <span>•</span>
              <span>Atualizado em {protocol.lastUpdate}</span>
            </div>
          </div>
          <button className="p-3 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors">
            <Star className="w-6 h-6 text-zinc-400 hover:text-yellow-500" />
          </button>
        </div>

        <div className="pt-4 border-t border-zinc-700">
          <p className="text-xs font-semibold text-zinc-400 mb-2">TIPOS DE OCORRÊNCIA</p>
          <div className="flex flex-wrap gap-2">
            {protocol.occurrenceTypes.map((type, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-zinc-900 border border-zinc-700 rounded text-sm text-zinc-300"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-6 h-6 text-green-500" />
          <h2 className="text-xl font-bold text-zinc-100">Conteúdo do Protocolo</h2>
        </div>

        <div className="space-y-6">
          {protocol.sections.map((section) => (
            <SectionContent key={section.id} section={section} />
          ))}
        </div>
      </div>

      <div className="bg-blue-950/20 border border-blue-600/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-zinc-300">
            <p className="font-medium text-blue-400 mb-1">Leitura Completa</p>
            <p>Leia todo o protocolo antes de executar qualquer procedimento. Em caso de dúvida, consulte o CCO antes de prosseguir.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
