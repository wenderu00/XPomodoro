import { ShieldCheck, Target, Zap } from 'lucide-react';
import type { Metadata } from 'next';
import { FeatureGrid } from '@/components/ui/feature-grid';
import { PageHeader } from '@/components/ui/page-header';

export const metadata: Metadata = { title: 'A filosofia · XPomodoro' };

const reasons = [
  {
    title: 'Feedback em micro-ciclos',
    description:
      'XP demanda avaliação constante para validar suposições de código. O método Pomodoro pausa a sua tela compulsoriamente a cada 25 minutos, exigindo que você pare e avalie de forma puramente honesta seu desgaste e progresso.',
    icon: <Zap aria-hidden="true" />,
  },
  {
    title: 'Sustentabilidade',
    description:
      'Nada de burnout. O XP abomina horas extras abusivas, prezando pela maestria contínua. Os curtos e longos intervalos matemáticos do Pomodoro agem perfeitamente como escudos protetores para a sua capacidade cerebral.',
    icon: <ShieldCheck aria-hidden="true" />,
  },
  {
    title: 'Desenvolvimento pessoal',
    description:
      'A etapa do Relatório Contínuo simula com exatidão a cerimônia de Retrospectiva pós-sprints. Ela obriga você a documentar vitórias para consolidar conhecimento antes de se ausentar para descanso.',
    icon: <Target aria-hidden="true" />,
  },
];

export default function WhyXPPomodoroPage() {
  return (
    <div className="mx-auto flex w-full max-w-content flex-col gap-10 px-6 py-16">
      <PageHeader
        kicker="a filosofia"
        title="Por que unir XP com Pomodoro?"
        description="O Extreme Programming prega ciclos extremamente curtos, feedback contínuo e ritmo sustentável de trabalho. O Pomodoro é o micro-veículo perfeito para executar essa filosofia na sua prática individual."
      />
      <FeatureGrid columns={3} items={reasons} />
    </div>
  );
}
