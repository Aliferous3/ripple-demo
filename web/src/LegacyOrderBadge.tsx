import type { Order } from "./types";
import { formatLegacySummary } from "./legacy";

export function LegacyOrderBadge({ order }: { order: Order }) {
  return <span className="legacy-badge">{formatLegacySummary(order)}</span>;
}
