import type { Order } from "./types";

const LEGACY_PREFIX = "LEG";

/**
 * Deprecated label format kept for the archived badge view.
 * New code should use OrderCard, not this badge.
 */
export function legacyOrderLabel(order: Order): string {
  const shortId = order.id.replace(/^A-/, "");
  return `${LEGACY_PREFIX}-${shortId}`;
}

export function formatLegacySummary(order: Order): string {
  const label = legacyOrderLabel(order);
  const customer = order.customerName.toUpperCase();
  return `${label} · ${customer} · ${order.status}`;
}
