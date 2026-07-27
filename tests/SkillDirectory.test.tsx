import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkillDirectory from "@/components/SkillDirectory";

const SKILLS = [
  {
    id: "code-review",
    title: "Code Review",
    description: "Review a PR.",
    category: "git",
    files: ["SKILL.md"],
  },
  { id: "pr", title: "PR", description: "Open a draft PR.", category: "git", files: ["SKILL.md"] },
  {
    id: "counsel",
    title: "Counsel",
    description: "Run a panel.",
    category: "orchestration",
    files: ["SKILL.md"],
  },
];

describe("SkillDirectory", () => {
  it("groups skills under category headers", () => {
    render(<SkillDirectory skills={SKILLS} />);
    expect(screen.getByText("Git")).toBeInTheDocument();
    expect(screen.getByText("Orchestration")).toBeInTheDocument();
  });

  it("collapses and expands a category on click", () => {
    render(<SkillDirectory skills={SKILLS} />);
    expect(screen.getByRole("heading", { name: "Code Review" })).toBeVisible();

    fireEvent.click(screen.getByText("Git"));
    expect(screen.queryByRole("heading", { name: "Code Review" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Git"));
    expect(screen.getByRole("heading", { name: "Code Review" })).toBeVisible();
  });

  it("shows all matches uncollapsed while searching, even in a collapsed category", () => {
    render(<SkillDirectory skills={SKILLS} />);
    fireEvent.click(screen.getByText("Git")); // collapse Git

    fireEvent.change(screen.getByPlaceholderText("Filter by name or what it does…"), {
      target: { value: "pr" },
    });

    expect(screen.getByRole("heading", { name: "PR" })).toBeVisible();
  });
});
