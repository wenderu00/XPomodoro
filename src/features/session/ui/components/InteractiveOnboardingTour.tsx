import { useState, useEffect } from 'react';
// @ts-ignore
import { Joyride } from 'react-joyride';

const JoyrideAny = Joyride as any;

const CustomTooltip = ({ index, isLastStep, step, skipProps, backProps, primaryProps, tooltipProps }: any) => {
  return (
    <div 
      {...tooltipProps} 
      className="bg-zinc-900 border border-zinc-800 rounded-[24px] p-6 shadow-2xl w-80 md:w-96 flex flex-col z-50 text-left"
    >
      <div className="text-zinc-100 text-base leading-relaxed pb-6">
        {step.content}
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-1">
          {!isLastStep && (
            <button {...skipProps} className="text-zinc-500 hover:text-scarlet-500 text-sm font-medium px-3 py-2 transition-colors rounded-lg hover:bg-zinc-800/50">
              Pular tutorial
            </button>
          )}
          {index > 0 && (
            <button {...backProps} className="text-zinc-400 hover:text-zinc-100 text-sm font-medium px-3 py-2 transition-colors rounded-lg hover:bg-zinc-800/50">
              Voltar
            </button>
          )}
        </div>
        <button {...primaryProps} className="bg-scarlet-600 hover:bg-scarlet-500 text-white font-bold py-2 px-6 rounded-xl text-sm transition-colors shadow-lg shadow-scarlet-500/20">
          {isLastStep ? 'Entendi!' : 'Avançar'}
        </button>
      </div>
    </div>
  );
};

export const InteractiveOnboardingTour = ({ forceRun, onForceRunConsumed, isVirginSession }: any) => {
  const [tourKey, setTourKey] = useState(0);
  const [runTour, setRunTour] = useState(() => {
    if (!isVirginSession) return false;
    return localStorage.getItem('@xpomodoro:tour_completed') !== 'true';
  });

  useEffect(() => {
    if (forceRun) {
      setTourKey(prev => prev + 1);
      setRunTour(true);
      onForceRunConsumed();
    }
  }, [forceRun]);

  const tourSteps: any[] = [
    { target: '.tour-header', content: 'Bem-vindo ao XPomodoro! Vamos te guiar rapidamente pelas mecânicas que unem Pomodoro e Extreme Programming.', disableBeacon: true, placement: 'bottom' },
    { target: '.tour-xp-badge', content: 'Aqui fica o seu XP acumulado! Toda vez que você finalizar uma sessão de 4 ciclos e documentar seus aprendizados, este número vai crescer.', disableBeacon: true, placement: 'bottom' },
    { target: '.tour-status-board', content: 'Este é o painel principal. Ele orquestra os 4 ciclos da jornada, dita as regras de trabalho (25 min de foco profundo), e ativa as telas para que você registre seu sentimento de produtividade nas pausas.', disableBeacon: true, placement: 'center' },
    { target: 'body', content: 'Avaliação de Sentimento 🧠: Ao final de cada ciclo, o cronômetro para e uma interface surge exigindo sua franqueza. Você classificará se sua produtividade foi alta, média ou baixa. Isso serve de termômetro pro seu desgaste mental ao longo da sessão!', disableBeacon: true, placement: 'center' },
    { target: 'body', content: 'Retrospectiva XP 🚀: No grand finale, após concluir seus 4 suados ciclos, será hora de fechar a mini-sprint de trabalho. Você vai digitar um Relatório Contínuo informando o que conquistou no dia. Somente após essa validação o seu suado XP é depositado e você é liberado para o descanso estendido.', disableBeacon: true, placement: 'center' },
    { target: '.tour-start-button', content: 'É aqui que seu flow se concretiza na prática. Isole as distrações. Desligue as redes. Coloque os fones e só clique aqui quando estiver verdadeiramente pronto para a guerra.', disableBeacon: true, placement: 'top' }
  ];

  const handleJoyrideCallback = (data: any) => {
    if (['finished', 'skipped'].includes(data.status)) {
      setRunTour(false);
      localStorage.setItem('@xpomodoro:tour_completed', 'true');
    }
  };

  return (
    <JoyrideAny
      key={tourKey}
      steps={tourSteps}
      run={runTour}
      continuous={true}
      showSkipButton={true}
      callback={handleJoyrideCallback}
      tooltipComponent={CustomTooltip}
      styles={{
        options: { 
          arrowColor: '#18181b', 
          primaryColor: '#ff2424',
          overlayColor: 'rgba(255, 36, 36, 0.25)',
          zIndex: 1000
        },
        beaconInner: { backgroundColor: '#ff2424' },
        beaconOuter: { backgroundColor: 'rgba(255, 36, 36, 0.4)', borderColor: '#ff2424' },
        spotlight: {
          borderRadius: '24px',
          boxShadow: '0 0 0 4px rgba(255, 36, 36, 0.5), 0 0 20px rgba(255, 36, 36, 0.8)'
        }
      } as any}
      locale={{ last: 'Entendi!', skip: 'Pular', next: 'Avançar', back: 'Voltar' }}
    />
  );
};
