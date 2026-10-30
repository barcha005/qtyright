// Unit tests for the calculator maths, checked against independently known
// worked examples (manufacturer yields, published brick tables, standard
// coverage figures). Run: npm run test:calcs
import { calculators } from "../lib/calc.ts";

let failures = 0;
function check(name: string, cond: boolean, detail: string) {
  if (cond) {
    console.log(`PASS  ${name}`);
  } else {
    failures++;
    console.log(`FAIL  ${name} — ${detail}`);
  }
}
const row = (slug: string, vals: Record<string, number>, labelPart: string) => {
  const r = calculators[slug](vals);
  const found = r.rows.find((x) => x.label.includes(labelPart));
  return found ? found.value : "(missing row)";
};

// Concrete: 10×10 ft, 4 in → 33.33 ft³; +10% = 36.67 ft³ = 1.358 yd³; 80 lb bags = ceil(36.67/0.6) = 62
{
  const v = { length: 10, width: 10, thickness: 4, waste: 10, bagSize: 80, bagPrice: 5.5, readyMixPrice: 165 };
  const r = calculators["concrete-calculator"](v);
  check("concrete summary ~1.36 yd³", r.summary.includes("1.36"), r.summary);
  check("concrete 62 bags", row("concrete-calculator", v, "bags needed").startsWith("62"), row("concrete-calculator", v, "bags needed"));
  // 60 lb bags: ceil(36.67/0.45) = 82
  check("concrete 60lb = 82 bags", row("concrete-calculator", { ...v, bagSize: 60 }, "bags needed").startsWith("82"), row("concrete-calculator", { ...v, bagSize: 60 }, "bags needed"));
}

// Paint: 12×12, 8 ft ceilings, 1 door, 2 windows → wall 384−51=333 sq ft; 2 coats @350 → 1.90 gal → buy 2
{
  const v = { length: 12, width: 12, height: 8, doors: 1, windows: 2, coats: 2, ceiling: 0, coverage: 350, pricePerGallon: 42 };
  const r = calculators["paint-calculator"](v);
  check("paint buy 2 gal", row("paint-calculator", v, "Buy") === "2 gal", row("paint-calculator", v, "Buy"));
  check("paint exact 1.9 gal", row("paint-calculator", v, "exact").includes("1.9"), row("paint-calculator", v, "exact"));
}

// Mulch: 20×4 @3in → 20 ft³ = 0.74 yd³; 2 cu ft bags = 10; 1 yd³ covers 108 sq ft @3in sanity: 80 sq ft needs 20 ft³ ✓
{
  const v = { length: 20, width: 4, depth: 3, bagSize: 2, bagPrice: 4.5, bulkPrice: 45, deliveryFee: 60 };
  const r = calculators["mulch-calculator"](v);
  check("mulch 10 bags", row("mulch-calculator", v, "Bags").startsWith("10"), row("mulch-calculator", v, "Bags"));
  check("mulch bags cheaper at this size", r.summary.includes("Bags is cheaper"), r.summary);
  // Big job flips to bulk: 40×20 @3in = 200 ft³ = 7.4 yd³ → 100 bags ($450) vs 7.5 yd bulk ($337+60=397)
  const big = { ...v, length: 40, width: 20 };
  check("mulch bulk wins on big job", calculators["mulch-calculator"](big).summary.includes("Bulk delivery is cheaper"), calculators["mulch-calculator"](big).summary);
}

// Gravel: 20×10 @4in → 66.67 ft³ = 2.47 yd³; tons = 2.47×1.4 = 3.46
{
  const v = { length: 20, width: 10, depth: 4, density: 1.4, bagSize: 0.5, bagPrice: 5, bulkPrice: 65, deliveryFee: 60 };
  check("gravel tons ~3.46", row("gravel-calculator", v, "Weight").includes("3.46"), row("gravel-calculator", v, "Weight"));
}

// Tile: 10×8, 12×12 tiles, 10% waste → 88 tiles → 9 boxes @10
{
  const v = { length: 10, width: 8, tileArea: 1, waste: 10, tilesPerBox: 10, pricePerBox: 38 };
  check("tile 9 boxes", row("tile-calculator", v, "Boxes to buy").startsWith("9"), row("tile-calculator", v, "Boxes to buy"));
}

// Flooring: 14×12=168, +10%=184.8, ÷22 = 9 boxes
{
  const v = { length: 14, width: 12, boxCoverage: 22, waste: 10, pricePerBox: 65 };
  check("flooring 9 boxes", row("flooring-calculator", v, "Boxes to buy") === "9", row("flooring-calculator", v, "Boxes to buy"));
}

// Drywall: 12×10, 8ft, ceiling → walls 352 + ceiling 120 = 472; ×1.1 ÷32 = 16.2 → 17 sheets
{
  const v = { length: 12, width: 10, height: 8, ceiling: 1, sheetArea: 32, waste: 10, pricePerSheet: 14 };
  check("drywall 17 sheets", row("drywall-calculator", v, "Sheets").startsWith("17"), row("drywall-calculator", v, "Sheets"));
}

// Fence: 100 ft, 8 ft spacing → 14 posts, 26 rails (2/section), pickets 1200/6 = 200
{
  const v = { length: 100, spacing: 8, railsPerSection: 2, picketWidth: 5.5, gap: 0.5, bagsPerPost: 1, picketPrice: 3.5, postPrice: 12, railPrice: 9 };
  check("fence 14 posts", row("fence-calculator", v, "Posts").startsWith("14"), row("fence-calculator", v, "Posts"));
  check("fence 200 pickets", row("fence-calculator", v, "Pickets") === "200", row("fence-calculator", v, "Pickets"));
}

// Deck: 16×12, 5.5in boards +0.25 gap → rows ceil(144/5.75)=26; 16ft boards → 26 exact; +10% → 29
{
  const v = { length: 16, width: 12, boardWidth: 5.5, gap: 0.25, boardLength: 16, waste: 10, boardPrice: 14 };
  check("deck buys 29 boards", row("deck-calculator", v, "Boards to buy").startsWith("29"), row("deck-calculator", v, "Boards to buy"));
}

// Brick: modular 6.86/sq ft; 20×4=80 sq ft → 549 exact; +10% → 604
{
  const v = { length: 20, height: 4, faceArea: 21, waste: 10, pricePerBrick: 0.85 };
  check("brick 6.86/sq ft", row("brick-calculator", v, "per sq ft") === "6.86", row("brick-calculator", v, "per sq ft"));
  check("brick buys 604", row("brick-calculator", v, "Bricks to buy") === "604", row("brick-calculator", v, "Bricks to buy"));
}

// Topsoil: 8×4 @12in → 32 ft³; 1.5 cu ft bags = 22 (ceil 21.33)
{
  const v = { length: 8, width: 4, depth: 12, bagSize: 1.5, bagPrice: 4, bulkPrice: 40, deliveryFee: 60 };
  check("topsoil 22 bags", row("topsoil-calculator", v, "Bags").startsWith("22"), row("topsoil-calculator", v, "Bags"));
}

// Board foot: 1×6×8ft = 4 bd ft; ×10 = 40; +20% → 48 bd ft order
{
  const v = { thickness: 1, width: 6, lengthFt: 8, quantity: 10, waste: 20, pricePerBoardFoot: 6.5 };
  check("board foot orders 48", row("board-foot-calculator", v, "Order").includes("48"), row("board-foot-calculator", v, "Order"));
}

console.log(failures === 0 ? "\nAll calculator tests passed." : `\n${failures} test(s) FAILED.`);
process.exit(failures === 0 ? 0 : 1);
