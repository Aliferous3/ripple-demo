import type { Order } from "./types";
import { OrderCard } from "./OrderCard";
import { LegacyOrderBadge } from "./LegacyOrderBadge";

const demoOrders: Order[] = [
  {
    id: "A-1024",
    customerName: "Ada Lovelace",
    total: 129.95,
    currency: "USD",
    status: "paid",
    itemCount: 3,
    createdAt: new Date("2026-10-01T12:00:00Z"),
  },
  {
    id: "A-1025",
    customerName: "Alan Turing",
    total: 84.5,
    currency: "USD",
    status: "pending",
    itemCount: 1,
    createdAt: new Date("2026-10-03T09:30:00Z"),
  },
];

export function App() {
  return (
    <main className="app">
      <header className="app__header">
        <h1>Orders</h1>
        <p>
          {demoOrders.length} orders · demo data only
        </p>
      </header>
      <section className="app__orders" aria-label="Recent orders">
        {demoOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </section>
      <section className="app__legacy" aria-label="Legacy badge view">
        <LegacyOrderBadge order={demoOrders[0]} />
      </section>
    </main>
  );
}
