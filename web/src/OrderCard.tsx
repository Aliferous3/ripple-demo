import type { Order, OrderStatus } from "./types";
import { formatOrderSummary } from "./formatOrderSummary";

export function OrderCard({ order }: { order: Order }) {
  const status: OrderStatus = "paid";
  return (
    <div className="order-card">
      <p>{formatOrderSummary(order)}</p>
      <span>{status}</span>
    </div>
  );
}
