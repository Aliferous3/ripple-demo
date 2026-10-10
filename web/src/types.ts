export interface Order {
  id: string;
  customerName: string;
  total: number;
  createdAt: Date;
}

export type OrderStatus = "pending" | "paid" | "shipped";
