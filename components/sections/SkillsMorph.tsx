import ScrollMorphHero from "@/components/ui/scroll-morph-hero";
import { skillGroups } from "@/data/skills";

/**
 * "What I build with." — every skill from data/skills.ts as a card. The cards fly in,
 * form a circle, then open into an arc you sweep through by scrolling (the card at the
 * centre lifts forward). Edit the skills in data/skills.ts and this updates itself.
 */
export function SkillsMorph() {
  const cards = skillGroups.flatMap((group) =>
    group.items.map((item) => ({
      label: item,
      tag: group.category,
      caption: item,
      location: group.category,
    }))
  );

  return (
    <ScrollMorphHero
      photos={cards}
      cardWidth={124}
      cardHeight={86}
      scrollLength={2200}
      focusCenter
      arcScale={1.5}
      arcApex={0.12}
      headingLevel="h2"
      introTitle="What I build with."
      introHint="Scroll to explore the toolkit"
      eyebrow="Toolkit"
      arcTitle="From the switchyard to the neural network."
      arcDescription={`${cards.length} tools and methods across ${skillGroups.length} disciplines. Hover or tap a card to see where it belongs.`}
    />
  );
}
