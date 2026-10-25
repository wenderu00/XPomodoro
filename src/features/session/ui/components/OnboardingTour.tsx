'use client';

import { useState } from 'react';
import { Tour, type TourStep } from '@/components/ui/tour';

const TOUR_KEY = '@xpomodoro:tour_completed';

const steps: TourStep[] = [
  {
    target: '[data-tour="header"]',
    placement: 'bottom',
    content: 'Bem-vindo ao XPomodoro! Vamos te guiar rapidamente pelas mecânicas que unem Pomodoro e Extreme Programming.',
  },
  {
    target: '[data-tour="xp-badge"]',
    placement: 'bottom',
    content: 'Aqui fica o seu XP acumulado. Toda vez que você finalizar uma sessão de 4 ciclos e documentar seus aprendizados, este número vai crescer.',
  },
  {
    target: '[data-tour="status-board"]',
    placement: 'center',
    content: 'Este é o painel principal. Ele orquestra os 4 ciclos da jornada, dita as regras de trabalho (25 min de foco profundo) e abre as telas para você registrar seu sentimento de produtividade nas pausas.',
  },
  {
    title: 'Avaliação de sentimento',
    content: 'Ao final de cada ciclo, o cronômetro para e você classifica sua produtividade como alta, média ou baixa. Isso serve de termômetro para o seu desgaste mental ao longo da sessão.',
  },
  {
    title: 'Retrospectiva XP',
    content: 'Depois dos 4 ciclos, é hora de fechar a mini-sprint: você escreve o que conquistou na sessão. Só depois disso o XP é depositado e você segue para o descanso longo.',
  },
  {
    target: '[data-tour="start-button"]',
    placement: 'top',
    content: 'É aqui que o flow começa. Isole as distrações, desligue as redes, coloque os fones e só clique quando estiver pronto.',
  },
];

interface Props {
  // Cada incremento é um pedido para abrir o tour, vindo do botão de ajuda.
  requestCount: number;
  isVirginSession: boolean;
}

export const OnboardingTour = ({ requestCount, isVirginSession }: Props) => {
  const [open, setOpen] = useState(() => isVirginSession && localStorage.getItem(TOUR_KEY) !== 'true');
  const [handledRequests, setHandledRequests] = useState(requestCount);
  if (requestCount !== handledRequests) {
    setHandledRequests(requestCount);
    setOpen(true);
  }

  const complete = () => {
    localStorage.setItem(TOUR_KEY, 'true');
    setOpen(false);
  };

  return <Tour steps={steps} open={open} onOpenChange={setOpen} onFinish={complete} onSkip={complete} />;
};
