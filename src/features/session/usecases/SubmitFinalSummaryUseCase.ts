import { ISessionRepository } from '../domain/repositories/ISessionRepository';

export class SubmitFinalSummaryUseCase {
  constructor(private sessionRepository: ISessionRepository) {}

  async execute(summaryText: string): Promise<{ xpGained: number; totalXP: number }> {
    if (!summaryText || summaryText.trim().length === 0) {
      throw new Error('O resumo não pode estar vazio para ganhar XP.');
    }

    const session = await this.sessionRepository.getActiveSession();

    if (!session) {
      throw new Error('Nenhuma sessão ativa encontrada.');
    }

    if (session.status !== 'pending_summary') {
      throw new Error('A sessão não está aguardando um resumo.');
    }

    const xpGained = session.getXPToAward();
    session.summary = { text: summaryText, earnedXP: xpGained };
    session.status = 'completed';

    await this.sessionRepository.saveSession(session);
    await this.sessionRepository.updateUserXP(xpGained);
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('xpomodoro:xp-updated'));
    }

    const userStats = await this.sessionRepository.getUserStats();

    return {
      xpGained,
      totalXP: userStats.totalXP,
    };
  }
}
