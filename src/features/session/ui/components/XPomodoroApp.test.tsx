import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LocalStorageSessionRepository } from "../../adapters/repositories/LocalStorageSessionRepository";
import { createSessionDependencies } from "../context/createSessionDependencies";
import { SessionDependencyProvider } from "../context/SessionDependencyContext";
import { XPomodoroApp } from "./XPomodoroApp";

function renderApp() {
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  render(
    <SessionDependencyProvider dependencies={createSessionDependencies(new LocalStorageSessionRepository())}>
      <XPomodoroApp />
    </SessionDependencyProvider>,
  );
  return user;
}

async function skipPhase(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: /pular cronômetro/i }));
  await act(() => vi.advanceTimersByTimeAsync(1000));
}

describe("XPomodoroApp", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it("começa no ciclo 1 de 4, pronto para iniciar", async () => {
    renderApp();

    expect(await screen.findByRole("button", { name: /iniciar ciclo/i })).toBeInTheDocument();
    expect(screen.getByText(/ciclo 1 de 4/i)).toBeInTheDocument();
    expect(screen.getByText("Pronto para começar")).toBeInTheDocument();
  });

  it("mostra o cronômetro de 25 minutos ao iniciar o ciclo", async () => {
    const user = renderApp();

    await user.click(await screen.findByRole("button", { name: /iniciar ciclo/i }));

    expect(screen.getByRole("timer")).toHaveTextContent("25:00");
    expect(screen.getByText("Foco extremo")).toBeInTheDocument();
  });

  it("pede o feedback no fim do ciclo e inicia a pausa curta de 5 minutos", async () => {
    const user = renderApp();

    await user.click(await screen.findByRole("button", { name: /iniciar ciclo/i }));
    await skipPhase(user);

    expect(screen.getByText(/qual foi o seu sentimento de produtividade/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /alto/i }));

    expect(screen.getByRole("timer")).toHaveTextContent("05:00");
    expect(screen.getByText("Descanso curto")).toBeInTheDocument();
  });

  it("só libera o XP depois do resumo da sessão de 4 ciclos", async () => {
    const user = renderApp();

    for (let cycle = 1; cycle <= 4; cycle++) {
      await user.click(await screen.findByRole("button", { name: /iniciar ciclo/i }));
      await skipPhase(user);
      await user.click(screen.getByRole("button", { name: /médio/i }));
      await skipPhase(user);
    }

    const submit = await screen.findByRole("button", { name: /concluir e receber xp/i });
    expect(submit).toBeDisabled();

    await user.type(screen.getByRole("textbox", { name: /o que você conquistou/i }), "Terminei a migração da UI");
    expect(submit).toBeEnabled();
    await user.click(submit);

    expect(await screen.findByText("Sucesso total!")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("@xpomodoro:user_stats") ?? "{}")).toEqual({ totalXP: 1 });
  });

  it("esconde o botão de pular cronômetro em produção", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const user = renderApp();

    await user.click(await screen.findByRole("button", { name: /iniciar ciclo/i }));

    expect(screen.getByRole("timer")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /pular cronômetro/i })).not.toBeInTheDocument();
  });

  it("descarta a sessão e volta ao ciclo 1", async () => {
    const user = renderApp();

    await user.click(await screen.findByRole("button", { name: /iniciar ciclo/i }));
    await skipPhase(user);
    await user.click(screen.getByRole("button", { name: /baixo/i }));
    await skipPhase(user);

    expect(screen.getByText(/ciclo 2 de 4/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /descartar sessão atual/i }));

    expect(screen.getByText(/ciclo 1 de 4/i)).toBeInTheDocument();
  });
});
