import type { Order } from "./types";
import { formatLegacySummary } from "./legacy";

export function LegacyOrderBadge({ order }: { order: Order }) {
  return (
    <span className="legacy-badge" role="note" data-order-id={order.id}>
      <span className="legacy-badge__icon" aria-hidden="true">
        ◆
      </span>
      {formatLegacySummary(order)}
    </span>
  );
}
