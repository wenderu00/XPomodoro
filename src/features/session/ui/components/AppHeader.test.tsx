import { render, screen, within } from "@testing-library/react";
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
});
