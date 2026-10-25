'use client';

import { useState, type ReactNode } from 'react';
import { LocalStorageSessionRepository } from '@/features/session/adapters/repositories/LocalStorageSessionRepository';
import { createSessionDependencies } from '@/features/session/ui/context/createSessionDependencies';
import { SessionDependencyProvider } from '@/features/session/ui/context/SessionDependencyContext';

export const Providers = ({ children }: { children: ReactNode }) => {
  const [dependencies] = useState(() => createSessionDependencies(new LocalStorageSessionRepository()));
  return <SessionDependencyProvider dependencies={dependencies}>{children}</SessionDependencyProvider>;
};
