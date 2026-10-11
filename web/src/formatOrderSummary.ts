import { formatDate } from "./formatDate";
import type { Currency, Order } from "./types";

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};

function formatAmount(total: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOLS[currency] ?? "";
  return `${symbol}${total.toFixed(2)}`;
}

function formatItemCount(itemCount: number): string {
  return itemCount === 1 ? "1 item" : `${itemCount} items`;
}

export function formatOrderSummary(order: Order): string {
  const placed = formatDate(order.createdAt);
  const amount = formatAmount(order.total, order.currency);
  const items = formatItemCount(order.itemCount);
  return `${order.id} · ${order.customerName} · ${amount} · ${items} · ${placed}`;
}
