import { useState } from 'react';
import { CheckCircle, Circle, AlertTriangle, Battery, Ruler, Gauge } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  warning?: string;
  critical?: boolean;
}

const helperSteps: Step[] = [
  {
    id: 1,
    title: 'Verificação do EOT (End of Train)',
    description: 'Verificar nível de bateria do EOT. Deve estar acima de 30% para operação segura.',
    warning: 'Bateria abaixo de 30% requer substituição antes de iniciar',
    critical: true,
  },
  {
    id: 2,
    title: 'Comunicação com CCO',
    description: 'Estabelecer comunicação com Centro de Controle Operacional e informar início do procedimento de perseguição.',
  },
  {
    id: 3,
    title: 'Verificação de Distância',
    description: 'Monitorar distância relativa ao trem carregado. Manter distância segura mínima de 100 metros durante aproximação.',
    critical: true,
  },
  {
    id: 4,
    title: 'Controle de Velocidade Relativa',
    description: 'Velocidade de aproximação não deve exceder 5 km/h em relação ao trem perseguido.',
    warning: 'Velocidade excessiva pode causar danos ao engate',
    critical: true,
  },
  {
    id: 5,
    title: 'Aproximação Final',
    description: 'Reduzir velocidade para 2 km/h nos últimos 20 metros. Observar alinhamento dos engates.',
  },
  {
    id: 6,
    title: 'Acoplamento',
    description: 'Executar acoplamento suave. Aguardar confirmação sonora e visual do engate.',
    critical: true,
  },
  {
    id: 7,
    title: 'Verificação Pós-Acoplamento',
    description: 'Verificar acoplamento completo, testar freios e confirmar comunicação entre composições.',
  },
  {
    id: 8,
    title: 'Confirmação com CCO',
    description: 'Reportar ao CCO conclusão bem-sucedida do acoplamento e status operacional.',
  },
];

export function HelperModule() {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [batteryLevel, setBatteryLevel] = useState<number>(75);
  const [distance, setDistance] = useState<number>(150);
  const [relativeSpeed, setRelativeSpeed] = useState<number>(3);

  const toggleStep = (stepId: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const progress = (completedSteps.size / helperSteps.length) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">Assistente Helper Dinâmico (EFC)</h2>
        <p className="text-zinc-400">
          Procedimento PRO-031252: Testar, Perseguir e Acoplar Helper Dinâmico
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`bg-zinc-800 border rounded-lg p-4 ${
          batteryLevel < 30 ? 'border-red-600/50' : 'border-zinc-700'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Battery className={`w-5 h-5 ${batteryLevel < 30 ? 'text-red-500' : 'text-green-500'}`} />
            <span className="text-sm font-medium text-zinc-300">Bateria EOT</span>
          </div>
          <div className="text-3xl font-bold text-zinc-100 mb-2">{batteryLevel}%</div>
          <input
            type="range"
            min="0"
            max="100"
            value={batteryLevel}
            onChange={(e) => setBatteryLevel(Number(e.target.value))}
            className="w-full"
          />
          {batteryLevel < 30 && (
            <p className="text-xs text-red-400 mt-2">⚠️ Nível crítico - substituir</p>
          )}
        </div>

        <div className={`bg-zinc-800 border rounded-lg p-4 ${
          distance < 50 ? 'border-yellow-600/50' : 'border-zinc-700'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Ruler className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-zinc-300">Distância Relativa</span>
          </div>
          <div className="text-3xl font-bold text-zinc-100 mb-2">{distance}m</div>
          <input
            type="range"
            min="0"
            max="500"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full"
          />
          {distance < 50 && (
            <p className="text-xs text-yellow-400 mt-2">⚠️ Reduzir velocidade</p>
          )}
        </div>

        <div className={`bg-zinc-800 border rounded-lg p-4 ${
          relativeSpeed > 5 ? 'border-red-600/50' : 'border-zinc-700'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Gauge className={`w-5 h-5 ${relativeSpeed > 5 ? 'text-red-500' : 'text-green-500'}`} />
            <span className="text-sm font-medium text-zinc-300">Velocidade Relativa</span>
          </div>
          <div className="text-3xl font-bold text-zinc-100 mb-2">{relativeSpeed} km/h</div>
          <input
            type="range"
            min="0"
            max="10"
            value={relativeSpeed}
            onChange={(e) => setRelativeSpeed(Number(e.target.value))}
            className="w-full"
          />
          {relativeSpeed > 5 && (
            <p className="text-xs text-red-400 mt-2">⚠️ Velocidade excessiva</p>
          )}
        </div>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-zinc-300">Progresso do Procedimento</span>
          <span className="text-sm font-bold text-green-400">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-zinc-900 rounded-full h-3">
          <div
            className="bg-green-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {helperSteps.map((step) => {
          const isCompleted = completedSteps.has(step.id);
          return (
            <div
              key={step.id}
              className={`bg-zinc-800 border rounded-lg p-5 transition-all ${
                step.critical
                  ? 'border-yellow-600/40'
                  : 'border-zinc-700'
              } ${isCompleted ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleStep(step.id)}
                  className="flex-shrink-0 mt-1"
                >
                  {isCompleted ? (
                    <CheckCircle className="w-7 h-7 text-green-500" />
                  ) : (
                    <Circle className="w-7 h-7 text-zinc-500 hover:text-zinc-400" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className={`font-semibold mb-1 ${
                        isCompleted ? 'text-zinc-500 line-through' : 'text-zinc-100'
                      }`}>
                        {step.id}. {step.title}
                      </h3>
                      <p className={`text-sm mb-2 ${
                        isCompleted ? 'text-zinc-600' : 'text-zinc-400'
                      }`}>
                        {step.description}
                      </p>
                      {step.warning && !isCompleted && (
                        <div className="flex items-start gap-2 mt-2 bg-yellow-950/30 border border-yellow-600/30 rounded p-3">
                          <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-yellow-400">{step.warning}</p>
                        </div>
                      )}
                    </div>
                    {step.critical && !isCompleted && (
                      <span className="px-2 py-1 bg-yellow-600/20 border border-yellow-600/40 rounded text-xs font-medium text-yellow-400 whitespace-nowrap">
                        CRÍTICO
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {completedSteps.size === helperSteps.length && (
        <div className="bg-green-950/30 border-2 border-green-600 rounded-lg p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-green-400 mb-2">
            Procedimento Concluído com Sucesso
          </h3>
          <p className="text-sm text-zinc-300">
            Todas as etapas foram verificadas. O helper está acoplado e pronto para operação.
          </p>
        </div>
      )}
    </div>
  );
}
