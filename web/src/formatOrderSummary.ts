import { formatDate } from "./formatDate";
import type { Order } from "./types";

export function formatOrderSummary(order: Order): string {
  const date = formatDate(order.createdAt);
  return `Order ${order.id} for ${order.customerName} — $${order.total.toFixed(2)} (${date})`;
}
