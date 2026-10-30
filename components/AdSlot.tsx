import { adsenseClientId } from "../lib/site";

/**
 * AdSense-ready placement. Renders NOTHING until the owner sets
 * NEXT_PUBLIC_ADSENSE_CLIENT_ID and passes a real ad-unit slot id
 * ( NEXT_PUBLIC_AD_SLOT_<NAME> ). No fake ads, ever.
 * Placements are kept away from inputs and buttons to avoid
 * accidental clicks (AdSense policy).
 */
export default function AdSlot({ name, slotId }: { name: string; slotId?: string }) {
  const resolvedSlot =
    slotId || process.env[`NEXT_PUBLIC_AD_SLOT_${name.toUpperCase()}`] || "";
  if (!adsenseClientId || !resolvedSlot) return null;
  return (
    <div className="ad-slot" aria-hidden="true">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseClientId}
        data-ad-slot={resolvedSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
