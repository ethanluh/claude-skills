import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ThemeToggle from "@/components/ThemeToggle";

afterEach(() => {
  window.localStorage.clear();
  document.documentElement.classList.remove("dark");
});

describe("ThemeToggle", () => {
  it("renders light, system, and dark options", () => {
    render(<ThemeToggle />);
    expect(screen.getByTitle("Light")).toBeInTheDocument();
    expect(screen.getByTitle("System")).toBeInTheDocument();
    expect(screen.getByTitle("Dark")).toBeInTheDocument();
  });

  it("applies the dark class and persists the choice on click", () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByTitle("Dark"));

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(window.localStorage.getItem("theme")).toBe("dark");
  });

  it("restores a stored theme on mount without flashing the default", () => {
    window.localStorage.setItem("theme", "dark");
    render(<ThemeToggle />);
    expect(screen.getByTitle("Dark")).toHaveAttribute("aria-pressed", "true");
  });
});
