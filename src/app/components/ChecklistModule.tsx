import { useState } from 'react';
import { CheckSquare, Square, AlertTriangle, CheckCircle } from 'lucide-react';

interface ChecklistItem {
  id: number;
  category: string;
  description: string;
  critical?: boolean;
}

const checklistItems: ChecklistItem[] = [
  {
    id: 1,
    category: 'Aproximação',
    description: 'Parada a 5 metros do veículo a ser acoplado',
    critical: true,
  },
  {
    id: 2,
    category: 'Aproximação',
    description: 'Aplicação do freio de estacionamento',
    critical: true,
  },
  {
    id: 3,
    category: 'Aproximação',
    description: 'Comunicação com CCO sobre início do procedimento',
  },
  {
    id: 4,
    category: 'Inspeção Visual',
    description: 'Verificação do alinhamento dos engates',
    critical: true,
  },
  {
    id: 5,
    category: 'Inspeção Visual',
    description: 'Inspeção da mandíbula de engate (sem trincas ou deformações)',
    critical: true,
  },
  {
    id: 6,
    category: 'Inspeção Visual',
    description: 'Verificação da altura dos engates (devem estar nivelados)',
  },
  {
    id: 7,
    category: 'Inspeção Visual',
    description: 'Limpeza da área de engate (sem detritos ou obstruções)',
  },
  {
    id: 8,
    category: 'Equipamentos',
    description: 'Teste do sistema pneumático (pressão adequada)',
    critical: true,
  },
  {
    id: 9,
    category: 'Equipamentos',
    description: 'Verificação das mangueiras de ar (sem vazamentos)',
  },
  {
    id: 10,
    category: 'Equipamentos',
    description: 'Inspeção dos cabos elétricos de engate',
  },
  {
    id: 11,
    category: 'Acoplamento',
    description: 'Aproximação lenta (máximo 2 km/h)',
    critical: true,
  },
  {
    id: 12,
    category: 'Acoplamento',
    description: 'Confirmação sonora do travamento da mandíbula',
    critical: true,
  },
  {
    id: 13,
    category: 'Acoplamento',
    description: 'Teste de tração leve para validar o engate',
    critical: true,
  },
  {
    id: 14,
    category: 'Pós-Acoplamento',
    description: 'Conexão das mangueiras pneumáticas',
    critical: true,
  },
  {
    id: 15,
    category: 'Pós-Acoplamento',
    description: 'Conexão dos cabos elétricos',
  },
  {
    id: 16,
    category: 'Pós-Acoplamento',
    description: 'Teste do sistema de freios da composição completa',
    critical: true,
  },
  {
    id: 17,
    category: 'Pós-Acoplamento',
    description: 'Comunicação ao CCO sobre conclusão do engate',
  },
];

export function ChecklistModule() {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleItem = (itemId: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const categories = Array.from(new Set(checklistItems.map(item => item.category)));
  const progress = (checkedItems.size / checklistItems.length) * 100;
  const criticalItems = checklistItems.filter(item => item.critical);
  const criticalCompleted = criticalItems.filter(item => checkedItems.has(item.id)).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">Checklist Digital de Engate</h2>
        <p className="text-zinc-400">
          Verificação de segurança para procedimentos de acoplamento
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-zinc-300">Progresso Total</span>
            <span className="text-sm font-bold text-green-400">
              {checkedItems.size}/{checklistItems.length}
            </span>
          </div>
          <div className="w-full bg-zinc-900 rounded-full h-3 mb-2">
            <div
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-zinc-500">{Math.round(progress)}% concluído</p>
        </div>

        <div className="bg-zinc-800 border border-yellow-600/40 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-zinc-300">Itens Críticos</span>
            <span className="text-sm font-bold text-yellow-400">
              {criticalCompleted}/{criticalItems.length}
            </span>
          </div>
          <div className="w-full bg-zinc-900 rounded-full h-3 mb-2">
            <div
              className="bg-yellow-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(criticalCompleted / criticalItems.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-zinc-500">
            {criticalCompleted === criticalItems.length ? '✓ Todos verificados' : 'Requer atenção especial'}
          </p>
        </div>
      </div>

      {categories.map((category) => (
        <div key={category} className="bg-zinc-800 border border-zinc-700 rounded-lg p-5">
          <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-green-500" />
            {category}
          </h3>
          <div className="space-y-3">
            {checklistItems
              .filter((item) => item.category === category)
              .map((item) => {
                const isChecked = checkedItems.has(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`w-full flex items-start gap-4 p-4 rounded-lg transition-all border-2 text-left ${
                      isChecked
                        ? 'bg-green-950/30 border-green-600/40'
                        : item.critical
                        ? 'bg-zinc-900 border-yellow-600/30 hover:border-yellow-600/50'
                        : 'bg-zinc-900 border-zinc-700 hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {isChecked ? (
                        <CheckSquare className="w-6 h-6 text-green-500" />
                      ) : (
                        <Square className="w-6 h-6 text-zinc-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${
                        isChecked ? 'text-zinc-400 line-through' : 'text-zinc-200'
                      }`}>
                        {item.description}
                      </p>
                      {item.critical && !isChecked && (
                        <div className="flex items-center gap-1 mt-2">
                          <AlertTriangle className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs text-yellow-400 font-medium">Item Crítico</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      ))}

      {checkedItems.size === checklistItems.length && (
        <div className="bg-green-950/30 border-2 border-green-600 rounded-lg p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-green-400 mb-2">
            Checklist Completo!
          </h3>
          <p className="text-sm text-zinc-300">
            Todos os itens de segurança foram verificados. O engate está autorizado para operação.
          </p>
        </div>
      )}

      <div className="bg-red-950/20 border border-red-600/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-zinc-300">
            <p className="font-medium text-red-400 mb-1">Aviso de Segurança</p>
            <p>Nunca pule etapas do checklist. Todos os itens críticos devem ser verificados antes de iniciar o acoplamento. Em caso de dúvida, contate o CCO.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
