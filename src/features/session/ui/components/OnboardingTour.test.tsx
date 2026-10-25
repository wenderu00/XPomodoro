import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LocalStorageSessionRepository } from "../../adapters/repositories/LocalStorageSessionRepository";
import { createSessionDependencies } from "../context/createSessionDependencies";
import { SessionDependencyProvider } from "../context/SessionDependencyContext";
import { AppHeader } from "./AppHeader";
import { XPomodoroApp } from "./XPomodoroApp";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

const TOUR_KEY = "@xpomodoro:tour_completed";

function renderApp() {
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  render(
    <SessionDependencyProvider dependencies={createSessionDependencies(new LocalStorageSessionRepository())}>
      <AppHeader />
      <XPomodoroApp />
    </SessionDependencyProvider>,
  );
  return user;
}

describe("tour de onboarding", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("abre sozinho na primeira sessão e não volta depois de pulado", async () => {
    const user = renderApp();

    const dialog = await screen.findByRole("dialog", { name: /tour guiado/i });
    expect(dialog).toHaveTextContent(/bem-vindo ao xpomodoro/i);
    expect(dialog).toHaveTextContent("1 de 6");

    await user.click(screen.getByRole("button", { name: /pular/i }));

    expect(screen.queryByRole("dialog", { name: /tour guiado/i })).not.toBeInTheDocument();
    expect(localStorage.getItem(TOUR_KEY)).toBe("true");
  });

  it("não abre sozinho quando o tour já foi visto, mas o botão de ajuda reabre", async () => {
    localStorage.setItem(TOUR_KEY, "true");
    const user = renderApp();

    await screen.findByRole("button", { name: /iniciar ciclo/i });
    expect(screen.queryByRole("dialog", { name: /tour guiado/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /reiniciar e exibir tutorial/i }));

    expect(await screen.findByRole("dialog", { name: /tour guiado/i })).toHaveTextContent("1 de 6");
  });

  it("o botão de ajuda no meio da sessão volta ao ciclo 1 antes do tour", async () => {
    localStorage.setItem(TOUR_KEY, "true");
    const user = renderApp();

    await user.click(await screen.findByRole("button", { name: /iniciar ciclo/i }));
    expect(await screen.findByRole("timer")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /reiniciar e exibir tutorial/i }));
    await act(() => vi.advanceTimersByTimeAsync(0));

    expect(await screen.findByRole("dialog", { name: /tour guiado/i })).toBeInTheDocument();
    expect(screen.queryByRole("timer")).not.toBeInTheDocument();
    expect(screen.getByText(/ciclo 1 de 4/i)).toBeInTheDocument();
  });
});
