import { Target, Zap, ShieldCheck } from 'lucide-react';

export const WhyXPPomodoroPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 pb-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Por que unir <span className="text-scarlet-500">XP</span> com Pomodoro?
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
          O Extreme Programming prega ciclos extremamente curtos, feedback contínuo e ritmo sustentável de trabalho. O Pomodoro é o micro-veículo perfeito para executar essa filosofia na sua prática individual.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-[32px] p-8 hover:border-scarlet-500/50 hover:bg-zinc-900 transition-colors shadow-xl">
          <div className="bg-zinc-950 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-zinc-800">
            <Zap className="w-8 h-8 text-scarlet-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Feedback em Micro-Ciclos</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            XP demanda avaliação constante para validar suposições de código. O método Pomodoro pausa a sua tela compulsoriamente a cada 25 minutos, exigindo que você pare e avalie de forma puramente honesta seu desgaste e progresso.
          </p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-[32px] p-8 hover:border-scarlet-500/50 hover:bg-zinc-900 transition-colors shadow-xl">
          <div className="bg-zinc-950 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-zinc-800">
            <ShieldCheck className="w-8 h-8 text-scarlet-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Sustentabilidade</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Nada de burnout. O XP abomina horas extras abusivas, prezando pela maestria contínua. Os curtos e longos intervalos matemáticos do Pomodoro agem perfeitamente como escudos protetores para a sua capacidade cerebral.
          </p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-[32px] p-8 hover:border-scarlet-500/50 hover:bg-zinc-900 transition-colors shadow-xl">
          <div className="bg-zinc-950 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-zinc-800">
            <Target className="w-8 h-8 text-scarlet-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Desenvolvimento Pessoal</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            A etapa do Relatório Contínuo simula com exatidão a cerimônia de Retrospectiva pós-sprints. Ela obriga você a documentar vitórias para consolidar conhecimento antes de se ausentar para descanso.
          </p>
        </div>
      </div>
    </div>
  );
};
