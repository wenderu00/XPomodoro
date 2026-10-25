import { 
  Users, Target, Clock, Laptop2, CheckSquare, 
  RefreshCw, Share2, FileCode2, Feather, 
  Lightbulb, BatteryCharging, GitMerge, Rocket, 
  LucideIcon
} from 'lucide-react';
import type { Metadata } from 'next';
import { FeatureGrid } from '@/components/ui/feature-grid';
import { PageHeader } from '@/components/ui/page-header';

const xpPractices: { title: string, desc: string, Icon: LucideIcon }[] = [
  { title: "Cliente presente", desc: "Comunicação diária e direta no projeto para evitar qualquer desalinhamento de expectativas.", Icon: Users },
  { title: "Jogo do planejamento", desc: "O Release Planning molda as entregas com base no que traz mais valor rápido ao cliente.", Icon: Target },
  { title: "Stand up meeting", desc: "Reuniões rápidas diárias realizadas em pé para alinhamento focado e identificação de bloqueios.", Icon: Clock },
  { title: "Programação em par", desc: "Dois desenvolvedores simultâneos em um teclado. Revisão contínua assegurando qualidade implacável.", Icon: Laptop2 },
  { title: "Desenvolvimento guiado pelos testes", desc: "TDD: Os testes precedem o código. A estabilidade de negócio vem por design, não por acúmulo.", Icon: CheckSquare },
  { title: "Refactoring", desc: "Melhoria e limpeza sistemática na estrutura sem alterar o comportamento externo.", Icon: RefreshCw },
  { title: "Código coletivo", desc: "O ego não existe no projeto. Qualquer desenvolvedor pode e deve melhorar qualquer trecho do código.", Icon: Share2 },
  { title: "Código padronizado", desc: "Padrões estritos de formatação para que todo o software pareça construído por uma única mente fluida.", Icon: FileCode2 },
  { title: "Design simples", desc: "Faça a coisa mais simples que possa funcionar hoje, eliminando de forma pragmática a entropia futura.", Icon: Feather },
  { title: "Metáfora", desc: "Uma linguagem ubíqua e visão comum traduzida em jargões de negócio claros e consistentes.", Icon: Lightbulb },
  { title: "Ritmo sustentável", desc: "Cansar gera dívida técnica e bugs de desatenção. Foco sustentado como ditam as pausas do Pomodoro.", Icon: BatteryCharging },
  { title: "Integração contínua", desc: "Testes automatizados e builds dezenas de vezes ao dia, mitigando por completo o inferno das mesclagens.", Icon: GitMerge },
  { title: "Releases curtos", desc: "Entregas validadas e funcionais num estrito curto prazo para o cliente lucrar ou pivotar o quanto antes.", Icon: Rocket }
];

export const metadata: Metadata = { title: 'Manual XP · XPomodoro' };

export default function XPTopicsPage() {
  return (
    <div className="mx-auto flex w-full max-w-content flex-col gap-10 px-6 py-16">
      <PageHeader
        kicker="manual xp"
        title="Práticas do Extreme Programming"
        description="As lendárias práticas da engenharia de software ágil. Princípios absolutos que priorizam a comunicação cristalina, um feedback reacionário e uma excelência inegociável na entrega."
      />
      <FeatureGrid
        columns={3}
        items={xpPractices.map((practice) => ({
          title: practice.title,
          description: practice.desc,
          icon: <practice.Icon aria-hidden="true" />,
        }))}
      />
    </div>
  );
}
