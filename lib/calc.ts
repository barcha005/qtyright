// Pure calculator maths for QtyRight. No imports, no side effects —
// every function is unit-tested in scripts/test-calcs.mts.
// All inputs are US customary units unless a label says otherwise.

export interface CalcRow {
  label: string;
  value: string;
}

export interface CalcResult {
  summary: string;
  rows: CalcRow[];
  shopping: string[];
  note?: string;
}

type V = Record<string, number>;

const n = (v: number, d = 2) =>
  v.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: 0 });
const money = (v: number) =>
  v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const ceil = Math.ceil;
const quarterUp = (v: number) => Math.ceil(v * 4) / 4; // ready-mix / bulk order step

function concrete(v: V): CalcResult {
  const cuftRaw = v.length * v.width * (v.thickness / 12);
  const cuft = cuftRaw * (1 + v.waste / 100);
  const cuyd = cuft / 27;
  const yieldPerBag = v.bagSize === 80 ? 0.6 : v.bagSize === 60 ? 0.45 : 0.3;
  const bags = ceil(cuft / yieldPerBag);
  const bagCost = bags * v.bagPrice;
  const orderYd = quarterUp(cuyd);
  const readyCost = orderYd * v.readyMixPrice;
  return {
    summary: `You need ${n(cuyd)} cubic yards of concrete (with ${v.waste}% waste included).`,
    rows: [
      { label: "Volume before waste", value: `${n(cuftRaw / 27)} yd³ (${n(cuftRaw)} ft³)` },
      { label: "Volume with waste", value: `${n(cuyd)} yd³` },
      { label: `${v.bagSize} lb bags needed`, value: `${bags} bags` },
      { label: "Bagged cost estimate", value: money(bagCost) },
      { label: "Ready-mix order (rounded to ¼ yd)", value: `${n(orderYd)} yd³` },
      { label: "Ready-mix cost estimate", value: money(readyCost) },
      { label: "Approx. weight", value: `${n(cuyd * 4000, 0)} lb` },
    ],
    shopping: [
      bags <= 30
        ? `${bags} × ${v.bagSize} lb bags of concrete mix — ${money(bagCost)}`
        : `${orderYd} yd³ ready-mix concrete — ${money(readyCost)} (bags would be ${bags} × ${v.bagSize} lb = ${money(bagCost)})`,
      "Form boards / stakes for the edges",
      "Gravel base (2–4 in) if pouring on soil",
    ],
    note:
      bags <= 30
        ? "Bagged mix is usually the practical choice at this size (under roughly ½ yd³, bags win; this job is still in hand-mixing range)."
        : "Above ~30 bags, ready-mix is usually cheaper and far less labour — and it avoids a cold joint halfway through the pour. Ready-mix trucks often add a short-load fee under 4–5 yd³; ask before ordering.",
  };
}

function paint(v: V): CalcResult {
  const wallGross = 2 * (v.length + v.width) * v.height;
  const openings = v.doors * 21 + v.windows * 15;
  const wallArea = Math.max(wallGross - openings, 0);
  const ceilingArea = v.ceiling === 1 ? v.length * v.width : 0;
  const totalPerCoat = wallArea + ceilingArea;
  const gallonsExact = (totalPerCoat * v.coats) / v.coverage;
  const gallonsBuy = Math.max(ceil(gallonsExact), 1);
  return {
    summary: `You need about ${n(gallonsExact)} gallons — buy ${gallonsBuy} gallon${gallonsBuy > 1 ? "s" : ""} for ${v.coats} coat${v.coats > 1 ? "s" : ""}.`,
    rows: [
      { label: "Gross wall area", value: `${n(wallGross, 0)} sq ft` },
      { label: "Minus doors & windows", value: `−${n(openings, 0)} sq ft` },
      { label: "Paintable area per coat", value: `${n(totalPerCoat, 0)} sq ft` },
      { label: "Paint needed (exact)", value: `${n(gallonsExact)} gal` },
      { label: "Buy", value: `${gallonsBuy} gal` },
      { label: "Estimated paint cost", value: money(gallonsBuy * v.pricePerGallon) },
    ],
    shopping: [
      `${gallonsBuy} gal wall paint — ${money(gallonsBuy * v.pricePerGallon)}`,
      "1 gal primer if painting bare drywall or a big colour change",
      "Painter's tape, 1 roller cover per coat, drop cloth",
    ],
    note: "Coverage assumes smooth walls. Rough texture, stucco or very porous surfaces can use 25–30% more paint — lower the coverage figure to ~275 sq ft/gal to model that.",
  };
}

function bulkMaterial(kind: "mulch" | "topsoil" | "gravel") {
  return (v: V): CalcResult => {
    const cuft = v.length * v.width * (v.depth / 12);
    const cuyd = cuft / 27;
    const bagSize = v.bagSize; // cu ft per bag (mulch/topsoil) — gravel uses 0.5 cu ft bags
    const bags = ceil(cuft / bagSize);
    const bagCost = bags * v.bagPrice;
    const bulkYd = quarterUp(cuyd);
    const bulkCost = bulkYd * v.bulkPrice + v.deliveryFee;
    const tons = kind === "gravel" ? cuyd * v.density : 0;
    const rows: CalcRow[] = [
      { label: "Area", value: `${n(v.length * v.width, 0)} sq ft` },
      { label: "Volume needed", value: `${n(cuyd)} yd³ (${n(cuft)} ft³)` },
      { label: `Bags (${bagSize} cu ft) needed`, value: `${bags} bags — ${money(bagCost)}` },
      { label: "Bulk order (¼-yd steps)", value: `${n(bulkYd)} yd³ — ${money(bulkCost)} incl. delivery` },
    ];
    if (kind === "gravel") rows.push({ label: "Weight", value: `${n(tons)} tons (at ${v.density} tons/yd³)` });
    const cheaper = bagCost <= bulkCost ? "Bags" : "Bulk delivery";
    return {
      summary: `${n(cuyd)} cubic yards of ${kind} — ${bags} bags or ${n(bulkYd)} yd³ bulk. ${cheaper} is cheaper for this job.`,
      rows,
      shopping: [
        bagCost <= bulkCost
          ? `${bags} × ${bagSize} cu ft bags — ${money(bagCost)}`
          : `${n(bulkYd)} yd³ bulk ${kind} delivered — ${money(bulkCost)}`,
        kind === "mulch" ? "Landscape fabric only if the bed is new (optional)" : kind === "gravel" ? "Landscape fabric for under driveways/paths" : "Compost to mix in for planting beds (optional)",
      ],
      note:
        kind === "mulch"
          ? "One cubic yard covers about 108 sq ft at 3 in deep. Keep mulch 3–4 in away from tree trunks and house siding."
          : kind === "topsoil"
            ? "Topsoil settles roughly 10–20% after watering. For raised beds, many gardeners order a soil/compost blend rather than pure topsoil."
            : "Depth guide: driveways 4–6 in total (in layers), paths 2–3 in, decorative beds 2 in. Weight varies with moisture — wet gravel weighs more per yard.",
    };
  };
}

function tile(v: V): CalcResult {
  const area = v.length * v.width;
  const tilesExact = (area * (1 + v.waste / 100)) / v.tileArea;
  const tiles = ceil(tilesExact);
  const boxes = ceil(tiles / v.tilesPerBox);
  const thinset = ceil(area / 75);
  return {
    summary: `You need ${tiles} tiles — buy ${boxes} boxes (${boxes * v.tilesPerBox} tiles) to cover ${n(area, 0)} sq ft with ${v.waste}% waste.`,
    rows: [
      { label: "Floor area", value: `${n(area, 0)} sq ft` },
      { label: "Tiles needed (incl. waste)", value: `${tiles}` },
      { label: "Boxes to buy", value: `${boxes} (${v.tilesPerBox} per box)` },
      { label: "Estimated tile cost", value: money(boxes * v.pricePerBox) },
      { label: "Thinset mortar (est.)", value: `${thinset} × 50 lb bags` },
    ],
    shopping: [
      `${boxes} boxes of tile — ${money(boxes * v.pricePerBox)}`,
      `${thinset} × 50 lb thinset mortar bags`,
      "Grout — roughly 1 bag per 100 sq ft (varies with joint width)",
      "Spacers and a notched trowel sized to the tile",
    ],
    note: "Waste guide: 10% for a straight grid in a rectangular room, 15% for diagonal, 20%+ for herringbone or rooms with many cuts. Keep one spare box for future repairs — dye lots change.",
  };
}

function flooring(v: V): CalcResult {
  const area = v.length * v.width;
  const withWaste = area * (1 + v.waste / 100);
  const boxes = ceil(withWaste / v.boxCoverage);
  return {
    summary: `Buy ${boxes} boxes — that covers ${n(boxes * v.boxCoverage, 0)} sq ft for your ${n(area, 0)} sq ft room with ${v.waste}% waste.`,
    rows: [
      { label: "Room area", value: `${n(area, 0)} sq ft` },
      { label: "Area incl. waste", value: `${n(withWaste, 0)} sq ft` },
      { label: "Boxes to buy", value: `${boxes}` },
      { label: "Estimated flooring cost", value: money(boxes * v.pricePerBox) },
    ],
    shopping: [
      `${boxes} boxes of flooring — ${money(boxes * v.pricePerBox)}`,
      "Underlayment if it is not pre-attached to the planks",
      "Transition strips for doorways",
    ],
    note: "Buy all boxes from the same production run/dye lot, and let the flooring acclimate in the room for 48 hours before installing (check the box instructions). Keep one spare box.",
  };
}

function drywall(v: V): CalcResult {
  const wallArea = 2 * (v.length + v.width) * v.height;
  const total = wallArea + (v.ceiling === 1 ? v.length * v.width : 0);
  const sheets = ceil((total * (1 + v.waste / 100)) / v.sheetArea);
  const screws = sheets * 32;
  const mud = ceil(sheets / 8);
  return {
    summary: `You need ${sheets} drywall sheets for ${n(total, 0)} sq ft of surface (walls${v.ceiling === 1 ? " + ceiling" : ""}).`,
    rows: [
      { label: "Wall area", value: `${n(wallArea, 0)} sq ft` },
      { label: "Total surface", value: `${n(total, 0)} sq ft` },
      { label: `Sheets (${v.sheetArea === 48 ? "4×12" : "4×8"}) to buy`, value: `${sheets}` },
      { label: "Estimated sheet cost", value: money(sheets * v.pricePerSheet) },
      { label: "Screws (approx.)", value: `${n(screws, 0)} (≈${n(screws / 300, 1)} boxes of 300)` },
      { label: "Joint compound (approx.)", value: `${mud} × 5-gal buckets` },
    ],
    shopping: [
      `${sheets} drywall sheets — ${money(sheets * v.pricePerSheet)}`,
      `${mud} × 5-gal joint compound, 1 roll paper tape per ~6 sheets`,
      `~${n(screws, 0)} coarse-thread drywall screws (1¼ in)`,
    ],
    note: "Openings (doors/windows) are not subtracted — the waste allowance normally covers them in a typical room. Use 5/8 in fire-rated sheets where code requires (e.g. garage walls) and moisture-resistant board in bathrooms.",
  };
}

function fence(v: V): CalcResult {
  const posts = ceil(v.length / v.spacing) + 1;
  const sections = posts - 1;
  const rails = sections * v.railsPerSection;
  const pickets = ceil((v.length * 12) / (v.picketWidth + v.gap));
  const concreteBags = posts * v.bagsPerPost;
  const cost = pickets * v.picketPrice + posts * v.postPrice + rails * v.railPrice;
  return {
    summary: `For ${n(v.length, 0)} ft of fence: ${posts} posts, ${rails} rails and ${pickets} pickets.`,
    rows: [
      { label: "Posts (incl. ends)", value: `${posts}` },
      { label: "Sections", value: `${sections}` },
      { label: `Rails (${v.railsPerSection} per section)`, value: `${rails} × ${v.spacing} ft` },
      { label: "Pickets", value: `${pickets}` },
      { label: "Concrete for posts", value: `${concreteBags} × 80 lb bags` },
      { label: "Estimated lumber cost", value: money(cost) },
    ],
    shopping: [
      `${posts} × 4×4 posts — ${money(posts * v.postPrice)}`,
      `${rails} × rails (${v.spacing} ft) — ${money(rails * v.railPrice)}`,
      `${pickets} × pickets — ${money(pickets * v.picketPrice)}`,
      `${concreteBags} × 80 lb concrete bags (1 per post)`,
      "Galvanised screws/nails and a gate hardware kit if adding a gate",
    ],
    note: "Posts are spaced centre-to-centre. Call 811 (in the US) before digging — utility marking is free and legally required in most states. Check local code and HOA rules for height and setback.",
  };
}

function deck(v: V): CalcResult {
  const rowsCount = ceil((v.width * 12) / (v.boardWidth + v.gap));
  const boardsPerRow = ceil(v.length / v.boardLength);
  const exact = rowsCount * boardsPerRow;
  const boards = ceil(exact * (1 + v.waste / 100));
  const joistsCrossed = Math.floor((v.boardLength * 12) / 16) + 1;
  const screws = boards * joistsCrossed * 2;
  return {
    summary: `You need ${boards} deck boards (${v.boardLength} ft) to cover a ${n(v.length, 0)}×${n(v.width, 0)} ft deck, including ${v.waste}% waste.`,
    rows: [
      { label: "Deck area", value: `${n(v.length * v.width, 0)} sq ft` },
      { label: "Rows of boards", value: `${rowsCount}` },
      { label: "Boards (exact)", value: `${exact}` },
      { label: "Boards to buy (incl. waste)", value: `${boards}` },
      { label: "Estimated board cost", value: money(boards * v.boardPrice) },
      { label: "Screws (approx.)", value: `${n(screws, 0)} (≈${ceil(screws / 350)} boxes of 350)` },
    ],
    shopping: [
      `${boards} × ${v.boardLength} ft deck boards — ${money(boards * v.boardPrice)}`,
      `~${n(screws, 0)} deck screws (2½–3 in, exterior rated)`,
      "Joist tape and hidden fasteners if your board system uses them",
    ],
    note: "Boards are assumed to run along the deck's length with 16 in joist spacing. Diagonal layouts need ~15% waste. Composite board widths and gaps differ — use the actual board width from the manufacturer.",
  };
}

function brick(v: V): CalcResult {
  // Brick counts derived from face size + 3/8 in mortar joint — matches published tables
  // (e.g. modular brick: (7.625+0.375) × (2.25+0.375) in = 21 sq in → 6.86 bricks/sq ft).
  // The tool's brick-type select passes that joint-inclusive face area as v.faceArea.
  const perSqFt = 144 / v.faceArea;
  const area = v.length * v.height;
  const bricks = ceil(area * perSqFt * (1 + v.waste / 100));
  const mortar = ceil(bricks / 35);
  return {
    summary: `You need ${n(bricks, 0)} bricks for a ${n(area, 0)} sq ft wall (single wythe), plus about ${mortar} bags of mortar.`,
    rows: [
      { label: "Wall area", value: `${n(area, 0)} sq ft` },
      { label: "Bricks per sq ft", value: n(perSqFt) },
      { label: "Bricks to buy (incl. waste)", value: n(bricks, 0) },
      { label: "Estimated brick cost", value: money(bricks * v.pricePerBrick) },
      { label: "Mortar (approx.)", value: `${mortar} × 80 lb bags` },
    ],
    shopping: [
      `${n(bricks, 0)} bricks — ${money(bricks * v.pricePerBrick)}`,
      `${mortar} × 80 lb mortar mix bags`,
      "Wall ties if tying into an existing structure",
    ],
    note: "Single-wythe (one brick thick) veneer maths with a standard ⅜ in mortar joint. Mortar usage is an approximation — masons typically quote one 80 lb bag per ~35 modular-size bricks laid.",
  };
}

function boardFoot(v: V): CalcResult {
  const oneBoard = (v.thickness * v.width * v.lengthFt) / 12;
  const totalExact = oneBoard * v.quantity;
  const totalBuy = totalExact * (1 + v.waste / 100);
  return {
    summary: `${n(totalExact)} board feet in total — order ${n(totalBuy)} board feet with ${v.waste}% waste allowance.`,
    rows: [
      { label: "Board feet per board", value: n(oneBoard) },
      { label: "Total (exact)", value: `${n(totalExact)} bd ft` },
      { label: "Order (incl. waste)", value: `${n(totalBuy)} bd ft` },
      { label: "Estimated lumber cost", value: money(totalBuy * v.pricePerBoardFoot) },
      { label: "Total linear feet", value: `${n(v.lengthFt * v.quantity, 0)} ft` },
    ],
    shopping: [
      `${n(totalBuy)} bd ft of lumber — ${money(totalBuy * v.pricePerBoardFoot)}`,
      "Ask the yard to surface (S2S/S4S) if you do not have a planer/jointer",
    ],
    note: "Lumber is sold by nominal size but measured by actual size at most hardwood dealers — a '1×6' is usually ¾ in × 5½ in actual. Enter the size your dealer charges by. Rough lumber is often sold in random widths/lengths, so the waste allowance matters.",
  };
}

export const calculators: Record<string, (v: V) => CalcResult> = {
  "concrete-calculator": concrete,
  "paint-calculator": paint,
  "mulch-calculator": bulkMaterial("mulch"),
  "gravel-calculator": bulkMaterial("gravel"),
  "tile-calculator": tile,
  "flooring-calculator": flooring,
  "drywall-calculator": drywall,
  "fence-calculator": fence,
  "deck-calculator": deck,
  "brick-calculator": brick,
  "topsoil-calculator": bulkMaterial("topsoil"),
  "board-foot-calculator": boardFoot,
};
