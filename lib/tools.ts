// Tool catalogue for QtyRight. Pure data (serialisable) — calculator maths
// lives in lib/calc.ts, keyed by the same slug.

export interface ToolInput {
  key: string;
  label: string;
  type: "number" | "select";
  def: number;
  step?: number;
  min?: number;
  unit?: string;
  options?: { value: number; label: string }[];
}

export interface Tool {
  slug: string;
  name: string;
  short: string;
  category: string;
  keyword: string;
  title: string;
  description: string;
  intro: string[];
  formula: string;
  howTo: string[];
  example: string;
  faqs: { q: string; a: string }[];
  inputs: ToolInput[];
  related: string[];
}

const num = (key: string, label: string, def: number, unit?: string, step = 1): ToolInput => ({
  key, label, type: "number", def, unit, step, min: 0,
});
const sel = (key: string, label: string, def: number, options: { value: number; label: string }[]): ToolInput => ({
  key, label, type: "select", def, options,
});

export const tools: Tool[] = [
  {
    slug: "concrete-calculator",
    name: "Concrete Calculator",
    short: "Cubic yards, bags and ready-mix cost for slabs, footings and pads.",
    category: "Concrete & Masonry",
    keyword: "concrete calculator",
    title: "Concrete Calculator — Cubic Yards, Bags & Cost | QtyRight",
    description:
      "Free concrete calculator: enter your slab size to get cubic yards, how many 40/60/80 lb bags you need, and a bags-vs-ready-mix cost comparison. No sign-up.",
    intro: [
      "Pouring a patio, driveway pad or shed base starts with one question: how much concrete do I actually need? Order too little and you get a cold joint and a weakened slab; order too much ready-mix and you pay to send it back.",
      "This calculator works in the units concrete is actually sold in — cubic yards for ready-mix, and 40, 60 or 80 lb bags for mix-it-yourself jobs — and compares the cost of both so you can pick the sensible option for your pour size.",
    ],
    formula: "Volume (ft³) = Length × Width × (Thickness in inches ÷ 12). Cubic yards = ft³ ÷ 27. Bags = ft³ (incl. waste) ÷ bag yield (80 lb ≈ 0.60 ft³, 60 lb ≈ 0.45 ft³, 40 lb ≈ 0.30 ft³).",
    howTo: [
      "Measure the length and width of the area in feet.",
      "Enter the slab thickness in inches (4 in is typical for patios and walkways, 5–6 in for driveways).",
      "Keep the 10% waste allowance unless your base is perfectly level.",
      "Compare the bag count and cost against the ready-mix price, then print your shopping list.",
    ],
    example:
      "A 10 × 10 ft patio slab at 4 in thick is 33.3 ft³ — 1.23 yd³ before waste, 1.36 yd³ with 10% waste. That's 62 × 80 lb bags, which is right at the point where a ready-mix truck usually becomes the smarter buy.",
    faqs: [
      { q: "How many bags of concrete are in a cubic yard?", a: "About 45 × 80 lb bags, 60 × 60 lb bags, or 90 × 40 lb bags. Each 80 lb bag yields roughly 0.60 cubic feet of mixed concrete, and a cubic yard is 27 cubic feet." },
      { q: "How thick should my concrete slab be?", a: "4 inches suits patios, walkways and shed bases. Driveways that carry cars are usually 5 inches, and 6 inches is used for heavy vehicles or poor soil. Always check local code for structural work." },
      { q: "When is ready-mix cheaper than bags?", a: "As a rule of thumb, once a job passes roughly 30–40 bags (about ½–¾ yd³), ready-mix is usually cheaper per yard and much less labour — but trucks often add a short-load fee for orders under 4–5 yards, so ask for the delivered price." },
      { q: "Why add 10% waste?", a: "Real bases are never perfectly level, forms bow slightly, and some concrete stays in the wheelbarrow. Running short mid-pour is far more expensive than a small surplus." },
    ],
    inputs: [
      num("length", "Length", 10, "ft", 0.1),
      num("width", "Width", 10, "ft", 0.1),
      num("thickness", "Thickness", 4, "in", 0.5),
      num("waste", "Waste allowance", 10, "%"),
      sel("bagSize", "Bag size", 80, [
        { value: 80, label: "80 lb bag (0.60 ft³ yield)" },
        { value: 60, label: "60 lb bag (0.45 ft³ yield)" },
        { value: 40, label: "40 lb bag (0.30 ft³ yield)" },
      ]),
      num("bagPrice", "Price per bag", 5.5, "$", 0.01),
      num("readyMixPrice", "Ready-mix price per yd³", 165, "$", 1),
    ],
    related: ["gravel-calculator", "brick-calculator", "fence-calculator"],
  },
  {
    slug: "paint-calculator",
    name: "Paint Calculator",
    short: "Gallons for any room, minus doors and windows, by coats and coverage.",
    category: "Painting & Finishing",
    keyword: "paint calculator",
    title: "Paint Calculator — How Many Gallons Do I Need? | QtyRight",
    description:
      "Free paint calculator: enter room size, doors, windows and coats to get exact gallons and what to buy, with a cost estimate. Works for walls and ceilings.",
    intro: [
      "Paint is the highest-impact, lowest-cost home project there is — until you run out halfway through the second coat on a Sunday evening. This calculator subtracts your doors and windows, multiplies by the number of coats, and uses the coverage printed on real paint cans (about 350 sq ft per gallon on smooth walls).",
      "It then rounds up to whole gallons the way a store sells them, and estimates the cost with a price you can edit to match the paint you're actually buying.",
    ],
    formula: "Wall area = 2 × (Length + Width) × Ceiling height − (21 sq ft per door + 15 sq ft per window). Gallons = Paintable area × Coats ÷ Coverage per gallon (≈350 sq ft).",
    howTo: [
      "Measure the room's length, width and ceiling height in feet.",
      "Count standard doors and windows — the calculator subtracts typical sizes automatically.",
      "Choose 2 coats for most repaint jobs (1 coat can work for a same-colour refresh with premium paint).",
      "Edit the price per gallon to the paint you plan to buy, then take the shopping list to the store.",
    ],
    example:
      "A 12 × 12 ft bedroom with 8 ft ceilings, 1 door and 2 windows has 333 sq ft of paintable wall. Two coats at 350 sq ft/gal needs 1.9 gallons — so buy 2 gallons, not 1 and a hopeful quart.",
    faqs: [
      { q: "How much paint do I need for a 12×12 room?", a: "About 2 gallons for two coats on the walls of a typical 12×12 ft room with 8 ft ceilings, one door and two windows. Painting the ceiling as well adds roughly half a gallon." },
      { q: "How many square feet does a gallon of paint cover?", a: "Most manufacturers rate a gallon at 350–400 sq ft per coat on smooth, primed surfaces. Rough or porous surfaces can drop that to 250–300 sq ft." },
      { q: "Do I need primer?", a: "On bare drywall, patched areas, or when changing colour dramatically (dark to light), yes — one coat of primer makes the finish paint cover evenly and can save a third coat of the expensive paint." },
      { q: "Should I subtract doors and windows?", a: "Yes for standard sizes — a door is about 21 sq ft and an average window about 15 sq ft. For floor-to-ceiling glass or very large openings, measure and subtract manually." },
    ],
    inputs: [
      num("length", "Room length", 12, "ft", 0.1),
      num("width", "Room width", 12, "ft", 0.1),
      num("height", "Ceiling height", 8, "ft", 0.1),
      num("doors", "Doors", 1),
      num("windows", "Windows", 2),
      num("coats", "Coats", 2),
      sel("ceiling", "Include ceiling?", 0, [
        { value: 0, label: "No — walls only" },
        { value: 1, label: "Yes — walls + ceiling" },
      ]),
      num("coverage", "Coverage per gallon", 350, "sq ft"),
      num("pricePerGallon", "Price per gallon", 42, "$", 0.01),
    ],
    related: ["drywall-calculator", "flooring-calculator", "tile-calculator"],
  },
  {
    slug: "mulch-calculator",
    name: "Mulch Calculator",
    short: "Bags vs bulk mulch: cubic yards, bag count and which is cheaper.",
    category: "Landscaping",
    keyword: "mulch calculator",
    title: "Mulch Calculator — Bags vs Bulk, Yards & Cost | QtyRight",
    description:
      "Free mulch calculator: get cubic yards, how many 2 or 3 cu ft bags you need, and a bags-vs-bulk cost comparison including delivery. No sign-up.",
    intro: [
      "Mulch looks simple until you're standing in the garden centre doing cubic-yard maths in your head. This calculator converts your bed size and depth into cubic yards, then answers the question that actually matters: is it cheaper to haul bags or to have a bulk load dumped on the driveway?",
      "For small beds, bags win on convenience. Somewhere around 3–5 cubic yards, bulk usually wins on price even after the delivery fee — the calculator shows you exactly where your job lands.",
    ],
    formula: "Cubic yards = Length × Width × (Depth in inches ÷ 12) ÷ 27. Bags = Cubic feet ÷ bag size. Rule of thumb: 1 yd³ covers ~108 sq ft at 3 in deep, and equals about 13.5 × 2 cu ft bags.",
    howTo: [
      "Measure each bed's length and width in feet (add beds together, or run the calculator per bed).",
      "Pick a depth: 3 in is standard for established beds, 4 in for new beds or weed suppression.",
      "Enter your local bag price and bulk price + delivery fee to see which is cheaper.",
      "Round up — mulch settles, and a thin patchy layer defeats the purpose.",
    ],
    example:
      "A 20 × 4 ft front bed at 3 in deep needs 20 ft³ = 0.74 yd³. That's 10 × 2 cu ft bags, or a ¾-yard bulk order. At typical prices the bags are cheaper here — bulk only pulls ahead on bigger jobs, which is exactly what the comparison shows.",
    faqs: [
      { q: "How much mulch do I need per square foot?", a: "At 3 inches deep, one cubic foot of mulch covers about 4 sq ft, and one cubic yard covers about 108 sq ft. A standard 2 cu ft bag covers roughly 8 sq ft at that depth." },
      { q: "How deep should mulch be?", a: "2–3 inches for established beds, up to 4 inches for new beds. Deeper than 4 inches can starve roots of water and air. Keep it a few inches away from trunks and stems ('mulch volcanoes' harm trees)." },
      { q: "Is bagged or bulk mulch cheaper?", a: "Bulk is cheaper per yard almost everywhere, but the delivery fee (often $50–75) means bags usually win under about 3 yards. This calculator compares both with your local prices." },
      { q: "How many bags of mulch are in a cubic yard?", a: "13.5 bags of 2 cu ft, or 9 bags of 3 cu ft. That's why big jobs get expensive in bags quickly." },
    ],
    inputs: [
      num("length", "Bed length", 20, "ft", 0.1),
      num("width", "Bed width", 4, "ft", 0.1),
      num("depth", "Depth", 3, "in", 0.5),
      sel("bagSize", "Bag size", 2, [
        { value: 2, label: "2 cu ft bag" },
        { value: 3, label: "3 cu ft bag" },
      ]),
      num("bagPrice", "Price per bag", 4.5, "$", 0.01),
      num("bulkPrice", "Bulk price per yd³", 45, "$", 1),
      num("deliveryFee", "Bulk delivery fee", 60, "$", 1),
    ],
    related: ["topsoil-calculator", "gravel-calculator", "concrete-calculator"],
  },
  {
    slug: "gravel-calculator",
    name: "Gravel Calculator",
    short: "Cubic yards, tons and cost for driveways, paths and drainage.",
    category: "Landscaping",
    keyword: "gravel calculator",
    title: "Gravel Calculator — Cubic Yards, Tons & Cost | QtyRight",
    description:
      "Free gravel calculator: convert your area and depth into cubic yards, tons and cost. Pick gravel, crushed stone or pea gravel densities. No sign-up.",
    intro: [
      "Gravel is sold two ways — by the cubic yard at a landscape yard, and by the ton on the delivery ticket — and confusing the two is how people end up a ton short on a Saturday morning. This calculator gives you both, using the right density for the material you pick.",
      "It also compares bagged gravel (only sensible for tiny jobs) against a bulk delivery with your local prices.",
    ],
    formula: "Cubic yards = Length × Width × (Depth in inches ÷ 12) ÷ 27. Tons = Cubic yards × density (gravel ≈ 1.4 tons/yd³, crushed stone ≈ 1.5, pea gravel ≈ 1.35 — moisture and rock type shift this).",
    howTo: [
      "Measure the length and width of the driveway, path or area in feet.",
      "Choose depth: 4–6 in total for a driveway (laid in compacted layers), 2–3 in for paths.",
      "Pick the material closest to what you're ordering so the tonnage is right.",
      "Enter local prices to compare bags vs bulk, then round your order up to the nearest half ton.",
    ],
    example:
      "A 20 × 10 ft driveway section at 4 in deep is 2.47 yd³ of gravel — about 3.5 tons at standard density. Ordered as 0.5 cu ft bags that would be over 130 bags, which is why driveways are always a bulk order.",
    faqs: [
      { q: "How many tons of gravel do I need?", a: "Multiply cubic yards by about 1.4 for standard gravel. A 100 sq ft area at 3 in deep needs roughly 0.93 yd³, or about 1.3 tons. When in doubt, order a quarter-ton extra — delivery fees cost more than surplus stone." },
      { q: "How much does a cubic yard of gravel weigh?", a: "Roughly 2,800 lb (1.4 tons) for typical washed gravel, up to about 3,000 lb for dense crushed stone. Wet material weighs more." },
      { q: "How deep should gravel be on a driveway?", a: "A common build is 4–6 inches total: a coarse base layer compacted first, then a finer top layer. A single thin layer over bare soil will migrate and rut." },
      { q: "How much area does a ton of gravel cover?", a: "At 3 inches deep, one ton covers roughly 75–80 sq ft. At 2 inches, about 115 sq ft." },
    ],
    inputs: [
      num("length", "Length", 20, "ft", 0.1),
      num("width", "Width", 10, "ft", 0.1),
      num("depth", "Depth", 4, "in", 0.5),
      sel("density", "Material", 1.4, [
        { value: 1.4, label: "Gravel (1.4 tons/yd³)" },
        { value: 1.5, label: "Crushed stone (1.5 tons/yd³)" },
        { value: 1.35, label: "Pea gravel (1.35 tons/yd³)" },
      ]),
      sel("bagSize", "Bag size", 0.5, [{ value: 0.5, label: "0.5 cu ft bag (standard)" }]),
      num("bagPrice", "Price per bag", 5, "$", 0.01),
      num("bulkPrice", "Bulk price per yd³", 65, "$", 1),
      num("deliveryFee", "Bulk delivery fee", 60, "$", 1),
    ],
    related: ["mulch-calculator", "concrete-calculator", "topsoil-calculator"],
  },
  {
    slug: "tile-calculator",
    name: "Tile Calculator",
    short: "Tiles and boxes to buy, with pattern waste and thinset estimate.",
    category: "Flooring & Tile",
    keyword: "tile calculator",
    title: "Tile Calculator — How Many Tiles Do I Need? | QtyRight",
    description:
      "Free tile calculator: tiles and boxes to buy for any floor or wall, with waste by layout pattern, thinset estimate and cost. No sign-up.",
    intro: [
      "Tile is unforgiving about quantities: dye lots change between production runs, so 'I'll just buy more later' can mean a visibly different floor. This calculator counts tiles from your room size and tile size, adds the right waste allowance for your layout, and converts it into whole boxes — the only way tile is sold.",
      "It also estimates thinset so your shopping list covers the unglamorous materials that stop a job when they run out.",
    ],
    formula: "Tiles = Floor area × (1 + waste %) ÷ tile face area. Boxes = Tiles ÷ tiles per box, rounded up. Waste: straight grid ≈10%, diagonal ≈15%, herringbone ≈20%.",
    howTo: [
      "Measure the floor or wall length and width in feet.",
      "Pick your tile size (face area drives the count).",
      "Set waste by pattern: 10% straight, 15% diagonal, 20% herringbone or cut-heavy rooms.",
      "Enter tiles per box and box price from the tile you're buying — both are printed on the box and product page.",
    ],
    example:
      "A 10 × 8 ft bathroom floor with 12×12 in tiles in a straight layout needs 80 tiles + 10% waste = 88 tiles. At 10 per box, buy 9 boxes — and keep the spare box for the day a tile cracks in year six.",
    faqs: [
      { q: "How much extra tile should I buy for waste?", a: "10% for a straight layout in a simple rectangular room, 15% for diagonal layouts, and 20% or more for herringbone, mosaics or rooms with many cuts and obstacles." },
      { q: "How many tiles come in a box?", a: "It varies by tile — commonly 8–15 tiles, or enough to cover a stated square footage. Always check the box or product listing; this calculator lets you enter the exact count." },
      { q: "Should I buy tile from the same dye lot?", a: "Yes. Shade and calibre (exact size) vary slightly between production runs. Buy everything at once, check the lot number on the boxes matches, and keep a spare box for repairs." },
      { q: "Does the calculator work for wall tile and backsplashes?", a: "Yes — enter the wall's width as 'length' and height as 'width'. For a backsplash, subtract large openings like windows only if they are a big share of the area; the waste allowance usually covers cut-outs for outlets." },
    ],
    inputs: [
      num("length", "Length", 10, "ft", 0.1),
      num("width", "Width", 8, "ft", 0.1),
      sel("tileArea", "Tile size", 1, [
        { value: 1, label: "12 × 12 in (1 sq ft)" },
        { value: 2, label: "12 × 24 in (2 sq ft)" },
        { value: 2.25, label: "18 × 18 in (2.25 sq ft)" },
        { value: 4, label: "24 × 24 in (4 sq ft)" },
        { value: 0.25, label: "6 × 6 in (0.25 sq ft)" },
        { value: 0.125, label: "3 × 6 in subway (0.125 sq ft)" },
      ]),
      num("waste", "Waste allowance", 10, "%"),
      num("tilesPerBox", "Tiles per box", 10),
      num("pricePerBox", "Price per box", 38, "$", 0.01),
    ],
    related: ["flooring-calculator", "paint-calculator", "drywall-calculator"],
  },
  {
    slug: "flooring-calculator",
    name: "Flooring Calculator",
    short: "Boxes of laminate, vinyl or hardwood for any room, with waste.",
    category: "Flooring & Tile",
    keyword: "flooring calculator",
    title: "Flooring Calculator — Boxes of Laminate, Vinyl & Wood | QtyRight",
    description:
      "Free flooring calculator: how many boxes of laminate, LVP or hardwood to buy for your room, with waste allowance and cost estimate. No sign-up.",
    intro: [
      "Flooring is sold by the box, and every box covers a slightly different area. This calculator starts from your room size, adds a sensible waste allowance for cuts and the occasional damaged plank, and tells you exactly how many boxes to load on the cart.",
      "Buying everything in one trip matters: production runs vary in shade, and a mid-project reorder can mean waiting days for the matching lot.",
    ],
    formula: "Boxes = Room area × (1 + waste %) ÷ coverage per box, rounded up. Typical box coverage is 18–30 sq ft depending on the product.",
    howTo: [
      "Measure the room's length and width in feet (for L-shaped rooms, split into rectangles and add them).",
      "Enter the coverage printed on the box or product page of the flooring you chose.",
      "Use 10% waste for a straight room, 15% for angled walls or diagonal installation.",
      "Add the box price to see the total before you shop.",
    ],
    example:
      "A 14 × 12 ft living room is 168 sq ft. With 10% waste that's 185 sq ft to cover; at 22 sq ft per box you need 9 boxes (198 sq ft of flooring) — the leftover planks are your attic spares for future damage.",
    faqs: [
      { q: "How much extra flooring should I buy?", a: "10% over the room area is the standard allowance for straight installations. Go to 15% for diagonal layouts, rooms with many angles, or if you're new to installing — miscuts happen." },
      { q: "How many boxes of flooring do I need for 500 sq ft?", a: "Divide 500 (plus 10% waste = 550) by the box coverage. At a typical 22 sq ft per box, that's 25 boxes. Box coverage varies a lot by product, so always use the figure for your specific flooring." },
      { q: "Does laminate and vinyl flooring need underlayment?", a: "Many LVP and laminate products have underlayment pre-attached; others require a separate foam or felt underlay, especially over concrete (moisture barrier). Check the product instructions — and your warranty depends on following them." },
      { q: "Should flooring acclimate before installing?", a: "Yes — most manufacturers require 48 hours in the room where it will be installed, in the unopened boxes, so the material adjusts to temperature and humidity." },
    ],
    inputs: [
      num("length", "Room length", 14, "ft", 0.1),
      num("width", "Room width", 12, "ft", 0.1),
      num("boxCoverage", "Coverage per box", 22, "sq ft", 0.1),
      num("waste", "Waste allowance", 10, "%"),
      num("pricePerBox", "Price per box", 65, "$", 0.01),
    ],
    related: ["tile-calculator", "paint-calculator", "drywall-calculator"],
  },
  {
    slug: "drywall-calculator",
    name: "Drywall Calculator",
    short: "Sheets, screws and compound for walls and ceilings.",
    category: "Walls & Rooms",
    keyword: "drywall calculator",
    title: "Drywall Calculator — Sheets, Screws & Compound | QtyRight",
    description:
      "Free drywall calculator: sheets to buy in 4×8 or 4×12, plus approximate screws and joint compound, with cost estimate. No sign-up.",
    intro: [
      "Drywall quantities are simple geometry wrapped in heavy, awkward sheets you do not want to haul twice. This calculator works out the wall (and optional ceiling) area of a room, converts it to 4×8 or 4×12 sheets, and rounds out the shopping list with screws and joint compound.",
      "Doors and windows are deliberately not subtracted: in a typical room, cut waste around openings roughly cancels them out, and the 10% allowance covers the difference.",
    ],
    formula: "Surface area = 2 × (Length + Width) × Height (+ Length × Width for the ceiling). Sheets = Area × 1.10 ÷ sheet area (4×8 = 32 sq ft, 4×12 = 48 sq ft), rounded up.",
    howTo: [
      "Measure the room's length, width and ceiling height.",
      "Decide whether you're boarding the ceiling as well.",
      "Choose sheet size — 4×12 sheets mean fewer seams to finish but are heavier and harder to move in tight spaces.",
      "Use the screw and compound estimates to complete the list in one trip.",
    ],
    example:
      "A 12 × 10 ft room with 8 ft ceilings has 352 sq ft of wall. With the ceiling (120 sq ft) that's 472 sq ft → 17 × 4×8 sheets with waste, about 550 screws and 3 buckets of compound.",
    faqs: [
      { q: "How many sheets of drywall do I need for a 12×12 room?", a: "Walls only (8 ft ceilings): about 13 × 4×8 sheets including waste. Adding the ceiling takes it to roughly 18 sheets. Using 4×12 sheets cuts those counts by about a third." },
      { q: "4×8 or 4×12 drywall sheets — which is better?", a: "4×12 sheets cover more area with fewer butt joints to finish, and pros prefer them for ceilings and long walls. But they're heavy (~80 lb) and awkward on stairs and in small rooms, where 4×8 wins." },
      { q: "How many screws per drywall sheet?", a: "Roughly 32 screws per 4×8 sheet at standard spacing (16 in on walls, 12 in on ceilings, per most codes). This calculator uses 32 per sheet as a planning figure." },
      { q: "What thickness of drywall should I use?", a: "½ in is standard for walls and ceilings in most homes. Use ⅝ in fire-rated where code requires it (typically garage-to-house walls), and moisture-resistant board in bathrooms." },
    ],
    inputs: [
      num("length", "Room length", 12, "ft", 0.1),
      num("width", "Room width", 10, "ft", 0.1),
      num("height", "Ceiling height", 8, "ft", 0.1),
      sel("ceiling", "Include ceiling?", 1, [
        { value: 1, label: "Yes — walls + ceiling" },
        { value: 0, label: "No — walls only" },
      ]),
      sel("sheetArea", "Sheet size", 32, [
        { value: 32, label: "4 × 8 ft (32 sq ft)" },
        { value: 48, label: "4 × 12 ft (48 sq ft)" },
      ]),
      num("waste", "Waste allowance", 10, "%"),
      num("pricePerSheet", "Price per sheet", 14, "$", 0.01),
    ],
    related: ["paint-calculator", "flooring-calculator", "board-foot-calculator"],
  },
  {
    slug: "fence-calculator",
    name: "Fence Calculator",
    short: "Posts, rails, pickets and post concrete for a wood fence.",
    category: "Outdoor Projects",
    keyword: "fence calculator",
    title: "Fence Calculator — Posts, Rails, Pickets & Concrete | QtyRight",
    description:
      "Free fence calculator: posts, rails, pickets and concrete bags for a wood privacy fence, with a lumber cost estimate. No sign-up.",
    intro: [
      "A fence materials list has four different counts that all depend on each other — posts from the spacing, rails from the sections, pickets from the width plus gap, and a bag of concrete for every post. This calculator chains them together from a single measurement: the length of the run.",
      "It assumes a standard wood privacy fence. Enter your actual post spacing, picket width and gap, and local lumber prices, and you get a complete list to hand to the lumber desk.",
    ],
    formula: "Posts = ⌈Length ÷ Spacing⌉ + 1. Rails = (Posts − 1) × rails per section. Pickets = ⌈Length × 12 ÷ (picket width + gap)⌉. Concrete = 1 × 80 lb bag per post (typical).",
    howTo: [
      "Measure the full fence run in feet (add separate runs together, or calculate each run and add a post at every corner).",
      "Set post spacing — 8 ft is standard for wood privacy fences; some codes and windy areas use 6 ft.",
      "Enter your picket's actual width (a nominal 6 in picket is usually 5.5 in) and the gap you want.",
      "Adjust lumber prices to your yard's current prices for a realistic total.",
    ],
    example:
      "A 100 ft fence at 8 ft spacing needs 14 posts and 13 sections — 26 rails at 2 per section. With 5.5 in pickets and a ½ in gap that's exactly 200 pickets, plus 14 bags of concrete for the posts.",
    faqs: [
      { q: "How far apart should fence posts be?", a: "8 feet centre-to-centre is standard for wood privacy fences. Use 6 ft spacing for tall fences, windy sites, or if local code requires it — and always check code and call 811 before digging." },
      { q: "How many pickets do I need per foot of fence?", a: "With standard 5.5 in pickets and a ½ in gap, you need exactly 2 pickets per foot. Butt-jointed pickets with no gap need about 2.2 per foot." },
      { q: "How much concrete does a fence post need?", a: "One 80 lb bag per post is the common planning figure for a standard post hole (about 10–12 in wide and 24–36 in deep, depending on frost line). Larger or deeper holes need more." },
      { q: "How deep should fence posts be set?", a: "A common rule is one-third of the post in the ground, and below the local frost line. For a 6 ft fence that usually means a 2½–3 ft hole. Local code wins over rules of thumb." },
    ],
    inputs: [
      num("length", "Fence length", 100, "ft", 0.1),
      num("spacing", "Post spacing", 8, "ft", 0.5),
      sel("railsPerSection", "Rails per section", 2, [
        { value: 2, label: "2 rails (fences up to 6 ft)" },
        { value: 3, label: "3 rails (tall fences)" },
      ]),
      num("picketWidth", "Picket width (actual)", 5.5, "in", 0.1),
      num("gap", "Gap between pickets", 0.5, "in", 0.05),
      num("bagsPerPost", "Concrete bags per post", 1, "", 0.5),
      num("picketPrice", "Price per picket", 3.5, "$", 0.01),
      num("postPrice", "Price per post", 12, "$", 0.01),
      num("railPrice", "Price per rail", 9, "$", 0.01),
    ],
    related: ["concrete-calculator", "deck-calculator", "board-foot-calculator"],
  },
  {
    slug: "deck-calculator",
    name: "Deck Calculator",
    short: "Deck boards and screws for any deck size and board length.",
    category: "Outdoor Projects",
    keyword: "deck board calculator",
    title: "Deck Calculator — Boards & Screws to Buy | QtyRight",
    description:
      "Free deck calculator: how many deck boards and screws to buy for your deck size, board width, gap and board length, with cost estimate.",
    intro: [
      "Decking boards are priced per board, sold in fixed lengths, and laid in rows — so the useful answer isn't square feet, it's a board count. This calculator works out the rows across your deck's width, the boards per row for the length you can buy, and rounds the whole thing up with a waste allowance.",
      "It also estimates screws (two per board at every joist) so the fasteners don't become a second trip.",
    ],
    formula: "Rows = ⌈Deck width × 12 ÷ (board width + gap)⌉. Boards per row = ⌈Deck length ÷ board length⌉. Total = Rows × boards per row × (1 + waste %).",
    howTo: [
      "Enter the deck's length (the direction boards will run) and width in feet.",
      "Use the board's actual width — a nominal 6 in deck board is 5.5 in — and your planned gap (typically ¼ in for wood, per manufacturer for composite).",
      "Pick the board length you'll buy; longer boards mean fewer butt joints.",
      "Use 10% waste for a straight layout, 15% if boards run diagonally.",
    ],
    example:
      "A 16 × 12 ft deck with 5.5 in boards and a ¼ in gap needs 26 rows. In 16 ft boards that's 26 boards exactly; with 10% waste, buy 29 — plus roughly 950 screws.",
    faqs: [
      { q: "How many deck boards do I need for a 16×12 deck?", a: "With standard 5.5 in boards, a ¼ in gap and 16 ft boards: 26 boards before waste, 29 with a 10% allowance. Shorter boards increase the count because each row needs more than one board." },
      { q: "What gap should I leave between deck boards?", a: "About ¼ inch for pressure-treated wood (it shrinks as it dries), ⅛–³⁄₁₆ in for kiln-dried wood, and whatever the manufacturer specifies for composite — commonly ¼ in side-to-side." },
      { q: "How many screws does a deck need?", a: "Two screws at every joist crossing. With 16 in joist spacing, that's roughly 33 screws per 16 ft board — this calculator counts them from your actual inputs." },
      { q: "Does this include joists and beams?", a: "No — this calculator covers the decking surface and its fasteners. The substructure (posts, beams, joists, footings) depends on spans, loads and local code, and should be designed separately." },
    ],
    inputs: [
      num("length", "Deck length (board direction)", 16, "ft", 0.1),
      num("width", "Deck width", 12, "ft", 0.1),
      sel("boardWidth", "Board width (actual)", 5.5, [
        { value: 5.5, label: "5.5 in (nominal 2×6 / 5/4×6)" },
        { value: 3.5, label: "3.5 in (nominal 2×4)" },
      ]),
      num("gap", "Gap between boards", 0.25, "in", 0.05),
      sel("boardLength", "Board length you'll buy", 16, [
        { value: 8, label: "8 ft" },
        { value: 10, label: "10 ft" },
        { value: 12, label: "12 ft" },
        { value: 16, label: "16 ft" },
      ]),
      num("waste", "Waste allowance", 10, "%"),
      num("boardPrice", "Price per board", 14, "$", 0.01),
    ],
    related: ["fence-calculator", "board-foot-calculator", "concrete-calculator"],
  },
  {
    slug: "brick-calculator",
    name: "Brick Calculator",
    short: "Bricks and mortar bags for a wall, by brick size.",
    category: "Concrete & Masonry",
    keyword: "brick calculator",
    title: "Brick Calculator — Bricks & Mortar for a Wall | QtyRight",
    description:
      "Free brick calculator: how many bricks and mortar bags you need for a wall, by brick type (modular, standard, queen, king), with cost estimate.",
    intro: [
      "Brick counts come from one number — how many bricks fit in a square foot with a standard ⅜ in mortar joint — and it changes with every brick size. This calculator derives the count from the brick's actual face dimensions (the same maths behind the published brick tables), then applies it to your wall.",
      "It also estimates mortar bags, because bricks without mortar are just a pile.",
    ],
    formula: "Bricks per sq ft = 144 ÷ ((brick length + ⅜ in joint) × (brick height + ⅜ in joint)). Modular brick: 144 ÷ (8 × 2.625) = 6.86/sq ft. Total = Wall area × per-sq-ft × (1 + waste %).",
    howTo: [
      "Measure the wall's length and height in feet.",
      "Pick the brick type you're using — modular is the most common in modern US construction.",
      "Keep 10% waste for cuts and breakage on a simple wall; complex patterns need more.",
      "Note the mortar estimate: roughly one 80 lb bag per 35 bricks laid.",
    ],
    example:
      "A 20 × 4 ft garden wall in modular brick: 80 sq ft × 6.86 bricks = 549 bricks, 604 with 10% waste — plus about 18 bags of mortar. Order bricks in one batch: colour varies between firings.",
    faqs: [
      { q: "How many bricks are in a square foot?", a: "With a standard ⅜ in mortar joint: modular brick ≈ 6.86 per sq ft, standard ≈ 6.55, queen ≈ 5.76, king ≈ 4.80. Older or oversized bricks differ — measure yours if it's not a standard size." },
      { q: "How many bricks does a pallet hold?", a: "Commonly around 500 bricks for modular sizes, but it varies by brick type and manufacturer (roughly 380–540). Check with your supplier when ordering." },
      { q: "How much mortar do I need for brick?", a: "A mason's planning figure is one 80 lb bag of mortar mix per ~35 modular bricks laid with ⅜ in joints. Actual use varies with joint thickness and mason technique." },
      { q: "Is this for a veneer or a structural wall?", a: "These counts are for a single-wythe wall (one brick thick), like veneer or a garden wall. A double-wythe structural wall needs roughly twice the bricks — double the result." },
    ],
    inputs: [
      num("length", "Wall length", 20, "ft", 0.1),
      num("height", "Wall height", 4, "ft", 0.1),
      sel("faceArea", "Brick type", 21, [
        { value: 21, label: "Modular (7⅝ × 2¼ in) — 6.86/sq ft" },
        { value: 21.98, label: "Standard (8 × 2¼ in) — 6.55/sq ft" },
        { value: 25, label: "Queen (7⅝ × 2¾ in) — 5.76/sq ft" },
        { value: 30, label: "King (9⅝ × 2⅝ in) — 4.80/sq ft" },
      ]),
      num("waste", "Waste allowance", 10, "%"),
      num("pricePerBrick", "Price per brick", 0.85, "$", 0.01),
    ],
    related: ["concrete-calculator", "gravel-calculator", "fence-calculator"],
  },
  {
    slug: "topsoil-calculator",
    name: "Topsoil Calculator",
    short: "Bags vs bulk topsoil for beds, lawns and raised beds.",
    category: "Landscaping",
    keyword: "topsoil calculator",
    title: "Topsoil Calculator — Bags vs Bulk, Yards & Cost | QtyRight",
    description:
      "Free topsoil calculator: cubic yards, bag count and a bags-vs-bulk cost comparison for garden beds, raised beds and lawn levelling. No sign-up.",
    intro: [
      "Topsoil is deceptively heavy, settles after you water it, and is sold in bags that look bigger than they are (a typical bag is just 1.5 cubic feet — a wheelbarrow holds about two). This calculator converts your area and depth into cubic yards and bags, and compares bagged cost against a bulk delivery with your local prices.",
      "For a single raised bed, bags are usually fine. For levelling a lawn, bulk wins almost every time — the comparison shows you the crossover for your job.",
    ],
    formula: "Cubic yards = Length × Width × (Depth in inches ÷ 12) ÷ 27. Bags = Cubic feet ÷ bag size. 1 yd³ = 18 × 1.5 cu ft bags, and covers ~108 sq ft at 3 in deep.",
    howTo: [
      "Measure the area's length and width in feet.",
      "Choose depth: 1–2 in to top-dress a lawn, 4–6 in for a new bed, 12 in+ for a raised bed (often mixed with compost).",
      "Enter bag and bulk prices to see which is cheaper for your volume.",
      "Order a little extra — topsoil compacts and settles roughly 10–20% after rain and watering.",
    ],
    example:
      "An 8 × 4 ft raised bed filled 12 in deep needs 32 ft³ = 1.19 yd³ of soil. That's 22 × 1.5 cu ft bags, or a 1¼-yard bulk order — at typical prices, bulk plus delivery and bags land surprisingly close, which is why the comparison matters.",
    faqs: [
      { q: "How many bags of topsoil are in a cubic yard?", a: "27 one-cubic-foot bags, 18 bags of 1.5 cu ft, or 13.5 bags of 2 cu ft. Most big-box topsoil bags are 1.5 cu ft (40 lb class) — check the bag, sizes vary." },
      { q: "How much topsoil do I need for a raised bed?", a: "Length × width × fill depth. An 8×4 ft bed filled 12 in deep takes about 1.2 cubic yards (32 cu ft). Many gardeners fill with a soil/compost blend rather than pure topsoil for drainage and nutrients." },
      { q: "How deep should topsoil be for a new lawn?", a: "4–6 inches of good topsoil under seed or sod is the common recommendation. For top-dressing an existing lawn, ¼–½ inch worked into the grass is enough per application." },
      { q: "Does topsoil settle?", a: "Yes — expect roughly 10–20% settling after watering and rain, especially fluffy screened soil. The calculator's bulk rounding (to the nearest quarter yard) plus a small surplus covers most settling." },
    ],
    inputs: [
      num("length", "Length", 8, "ft", 0.1),
      num("width", "Width", 4, "ft", 0.1),
      num("depth", "Depth", 12, "in", 0.5),
      sel("bagSize", "Bag size", 1.5, [
        { value: 1.5, label: "1.5 cu ft bag (most common)" },
        { value: 1, label: "1 cu ft bag" },
        { value: 2, label: "2 cu ft bag" },
      ]),
      num("bagPrice", "Price per bag", 4, "$", 0.01),
      num("bulkPrice", "Bulk price per yd³", 40, "$", 1),
      num("deliveryFee", "Bulk delivery fee", 60, "$", 1),
    ],
    related: ["mulch-calculator", "gravel-calculator", "concrete-calculator"],
  },
  {
    slug: "board-foot-calculator",
    name: "Board Foot Calculator",
    short: "Board feet and lumber cost from board dimensions and quantity.",
    category: "Walls & Rooms",
    keyword: "board foot calculator",
    title: "Board Foot Calculator — Board Feet & Lumber Cost | QtyRight",
    description:
      "Free board foot calculator: board feet from thickness, width, length and quantity, with waste allowance and lumber cost at your price per board foot.",
    intro: [
      "Hardwood lumber isn't sold by the piece or the foot — it's sold by the board foot, a volume unit that surprises everyone on their first trip to a real lumber yard. This calculator converts your board dimensions into board feet, totals the project, adds a waste allowance for grain selection and defects, and prices it at your yard's rate.",
      "One board foot is 144 cubic inches: a board 1 in thick, 12 in wide and 12 in long.",
    ],
    formula: "Board feet per board = Thickness (in) × Width (in) × Length (ft) ÷ 12. Total = Board feet × quantity × (1 + waste %).",
    howTo: [
      "Enter the thickness and width in inches — use the size your dealer charges by (nominal vs actual matters; see the note below the calculator).",
      "Enter the board length in feet and how many boards the project needs.",
      "Add waste: 15–20% is realistic for furniture work where you select for grain and cut around defects.",
      "Enter your yard's price per board foot for that species to get the project lumber cost.",
    ],
    example:
      "Ten boards of 4/4 stock at 6 in wide and 8 ft long: (1 × 6 × 8) ÷ 12 = 4 board feet each, 40 total. With 20% waste allowance, order 48 board feet — at $6.50/board foot that's about $312 of lumber.",
    faqs: [
      { q: "What is a board foot?", a: "A unit of lumber volume equal to 144 cubic inches — a board 1 in thick × 12 in wide × 1 ft long. It's the standard pricing unit for hardwood lumber in the US." },
      { q: "How do I calculate board feet?", a: "Multiply thickness (inches) × width (inches) × length (feet), then divide by 12. For length in inches, divide by 144 instead." },
      { q: "What does 4/4, 5/4 and 8/4 mean?", a: "Lumber thickness is quoted in quarters of an inch: 4/4 = 1 in, 5/4 = 1.25 in, 8/4 = 2 in — in the rough. After surfacing, 4/4 stock is typically ¾–¹⁵⁄₁₆ in thick. You pay for the rough thickness." },
      { q: "How much waste should I allow for hardwood?", a: "15–20% for typical furniture projects. Rough boards have defects to cut around, and matching grain across parts means some wood won't be usable where you first planned." },
    ],
    inputs: [
      num("thickness", "Thickness", 1, "in", 0.25),
      num("width", "Width", 6, "in", 0.1),
      num("lengthFt", "Length", 8, "ft", 0.1),
      num("quantity", "Number of boards", 10),
      num("waste", "Waste allowance", 20, "%"),
      num("pricePerBoardFoot", "Price per board foot", 6.5, "$", 0.01),
    ],
    related: ["deck-calculator", "fence-calculator", "drywall-calculator"],
  },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
export const categories = [...new Set(tools.map((t) => t.category))];
