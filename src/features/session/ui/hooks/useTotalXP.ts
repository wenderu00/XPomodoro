import { useState, useEffect } from 'react';
import { LocalStorageSessionRepository } from '../../adapters/repositories/LocalStorageSessionRepository';

export const useTotalXP = () => {
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    const fetchXP = async () => {
      const repo = new LocalStorageSessionRepository();
      const stats = await repo.getUserStats();
      setTotalXP(stats.totalXP);
    };

    fetchXP();

    const listener = () => fetchXP();
    window.addEventListener('xpomodoro:xp-updated', listener);
    return () => window.removeEventListener('xpomodoro:xp-updated', listener);
  }, []);

  return totalXP;
};
