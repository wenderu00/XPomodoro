import { useState, useEffect, useCallback } from 'react';
import { useSessionDependencies } from '../context/SessionDependencyContext';

export const useTotalXP = () => {
  const { getTotalXPUseCase } = useSessionDependencies();
  const [totalXP, setTotalXP] = useState(0);

  const fetchXP = useCallback(async () => {
    const xp = await getTotalXPUseCase.execute();
    setTotalXP(xp);
  }, [getTotalXPUseCase]);

  useEffect(() => {
    fetchXP();

    const listener = () => fetchXP();
    window.addEventListener('xpomodoro:xp-updated', listener);
    return () => window.removeEventListener('xpomodoro:xp-updated', listener);
  }, [fetchXP]);

  return totalXP;
};
