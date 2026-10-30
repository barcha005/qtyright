export interface Guide {
  slug: string;
  title: string;
  description: string;
  toolSlug: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
}

export const guides: Guide[] = [
  {
    slug: "how-much-concrete-do-i-need",
    title: "How Much Concrete Do I Need? Slab Sizes, Bags and Yards Explained",
    description:
      "Worked answers for common slab sizes — 10×10, 12×12, 20×20 and more — in cubic yards and 80 lb bags, plus when ready-mix beats bags.",
    toolSlug: "concrete-calculator",
    sections: [
      {
        heading: "The one formula behind every concrete job",
        paragraphs: [
          "Every concrete estimate is the same three steps: multiply length × width × thickness to get cubic feet, divide by 27 to get cubic yards, then convert to bags using the yield printed on the bag (an 80 lb bag makes about 0.60 cubic feet). Thickness is the step people get wrong — it must be in feet, so 4 inches is 0.333 ft.",
          "Then add waste. A perfectly level, well-formed base might need 5%; a typical DIY base needs 10%. Running short during a pour means a cold joint — a permanent weak line in the slab — so this is not the place to be optimistic.",
        ],
      },
      {
        heading: "Common slab sizes at 4 inches thick (with 10% waste)",
        paragraphs: ["Use these as a sanity check, then run your exact measurements through the calculator — your thickness and waste will differ."],
        bullets: [
          "10 × 10 ft slab — 1.36 yd³ — about 62 × 80 lb bags",
          "12 × 12 ft slab — 1.96 yd³ — about 89 × 80 lb bags",
          "10 × 20 ft slab — 2.72 yd³ — about 123 × 80 lb bags",
          "20 × 20 ft slab — 5.44 yd³ — about 245 × 80 lb bags (definitely a ready-mix job)",
          "24 × 24 ft garage slab — 7.84 yd³ — about 353 × 80 lb bags",
        ],
      },
      {
        heading: "Bags or ready-mix? The honest crossover",
        paragraphs: [
          "Bags win on small jobs because there is no delivery fee and no minimum order: a few post holes or a small pad is a bag job. But bags scale terribly — mixing 60+ bags by hand or with a small mixer takes hours, and the concrete you placed first is curing while you mix the last batch.",
          "Ready-mix wins once you pass roughly half a cubic yard to a yard, even with a short-load fee, because the whole slab is placed in minutes at a consistent mix. Between about 30 and 60 bags the answer depends on your local delivered price — which is why the calculator compares both with prices you can edit.",
        ],
      },
      {
        heading: "Mistakes that actually ruin pours",
        paragraphs: ["Most failed DIY slabs fail on preparation, not arithmetic."],
        bullets: [
          "Pouring on uncompacted soil — the slab settles and cracks. Compact a gravel base first.",
          "Guessing thickness from the forms instead of measuring the actual excavation depth.",
          "Adding too much water to make bags easier to mix — excess water permanently weakens concrete.",
          "No control joints on larger slabs — concrete cracks; joints decide where.",
        ],
      },
    ],
  },
  {
    slug: "bagged-vs-bulk-mulch",
    title: "Bagged Mulch vs Bulk Mulch: Which Is Actually Cheaper?",
    description:
      "The break-even maths for bags vs a bulk mulch delivery, including the delivery fee most comparisons forget, and when bags still win.",
    toolSlug: "mulch-calculator",
    sections: [
      {
        heading: "Why the per-yard price misleads everyone",
        paragraphs: [
          "Bulk mulch almost always looks dramatically cheaper per cubic yard than bags — and per yard, it is. But bags have no delivery fee, no minimum order, and no pile of surplus mulch sitting on your driveway for a month. The honest comparison is total job cost: (bags × bag price) versus (bulk yards × bulk price + delivery fee).",
          "With typical US prices — around $4.50 for a 2 cu ft bag, $45 per bulk yard, and a $60 delivery fee — the crossover lands near 3 cubic yards. Below that, bags are usually cheaper in total. Above it, bulk pulls away fast: at 6 yards, bulk can cost half what bags do.",
        ],
      },
      {
        heading: "When bags win anyway",
        paragraphs: ["Price is not the only variable. Bags are the right choice when:"],
        bullets: [
          "The beds are in a back garden with no wheelbarrow-friendly access — bags carry, bulk doesn't.",
          "You need several different colours or materials for different beds.",
          "Your HOA or driveway surface rules out a dumped pile.",
          "The job is under ~2 yards and you'd pay a delivery fee for a small load.",
        ],
      },
      {
        heading: "When bulk wins anyway",
        paragraphs: [
          "Above 4–5 yards, bulk wins on price even if you have to give some away to neighbours. Bulk is also fresher-turned, contains no plastic bag waste (a 6-yard bag job is 80+ bags to landfill), and a good landscape yard lets you see and smell the actual product before it arrives.",
          "Whichever you choose, run your bed measurements through the mulch calculator with your real local prices — the crossover moves a lot with the delivery fee, and some yards deliver free above a minimum order, which changes everything.",
        ],
      },
    ],
  },
  {
    slug: "how-much-paint-do-i-need",
    title: "How Much Paint Do I Need? Room-by-Room Gallon Guide",
    description:
      "Gallons by room size for one and two coats, why coverage ratings lie on rough walls, and when primer saves you money.",
    toolSlug: "paint-calculator",
    sections: [
      {
        heading: "The coverage number on the can, translated",
        paragraphs: [
          "Paint cans promise 350–400 sq ft per gallon. That figure is real — on smooth, sealed, primed drywall, applied at the intended thickness. On unprimed drywall, textured walls or strong colour changes, plan on 275–325. The paint calculator defaults to 350 and lets you lower it, which is the honest way to model a rough room.",
          "The second translation: you don't buy exact gallons, you buy whole cans. A job that needs 1.9 gallons is a 2-gallon purchase — and that spare tenth is your touch-up paint, which you will want in year two.",
        ],
      },
      {
        heading: "Typical rooms, two coats, walls only (8 ft ceilings)",
        paragraphs: ["Standard doors and windows already subtracted. Ceilings add roughly half a gallon for most rooms."],
        bullets: [
          "Small bedroom 10 × 10 ft — about 1.7 gal → buy 2",
          "Bedroom 12 × 12 ft — about 1.9 gal → buy 2",
          "Large bedroom 12 × 16 ft — about 2.2 gal → buy 3 (or 2 gal + 1 qt if the range is close)",
          "Living room 16 × 20 ft — about 2.9 gal → buy 3",
          "Bathroom 8 × 5 ft — about 0.9 gal → buy 1 (use a bathroom-rated paint for moisture)",
        ],
      },
      {
        heading: "Primer: the coat that saves coats",
        paragraphs: [
          "Primer is cheaper than finish paint and exists to do the unglamorous work: sealing porous new drywall, blocking stains, and giving a colour change a neutral start. Skipping primer on bare drywall usually costs you a third coat of the expensive paint — a bad trade. On a previously painted wall in good condition and a similar colour, a quality paint-and-primer product in two coats is a reasonable shortcut most manufacturers support.",
        ],
      },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
