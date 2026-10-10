import type { Order } from "./types";

export function legacyOrderLabel(order: Order): string {
  return `#${order.id}`;
}

export function formatLegacySummary(order: Order): string {
  return `Legacy ${legacyOrderLabel(order)} — ${order.customerName}`;
}
