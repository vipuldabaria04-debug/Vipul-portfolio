export type Thought = {
  id: string;
  date: string;
  category: "Research" | "Engineering" | "Notes" | "Events" | "Books";
  title: string;
  body: string;
};

export const thoughts: Thought[] = [
  {
    id: "t1",
    date: "2026-06-02",
    category: "Research",
    title: "Why PINNs are changing scientific machine learning",
    body: "Most ML models learn correlations. Physics-Informed Neural Networks learn correlations that are also forced to obey a differential equation. That constraint sounds restrictive, but in practice it's the opposite — it lets a model generalize well past the range of its training data, because the physics fills in what the data can't. For engineering problems with well-understood governing equations and messy real-world measurements, that trade is often worth it.",
  },
  {
    id: "t2",
    date: "2026-05-20",
    category: "Research",
    title: "What I learned during my IIT Kharagpur internship",
    body: "The hardest part of the project wasn't the neural network — it was the data. Real EMU measurements have gaps, noise, and edge cases no textbook mentions. I spent more time writing data-cleaning code than model code, and the final results were better for it. Lesson: in applied ML, respect the data pipeline as much as the architecture.",
  },
  {
    id: "t3",
    date: "2026-05-04",
    category: "Engineering",
    title: "Engineering isn't just solving equations",
    body: "It's solving uncertainty. Every real system — a substation, a neural network, a piezoelectric sensor under a road — behaves close to its equations, not exactly like them. Good engineers build in margin for the gap. That's a mindset, not a formula.",
  },
  {
    id: "t4",
    date: "2026-04-18",
    category: "Notes",
    title: "Thoughts on smart grids and renewable integration",
    body: "Falling system inertia is the quiet problem behind the renewable transition. It doesn't make headlines like blackouts do, but it's the reason grid operators are investing heavily in fast frequency response and synthetic inertia. Anyone building for the future grid should understand this constraint early.",
  },
  {
    id: "t5",
    date: "2026-03-30",
    category: "Engineering",
    title: "Lessons from building Urban Pulse",
    body: "Hybrid energy harvesting sounded elegant on paper — piezoelectric and triboelectric layers stacked to capture more of a vehicle's kinetic energy. In practice, getting both layers to survive repeated mechanical loading without degrading was the real engineering problem. Prototyping under realistic load cycles early would have saved us weeks.",
  },
  {
    id: "t6",
    date: "2026-03-10",
    category: "Notes",
    title: "A small productivity note",
    body: "I started keeping a single running doc per project — no fancy tooling — where I log what I tried and why, as I go, not after. It's saved me from re-deriving the same conclusion twice more times than I'd like to admit.",
  },
  {
    id: "t7",
    date: "2026-02-22",
    category: "Events",
    title: "Notes from Electrothon 8.0",
    body: "Winning was less about the final demo and more about how ruthlessly we cut scope in the last six hours. We shipped a system that did three things well instead of six things half-working. That's a hackathon lesson that generalizes to every project since.",
  },
  {
    id: "t8",
    date: "2026-02-05",
    category: "Books",
    title: "Currently recommending: Power System Dynamics and Stability",
    body: "Still the clearest treatment I've found of the swing equation and its assumptions — required reading before touching any inertia-estimation work. Placeholder for full citation and a longer review.",
  },
];
