export interface Protocol {
  id: string;
  code: string;
  title: string;
  category: string;
  revision: string;
  lastUpdate: string;
  occurrenceTypes: string[];
  keywords: string[];
  sections: ProtocolSection[];
}

export interface ProtocolSection {
  id: string;
  title: string;
  content: string[];
  subsections?: ProtocolSection[];
  warning?: string;
  critical?: boolean;
}

export const protocols: Protocol[] = [
  {
    id: 'pgs-005951',
    code: 'PGS-005951',
    title: 'Velocidades Máximas Autorizadas (VMA)',
    category: 'Operação de Via',
    revision: 'Rev. 06',
    lastUpdate: '10/05/2026',
    occurrenceTypes: ['Consulta de velocidade', 'Mudança de sinalização', 'Troca de veículo'],
    keywords: ['velocidade', 'vma', 'sinal', 'aspecto', 'locomotiva', 'via'],
    sections: [
      {
        id: 'sec-1',
        title: '1. Objetivo',
        content: [
          'Este documento estabelece as velocidades máximas autorizadas (VMA) para operação de veículos ferroviários conforme tipo de equipamento e aspecto de sinalização.',
        ],
      },
      {
        id: 'sec-2',
        title: '2. Tabela de Velocidades - Locomotiva AL-35',
        content: [
          'Aspecto Verde: 85 km/h',
          'Aspecto Amarelo: 45 km/h',
          'Aspecto Amarelo Piscante: 30 km/h',
          'Aspecto Vermelho: PARADA OBRIGATÓRIA',
        ],
        critical: true,
      },
      {
        id: 'sec-3',
        title: '3. Tabela de Velocidades - Caminhão de Linha',
        content: [
          'Aspecto Verde: 60 km/h',
          'Aspecto Amarelo: 30 km/h',
          'Aspecto Amarelo Piscante: 20 km/h',
          'Aspecto Vermelho: PARADA OBRIGATÓRIA',
        ],
      },
      {
        id: 'sec-4',
        title: '4. Condições Especiais',
        content: [
          'Em condições de chuva intensa, reduzir VMA em 20%',
          'Em trechos sob manutenção, obedecer sinalização temporária',
          'Comunicar imediatamente ao CCO qualquer irregularidade na via',
        ],
        warning: 'Condições climáticas adversas requerem redução de velocidade',
      },
    ],
  },
  {
    id: 'pro-031252',
    code: 'PRO-031252',
    title: 'Procedimento de Helper Dinâmico',
    category: 'Acoplamento',
    revision: 'Rev. 04',
    lastUpdate: '05/05/2026',
    occurrenceTypes: ['Necessidade de helper', 'Acoplamento de locomotivas', 'Perseguição de trem'],
    keywords: ['helper', 'acoplamento', 'perseguição', 'eot', 'bateria', 'engate'],
    sections: [
      {
        id: 'sec-1',
        title: '1. Pré-Requisitos',
        content: [
          'Verificar nível de bateria do EOT (mínimo 30%)',
          'Comunicação estabelecida com CCO',
          'Condições climáticas favoráveis',
          'Via livre confirmada',
        ],
        critical: true,
      },
      {
        id: 'sec-2',
        title: '2. Procedimento de Perseguição',
        subsections: [
          {
            id: 'subsec-2-1',
            title: '2.1 Início da Aproximação',
            content: [
              'Manter distância mínima de 100 metros',
              'Velocidade relativa máxima: 5 km/h',
              'Monitoramento constante via rádio com CCO',
            ],
            critical: true,
          },
          {
            id: 'subsec-2-2',
            title: '2.2 Aproximação Final',
            content: [
              'Reduzir para 2 km/h nos últimos 20 metros',
              'Verificar alinhamento visual dos engates',
              'Confirmar com auxiliar no solo (se disponível)',
            ],
          },
        ],
      },
      {
        id: 'sec-3',
        title: '3. Acoplamento',
        content: [
          'Executar acoplamento em velocidade controlada',
          'Aguardar confirmação sonora do travamento',
          'Não aplicar potência até confirmação completa',
          'Registrar horário do acoplamento',
        ],
        critical: true,
      },
      {
        id: 'sec-4',
        title: '4. Verificação Pós-Acoplamento',
        content: [
          'Testar freios da composição completa',
          'Verificar comunicação entre locomotivas',
          'Confirmar pressão pneumática estabilizada',
          'Reportar conclusão ao CCO',
        ],
        warning: 'Não iniciar movimento sem teste completo de freios',
      },
    ],
  },
  {
    id: 'pro-emergency-01',
    code: 'PRO-EMG-001',
    title: 'Procedimento de Emergência - Falha de Freios',
    category: 'Emergência',
    revision: 'Rev. 08',
    lastUpdate: '28/04/2026',
    occurrenceTypes: ['Falha de freios', 'Perda de pressão', 'Freio não responde'],
    keywords: ['emergência', 'freio', 'falha', 'pressão', 'pneumático'],
    sections: [
      {
        id: 'sec-1',
        title: '1. Ação Imediata',
        content: [
          'ACIONAR FREIO DE EMERGÊNCIA IMEDIATAMENTE',
          'Comunicar CCO via rádio: "EMERGÊNCIA - FALHA DE FREIOS"',
          'Ativar sinalização de emergência do veículo',
          'NÃO ABANDONAR A CABINE até autorização do CCO',
        ],
        critical: true,
        warning: 'Segurança de vidas depende da execução correta deste procedimento',
      },
      {
        id: 'sec-2',
        title: '2. Avaliação da Situação',
        content: [
          'Verificar manômetro de pressão de ar',
          'Identificar se há vazamento visível/audível',
          'Confirmar se freio manual/emergência está respondendo',
          'Informar ao CCO todas as observações',
        ],
      },
      {
        id: 'sec-3',
        title: '3. Aguardar Instruções',
        content: [
          'Manter comunicação constante com CCO',
          'Aguardar equipe de manutenção',
          'Não tentar reparos sem autorização',
          'Documentar todos os detalhes da ocorrência',
        ],
      },
    ],
  },
  {
    id: 'pro-signal-01',
    code: 'PRO-SIN-002',
    title: 'Sinal Apagado ou Defeituoso',
    category: 'Sinalização',
    revision: 'Rev. 03',
    lastUpdate: '15/04/2026',
    occurrenceTypes: ['Sinal apagado', 'Sinal defeituoso', 'Falha de sinalização'],
    keywords: ['sinal', 'apagado', 'defeito', 'falha', 'sinalização'],
    sections: [
      {
        id: 'sec-1',
        title: '1. Ao Identificar Sinal Apagado',
        content: [
          'CONSIDERAR SINAL COMO ASPECTO VERMELHO',
          'Parar antes do sinal',
          'Comunicar imediatamente ao CCO informando:',
          '  - Localização exata (km)',
          '  - Número do sinal',
          '  - Condição observada',
        ],
        critical: true,
      },
      {
        id: 'sec-2',
        title: '2. Aguardar Autorização',
        content: [
          'NÃO ultrapassar o sinal sem autorização do CCO',
          'CCO irá verificar a situação e liberar via',
          'Anotar número de autorização fornecido pelo CCO',
          'Prosseguir com velocidade reduzida conforme orientação',
        ],
        warning: 'Ultrapassar sinal apagado sem autorização é infração grave',
      },
      {
        id: 'sec-3',
        title: '3. Documentação',
        content: [
          'Registrar no livro de ocorrências:',
          '  - Horário da identificação',
          '  - Localização do sinal',
          '  - Número da autorização do CCO',
          '  - Horário de liberação',
        ],
      },
    ],
  },
  {
    id: 'pro-inspection-01',
    code: 'PRO-INS-003',
    title: 'Inspeção de Engate e Mandíbula',
    category: 'Manutenção Preventiva',
    revision: 'Rev. 05',
    lastUpdate: '20/04/2026',
    occurrenceTypes: ['Inspeção pré-operacional', 'Verificação de engate', 'Manutenção'],
    keywords: ['inspeção', 'engate', 'mandíbula', 'verificação', 'preventiva'],
    sections: [
      {
        id: 'sec-1',
        title: '1. Inspeção Visual',
        content: [
          'Verificar estado geral da mandíbula:',
          '  - Ausência de trincas',
          '  - Ausência de deformações',
          '  - Desgaste dentro dos limites aceitáveis',
          'Verificar pinos de travamento',
          'Limpar área de acoplamento',
        ],
      },
      {
        id: 'sec-2',
        title: '2. Teste Funcional',
        content: [
          'Acionar mecanismo de abertura/fechamento',
          'Verificar resposta do sistema',
          'Testar travamento manual',
          'Confirmar indicação visual de engate travado',
        ],
        critical: true,
      },
      {
        id: 'sec-3',
        title: '3. Critérios de Reprovação',
        content: [
          'Trincas visíveis em qualquer componente',
          'Deformação superior a 5mm',
          'Travamento não responde corretamente',
          'Desgaste além da marca de limite',
        ],
        warning: 'Veículo reprovado NÃO pode operar até manutenção corretiva',
      },
    ],
  },
];

export const categories = [
  'Operação de Via',
  'Acoplamento',
  'Emergência',
  'Sinalização',
  'Manutenção Preventiva',
];

export const commonOccurrences = [
  'Falha de freios',
  'Sinal apagado',
  'Necessidade de helper',
  'Consulta de velocidade',
  'Verificação de engate',
  'Perda de pressão',
  'Inspeção pré-operacional',
];
