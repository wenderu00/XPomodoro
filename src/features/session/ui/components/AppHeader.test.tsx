import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LocalStorageSessionRepository } from "../../adapters/repositories/LocalStorageSessionRepository";
import { createSessionDependencies } from "../context/createSessionDependencies";
import { SessionDependencyProvider } from "../context/SessionDependencyContext";
import { AppHeader } from "./AppHeader";

vi.mock("next/navigation", () => ({ usePathname: () => "/xp-topics/" }));

describe("AppHeader", () => {
  it("mostra o XP acumulado e marca a página atual", async () => {
    localStorage.setItem("@xpomodoro:user_stats", JSON.stringify({ totalXP: 7 }));

    render(
      <SessionDependencyProvider dependencies={createSessionDependencies(new LocalStorageSessionRepository())}>
        <AppHeader />
      </SessionDependencyProvider>,
    );

    expect(await screen.findByText("7 XP")).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "Principal" });
    expect(within(nav).getByRole("link", { name: "manual xp" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "sessão" })).not.toHaveAttribute("aria-current");
  });

  it("troca o tema e lembra a escolha", async () => {
    const user = userEvent.setup();
    render(
      <SessionDependencyProvider dependencies={createSessionDependencies(new LocalStorageSessionRepository())}>
        <AppHeader />
      </SessionDependencyProvider>,
    );

    const theme = screen.getAllByRole("radiogroup", { name: "Tema" })[0];
    expect(within(theme).getByRole("radio", { name: "sistema" })).toHaveAttribute("aria-checked", "true");

    await user.click(within(theme).getByRole("radio", { name: "claro" }));
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(localStorage.getItem("mw-theme")).toBe("light");

    await user.click(within(theme).getByRole("radio", { name: "sistema" }));
    expect(document.documentElement).not.toHaveAttribute("data-theme");
    expect(localStorage.getItem("mw-theme")).toBeNull();
  });
});
