import { useState } from 'react';
import { Gauge, AlertCircle } from 'lucide-react';

const vehicleTypes = [
  { id: 'al-35', label: 'AL-35 (Locomotiva)' },
  { id: 'caminhao-linha', label: 'Caminhão de Linha' },
  { id: 'carro-controle', label: 'Carro Controle' },
  { id: 'dresina', label: 'Dresina' },
  { id: 'trem-lastro', label: 'Trem Lastro' },
];

const signalAspects = [
  { id: 'verde', label: 'Verde', color: 'bg-green-600' },
  { id: 'amarelo', label: 'Amarelo', color: 'bg-yellow-500' },
  { id: 'amarelo-piscante', label: 'Amarelo Piscante', color: 'bg-yellow-600' },
  { id: 'vermelho', label: 'Vermelho', color: 'bg-red-600' },
];

const vmaData: Record<string, Record<string, number>> = {
  'al-35': {
    'verde': 85,
    'amarelo': 45,
    'amarelo-piscante': 30,
    'vermelho': 0,
  },
  'caminhao-linha': {
    'verde': 60,
    'amarelo': 30,
    'amarelo-piscante': 20,
    'vermelho': 0,
  },
  'carro-controle': {
    'verde': 70,
    'amarelo': 40,
    'amarelo-piscante': 25,
    'vermelho': 0,
  },
  'dresina': {
    'verde': 50,
    'amarelo': 25,
    'amarelo-piscante': 15,
    'vermelho': 0,
  },
  'trem-lastro': {
    'verde': 40,
    'amarelo': 20,
    'amarelo-piscante': 15,
    'vermelho': 0,
  },
};

export function VMAModule() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [selectedSignal, setSelectedSignal] = useState<string>('');

  const calculatedSpeed = selectedVehicle && selectedSignal
    ? vmaData[selectedVehicle]?.[selectedSignal]
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">Filtro Inteligente VMA</h2>
        <p className="text-zinc-400">
          Velocidade Máxima Autorizada conforme PGS-005951
        </p>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-3">
            Tipo de Veículo
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {vehicleTypes.map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => setSelectedVehicle(vehicle.id)}
                className={`px-6 py-4 rounded-lg font-medium transition-all ${
                  selectedVehicle === vehicle.id
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                    : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-700 border border-zinc-600'
                }`}
              >
                {vehicle.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-3">
            Aspecto do Sinal
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {signalAspects.map((signal) => (
              <button
                key={signal.id}
                onClick={() => setSelectedSignal(signal.id)}
                className={`px-6 py-4 rounded-lg font-medium transition-all border-2 ${
                  selectedSignal === signal.id
                    ? `${signal.color} text-white border-white shadow-lg`
                    : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-700 border-zinc-600'
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${signal.color} mx-auto mb-2`} />
                {signal.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {calculatedSpeed !== null && (
        <div className="bg-gradient-to-br from-green-900/30 to-zinc-800 border-2 border-green-600 rounded-lg p-8 text-center">
          <Gauge className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <p className="text-zinc-300 mb-2">Velocidade Máxima Autorizada</p>
          <div className="text-6xl font-bold text-green-400 mb-2">
            {calculatedSpeed}
            <span className="text-3xl ml-2">km/h</span>
          </div>
          {calculatedSpeed === 0 && (
            <div className="mt-4 flex items-center justify-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">PARADA OBRIGATÓRIA</span>
            </div>
          )}
        </div>
      )}

      {!selectedVehicle || !selectedSignal ? (
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 text-center">
          <p className="text-zinc-400">
            Selecione o tipo de veículo e o aspecto do sinal para consultar a VMA
          </p>
        </div>
      ) : null}

      <div className="bg-yellow-950/20 border border-yellow-600/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-zinc-300">
            <p className="font-medium text-yellow-400 mb-1">Atenção</p>
            <p>As velocidades apresentadas são baseadas no PGS-005951 e devem ser respeitadas rigorosamente. Condições especiais de via ou determinações do CCO podem estabelecer limites inferiores.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
