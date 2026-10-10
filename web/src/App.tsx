import type { Order } from "./types";
import { OrderCard } from "./OrderCard";
import { LegacyOrderBadge } from "./LegacyOrderBadge";

const demoOrder: Order = {
  id: "A-1024",
  customerName: "Ada Lovelace",
  total: 129.95,
  createdAt: new Date("2026-10-01T12:00:00Z"),
};

export function App() {
  return (
    <main>
      <h1>Orders</h1>
      <OrderCard order={demoOrder} />
      <LegacyOrderBadge order={demoOrder} />
    </main>
  );
}
