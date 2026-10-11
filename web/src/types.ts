export type Currency = "USD" | "EUR" | "GBP";

export type OrderStatus = "pending" | "paid" | "shipped";

export interface Order {
  id: string;
  customerName: string;
  total: number;
  currency: Currency;
  status: OrderStatus;
  itemCount: number;
  createdAt: Date;
}
