import { Bell, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  document: string;
  revision: string;
  date: string;
  category: 'critical' | 'important' | 'informational';
  changes: string[];
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: 'Atualização de Limites de Velocidade - Setor 3',
    document: 'PGS-005951',
    revision: 'Rev. 06',
    date: '10/05/2026',
    category: 'critical',
    changes: [
      'Redução de VMA para AL-35 em sinal amarelo: de 50 km/h para 45 km/h',
      'Nova sinalização no km 142+500',
      'Atualização de tabela de aspecto de sinais',
    ],
    read: false,
  },
  {
    id: 2,
    title: 'Procedimento de Helper Dinâmico - Nova Etapa de Verificação',
    document: 'PRO-031252',
    revision: 'Rev. 04',
    date: '05/05/2026',
    category: 'important',
    changes: [
      'Adicionada verificação obrigatória de bateria EOT antes de iniciar perseguição',
      'Limite mínimo de bateria estabelecido em 30%',
      'Novo formulário de registro de acoplamento',
    ],
    read: false,
  },
  {
    id: 3,
    title: 'Atualização do Regulamento de Freios',
    document: 'PGS-002722',
    revision: 'Rev. 08',
    date: '28/04/2026',
    category: 'important',
    changes: [
      'Intervalo de teste de freios reduzido de 24h para 12h',
      'Novos critérios de aprovação para teste de freio dinâmico',
      'Atualização de procedimento de emergência',
    ],
    read: true,
  },
  {
    id: 4,
    title: 'Nova Sinalização - Trecho Urbano',
    document: 'ROF-001234',
    revision: 'Rev. 02',
    date: '20/04/2026',
    category: 'informational',
    changes: [
      'Instalação de novos sinais luminosos no km 87+200',
      'Atualização de mapa de via',
      'Comunicado sobre obra programada',
    ],
    read: true,
  },
  {
    id: 5,
    title: 'Procedimento de Inspeção de Engate Atualizado',
    document: 'PRO-045678',
    revision: 'Rev. 03',
    date: '15/04/2026',
    category: 'critical',
    changes: [
      'Nova checklist de inspeção visual obrigatória',
      'Critérios mais rigorosos para aprovação de mandíbulas',
      'Registro fotográfico agora é obrigatório',
    ],
    read: true,
  },
];

export function NotificationsModule() {
  const unreadCount = notifications.filter(n => !n.read).length;

  const getCategoryStyle = (category: Notification['category']) => {
    switch (category) {
      case 'critical':
        return {
          bg: 'bg-red-950/30',
          border: 'border-red-600/40',
          icon: 'text-red-500',
          label: 'CRÍTICO',
          labelBg: 'bg-red-600/20 border-red-600/40 text-red-400',
        };
      case 'important':
        return {
          bg: 'bg-yellow-950/20',
          border: 'border-yellow-600/40',
          icon: 'text-yellow-500',
          label: 'IMPORTANTE',
          labelBg: 'bg-yellow-600/20 border-yellow-600/40 text-yellow-400',
        };
      case 'informational':
        return {
          bg: 'bg-blue-950/20',
          border: 'border-blue-600/40',
          icon: 'text-blue-500',
          label: 'INFORMATIVO',
          labelBg: 'bg-blue-600/20 border-blue-600/40 text-blue-400',
        };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">Notificações ROF</h2>
        <p className="text-zinc-400">
          Atualizações do Regulamento de Operação Ferroviária
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-zinc-300">Total de Notificações</span>
          </div>
          <div className="text-3xl font-bold text-zinc-100">{notifications.length}</div>
        </div>

        <div className="bg-zinc-800 border border-red-600/40 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium text-zinc-300">Não Lidas</span>
          </div>
          <div className="text-3xl font-bold text-red-400">{unreadCount}</div>
        </div>

        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-zinc-300">Última Atualização</span>
          </div>
          <div className="text-lg font-bold text-zinc-100">10/05/2026</div>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const style = getCategoryStyle(notification.category);
          return (
            <div
              key={notification.id}
              className={`border rounded-lg p-5 ${style.bg} ${style.border} ${
                notification.read ? 'opacity-70' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3 flex-1">
                  {notification.read ? (
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Bell className={`w-6 h-6 ${style.icon} flex-shrink-0 mt-0.5`} />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${
                        notification.read ? 'text-zinc-400' : 'text-zinc-100'
                      }`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-3">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {notification.document}
                      </span>
                      <span>•</span>
                      <span>{notification.revision}</span>
                      <span>•</span>
                      <span>{notification.date}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 border rounded text-xs font-medium whitespace-nowrap ${style.labelBg}`}>
                  {style.label}
                </span>
              </div>

              <div className="ml-9">
                <h4 className="text-sm font-medium text-zinc-300 mb-2">Principais Alterações:</h4>
                <ul className="space-y-1">
                  {notification.changes.map((change, index) => (
                    <li key={index} className="text-sm text-zinc-400 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {unreadCount > 0 && (
        <div className="bg-yellow-950/20 border border-yellow-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-zinc-300">
              <p className="font-medium text-yellow-400 mb-1">Ação Necessária</p>
              <p>Você possui {unreadCount} notificação(ões) não lida(s). Revise as atualizações antes de iniciar sua próxima operação.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
