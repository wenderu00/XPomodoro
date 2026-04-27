import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'

import { LocalStorageSessionRepository } from './features/session/adapters/repositories/LocalStorageSessionRepository'
import { GetSessionUseCase } from './features/session/usecases/GetSessionUseCase'
import { StartWorkUseCase } from './features/session/usecases/StartWorkUseCase'
import { CompleteWorkUseCase } from './features/session/usecases/CompleteWorkUseCase'
import { SubmitFeedbackUseCase } from './features/session/usecases/SubmitFeedbackUseCase'
import { CompleteBreakUseCase } from './features/session/usecases/CompleteBreakUseCase'
import { ResetSessionUseCase } from './features/session/usecases/ResetSessionUseCase'
import { SubmitFinalSummaryUseCase } from './features/session/usecases/SubmitFinalSummaryUseCase'
import { GetTotalXPUseCase } from './features/session/usecases/GetTotalXPUseCase'
import { SessionDependencyProvider } from './features/session/ui/context/SessionDependencyContext'

const repository = new LocalStorageSessionRepository();

const dependencies = {
  getSessionUseCase: new GetSessionUseCase(repository),
  startWorkUseCase: new StartWorkUseCase(repository),
  completeWorkUseCase: new CompleteWorkUseCase(repository),
  submitFeedbackUseCase: new SubmitFeedbackUseCase(repository),
  completeBreakUseCase: new CompleteBreakUseCase(repository),
  resetSessionUseCase: new ResetSessionUseCase(repository),
  submitSummaryUseCase: new SubmitFinalSummaryUseCase(repository),
  getTotalXPUseCase: new GetTotalXPUseCase(repository)
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SessionDependencyProvider dependencies={dependencies}>
      <App />
    </SessionDependencyProvider>
  </React.StrictMode>,
)
