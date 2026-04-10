import { 
  Users, Target, Clock, Laptop2, CheckSquare, 
  RefreshCw, Share2, FileCode2, Feather, 
  Lightbulb, BatteryCharging, GitMerge, Rocket, 
  LucideIcon 
} from 'lucide-react';

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

export const XPTopicsPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 pb-24 w-full">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Práticas do <span className="text-scarlet-500">Extreme Programming</span>
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
          As lendárias práticas da engenharia de software ágil. Princípios absolutos que priorizam a comunicação cristalina, um feedback reacionário e uma excelência inegociável na entrega.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {xpPractices.map((practice, index) => (
          <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-scarlet-500/50 hover:bg-zinc-900 transition-colors shadow-lg group">
             <div className="flex items-center gap-3 mb-4">
               <div className="bg-zinc-950 border border-zinc-800 p-2 rounded-xl">
                 <practice.Icon className="text-scarlet-500 w-5 h-5 group-hover:scale-110 transition-transform" />
               </div>
               <h3 className="text-lg font-bold text-white leading-tight">{practice.title}</h3>
             </div>
             <p className="text-zinc-400 text-sm leading-relaxed">{practice.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
