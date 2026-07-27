import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the heading", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { name: "Claude Code Skills", level: 1 }),
    ).toBeInTheDocument();
  });

  it("renders a card for each enabled skill", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: "Code Review" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "View on GitHub" }).length).toBe(69);
  });
});
