# UX Principles (Laws of UX)

Reference these when designing or reviewing any UI. Source: https://lawsofux.com/

- **Aesthetic-Usability Effect** — Users perceive aesthetically pleasing design as more usable. Polish reduces perceived friction even when functionality is unchanged.
- **Choice Overload** — Too many options overwhelms users. Limit choices presented at once; group or progressively disclose the rest.
- **Chunking** — Break information into small, meaningful groups rather than long unbroken lists or forms.
- **Cognitive Bias** — Systematic errors in judgment shape how users interpret UI. Don't assume rational, uniform interpretation.
- **Cognitive Load** — Minimize the mental effort required to understand and use an interface. Every extra decision or unclear label adds load.
- **Doherty Threshold** — Keep system response time under ~400ms so the user doesn't have to wait; use loading states/optimistic UI if a real response will be slower.
- **Fitts's Law** — Time to reach a target is a function of its distance and size. Make frequently-used, high-consequence controls large and close to the point of action.
- **Flow** — Support uninterrupted, focused engagement by removing unnecessary interruptions and matching challenge to user skill.
- **Goal-Gradient Effect** — Motivation increases as users approach a goal. Show progress indicators to increase completion rates.
- **Hick's Law** — Decision time increases with the number and complexity of choices. Simplify choices to speed decisions.
- **Jakob's Law** — Users expect your product to work like other products they already know. Don't deviate from established conventions without strong reason.
- **Law of Common Region** — Elements sharing a clearly bounded area are perceived as grouped (cards, panels, borders).
- **Law of Proximity** — Objects near each other are perceived as related. Use spacing to communicate grouping/hierarchy.
- **Law of Prägnanz** — Ambiguous or complex shapes are interpreted in the simplest form possible. Favor simple, clean visual structure.
- **Law of Similarity** — Elements that look alike (color, shape, size) are perceived as part of the same group or function.
- **Law of Uniform Connectedness** — Visually connected elements (lines, shared color/background) are perceived as more related than unconnected elements.
- **Mental Model** — Users act on their existing mental model of how something should work, not on how it's actually built. Align UI behavior to expectations.
- **Miller's Law** — Working memory holds about 7±2 items. Don't require users to track more than a handful of things at once.
- **Occam's Razor** — When choices perform equally well, prefer the design with fewest steps/assumptions/elements.
- **Paradox of the Active User** — Users skip instructions/manuals and start using the product immediately. Design for exploration, not documentation-reading.
- **Pareto Principle** — ~80% of effects come from ~20% of causes. Optimize the most-used paths and features first.
- **Parkinson's Law** — A task expands to fill the time allotted. Set clear scope/constraints (e.g., timeboxes, limits) to keep tasks efficient.
- **Peak-End Rule** — Users judge an experience mainly by its peak moment and its ending, not the average. Prioritize a strong final step (e.g., checkout confirmation, task completion).
- **Postel's Law** — Be liberal in what you accept, conservative in what you send. Accept flexible/messy user input; produce clean, predictable output.
- **Selective Attention** — Users filter out stimuli unrelated to their current goal. Don't rely on users noticing secondary UI elements (banners, tooltips) unprompted.
- **Serial Position Effect** — Users best remember the first and last items in a list. Place the most important actions/items at the start or end, not the middle.
- **Tesler's Law (Conservation of Complexity)** — Every system has inherent complexity that can't be removed, only shifted between system and user. Decide deliberately who absorbs it.
- **Von Restorff Effect (Isolation Effect)** — An item that visually differs from surrounding similar items is remembered best. Use distinct styling sparingly, for the one action that matters most.
- **Working Memory** — Users can only hold and manipulate a small amount of information at once. Avoid multi-step tasks that require remembering earlier screens.
- **Zeigarnik Effect** — Interrupted/incomplete tasks are remembered better than completed ones. Use progress indicators and partial-completion cues to pull users back to unfinished tasks.

## Quick checklist for UI work

1. Is the most important action the largest/closest target? (Fitts's)
2. Are choices reduced to what's necessary at each step? (Hick's, Choice Overload)
3. Does grouping/spacing communicate structure without a label? (Gestalt laws)
4. Does it follow patterns users already know? (Jakob's)
5. Is feedback shown within ~400ms, or is there a loading state? (Doherty)
6. Is the ending of the flow (confirmation, success state) polished? (Peak-End)
7. Does anything ask the user to remember more than ~7 items at once? (Miller's, Working Memory)
