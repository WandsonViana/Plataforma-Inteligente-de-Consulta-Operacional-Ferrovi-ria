import { AlertTriangle, Search, FileText, Clock, TrendingUp } from 'lucide-react';

interface HomeModuleProps {
  onNavigate: (module: string) => void;
  onProtocolSelect: (protocolId: string) => void;
}

export function HomeModule({ onNavigate, onProtocolSelect }: HomeModuleProps) {
  const recentProtocols = [
    { id: 'pgs-005951', code: 'PGS-005951', title: 'Velocidades Máximas Autorizadas', time: 'Há 2 horas' },
    { id: 'pro-031252', code: 'PRO-031252', title: 'Procedimento de Helper Dinâmico', time: 'Há 5 horas' },
    { id: 'pro-emergency-01', code: 'PRO-EMG-001', title: 'Emergência - Falha de Freios', time: 'Ontem' },
  ];

  const quickAccess = [
    { id: 'pro-emergency-01', code: 'PRO-EMG-001', title: 'Falha de Freios', category: 'Emergência', color: 'red' },
    { id: 'pro-signal-01', code: 'PRO-SIN-002', title: 'Sinal Apagado', category: 'Sinalização', color: 'yellow' },
    { id: 'pro-031252', code: 'PRO-031252', title: 'Helper Dinâmico', category: 'Acoplamento', color: 'green' },
    { id: 'pgs-005951', code: 'PGS-005951', title: 'Consulta VMA', category: 'Operação', color: 'blue' },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red': return 'border-red-600/40 bg-red-950/20 hover:border-red-600';
      case 'yellow': return 'border-yellow-600/40 bg-yellow-950/20 hover:border-yellow-600';
      case 'green': return 'border-green-600/40 bg-green-950/20 hover:border-green-600';
      case 'blue': return 'border-blue-600/40 bg-blue-950/20 hover:border-blue-600';
      default: return 'border-zinc-700 bg-zinc-800 hover:border-zinc-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">Consulta Rápida de Protocolos</h2>
        <p className="text-zinc-400">
          Acesse rapidamente os manuais e procedimentos operacionais
        </p>
      </div>

      <button
        onClick={() => onNavigate('search')}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-lg p-6 transition-all shadow-lg shadow-green-600/20"
      >
        <div className="flex items-center justify-center gap-3">
          <Search className="w-8 h-8 text-white" />
          <div className="text-left">
            <h3 className="text-xl font-bold text-white">Buscar Protocolo</h3>
            <p className="text-sm text-green-100">Digite o código, ocorrência ou palavra-chave</p>
          </div>
        </div>
      </button>

      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
        <h3 className="font-semibold text-zinc-100 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          Acesso Rápido - Situações Comuns
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickAccess.map((protocol) => (
            <button
              key={protocol.id}
              onClick={() => {
                onNavigate('viewer');
                onProtocolSelect(protocol.id);
              }}
              className={`border-2 rounded-lg p-4 text-left transition-all ${getColorClasses(protocol.color)}`}
            >
              <span className="text-xs font-mono text-zinc-400 block mb-1">{protocol.code}</span>
              <h4 className="font-semibold text-zinc-100 mb-1">{protocol.title}</h4>
              <span className="text-xs text-zinc-400">{protocol.category}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
        <h3 className="font-semibold text-zinc-100 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          Consultas Recentes
        </h3>
        <div className="space-y-2">
          {recentProtocols.map((protocol) => (
            <button
              key={protocol.id}
              onClick={() => {
                onNavigate('viewer');
                onProtocolSelect(protocol.id);
              }}
              className="w-full flex items-center justify-between p-3 bg-zinc-900 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-zinc-400" />
                <div className="text-left">
                  <p className="text-sm font-medium text-zinc-200">{protocol.title}</p>
                  <p className="text-xs text-zinc-500">{protocol.code}</p>
                </div>
              </div>
              <span className="text-xs text-zinc-500">{protocol.time}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-zinc-300">Total de Protocolos</span>
          </div>
          <div className="text-3xl font-bold text-zinc-100">5</div>
          <p className="text-xs text-zinc-500 mt-1">Disponíveis para consulta</p>
        </div>

        <div className="bg-zinc-800 border border-yellow-600/40 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-zinc-300">Atualizações</span>
          </div>
          <div className="text-3xl font-bold text-yellow-400">2</div>
          <p className="text-xs text-zinc-500 mt-1">Revisões recentes (últimos 30 dias)</p>
        </div>
      </div>

      <div className="bg-blue-950/20 border border-blue-600/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Search className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-zinc-300">
            <p className="font-medium text-blue-400 mb-1">Como Usar</p>
            <p>Use a busca para encontrar protocolos por código (ex: PRO-031252), tipo de ocorrência (ex: "falha de freios") ou categoria. Os protocolos são apresentados de forma clara e organizada para leitura rápida em situações operacionais.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
