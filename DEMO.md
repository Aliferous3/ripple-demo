# Ripple Demo — scenarios

Each scenario below was run against the real Ripple engine
(v0.2.0-beta.1 and the matching local build) on this repository, and the
output shown is the observed result — not a mockup.

Run Ripple from the repo root: `ripple impact` for one-shot analysis or
`ripple explore` for the live explorer. Between scenarios, reset with
`git reset --hard demo-v2 && git clean -fd`.

All results below are runtime `calls` impact unless stated otherwise.
Affected ≠ broken — these are symbols whose inputs changed, with
evidence.

---

## SCENARIO 1 — TypeScript runtime impact

File: `web/src/formatDate.ts`

Baseline (inside `formatDate`):

```ts
return date.toLocaleDateString(DISPLAY_LOCALE, {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: DISPLAY_TIME_ZONE,
});
```

Edit: change `month: "short"` → `month: "long"`. Save.

Observed:

```text
changed:    formatDate()
direct:     formatOrderSummary()
transitive: OrderCard(), App(), main.tsx
```

Chain: `formatDate → formatOrderSummary → OrderCard → App → main.tsx`.

Undo: revert the edit, or `git checkout -- web/src/formatDate.ts`.

---

## SCENARIO 2 — JSX impact

File: `web/src/OrderCard.tsx`

Edit: `className="order-card"` → `className="order-card highlighted"`.
Save.

Observed:

```text
changed:    OrderCard()
direct:     App()          (jsx_uses)
transitive: main.tsx       (jsx_uses)
```

`App` renders `<OrderCard>` and `main.tsx` renders `<App>` — real JSX
usage edges (`jsx_uses`), not function calls.

---

## SCENARIO 3 — Type-only impact

File: `web/src/types.ts`

Edit: add a field to the `Order` interface —

```ts
export interface Order {
  id: string;
  customerName: string;
  total: number;
  currency: Currency;
  status: OrderStatus;
  itemCount: number;
  createdAt: Date;
  notes?: string;   // add this line
}
```

Observed:

```text
changed:        Order#notes
direct:         —
transitive:     —
typeImpact:     App.tsx, formatLegacySummary(), formatOrderSummary(),
                LegacyOrderBadge(), legacyOrderLabel(), OrderCard()
```

Every file that annotates with `Order` lands in **type** impact. The
runtime lists stay empty — type changes never masquerade as runtime
callers.

---

## SCENARIO 4 — JavaScript runtime impact

File: `worker/src/formatCustomerName.js`

Edit:

```js
return `${first} ${last}`;
```

→

```js
return `${last}, ${first}`;
```

Observed:

```text
changed:    formatCustomerName()
direct:     buildNotification()
transitive: sendNotification(), sendNotification.js
```

Plain `.js` — no TypeScript needed for semantic call graphs.

---

## SCENARIO 5 — Python runtime impact + relevant test

File: `python-service/demo_service/pricing.py`

Edit: `rate = 0.10` → `rate = 0.15` inside `calculate_discount`. Save.

Observed:

```text
changed:    calculate_discount()
direct:     calculate_total()
transitive: build_invoice(), checkout(),
            test_checkout_returns_paid_invoice(),
            test_checkout_invoice_shape(),
            test_checkout_rejects_invalid_subtotal()
tests:      test_checkout.py — all three checkout tests
```

Chain: `calculate_discount → calculate_total → build_invoice → checkout → test_checkout`.

Note what is *not* in `direct`: `checkout.py` only *references*
`calculate_discount` (scenario 6) — it does not call it.

---

## SCENARIO 6 — A reference is not a call

Python — `python-service/demo_service/checkout.py`:

```python
discount_handler = calculate_discount
```

TypeScript — `web/src/formatters.ts`:

```ts
export const dateFormatter = formatDate;
```

Both are alias assignments — the function object is referenced, never
invoked. In the graph, the edges into `calculate_discount()` and
`formatDate()` from these files are `references`, not `calls`.

Observed edge audit (edges INTO `calculate_discount()`):

```text
pricing.py            contains
calculate_total()     calls          ← real call site
checkout.py           references     ← the alias — NOT a call
```

Must NOT appear: a `calls` edge from `checkout.py` (or
`discount_handler`) to `calculate_discount()`. It does not.

---

## SCENARIO 7 — Deleted symbol

File: `web/src/legacy.ts`

Edit: delete the `legacyOrderLabel` function (including its docstring):

```ts
/**
 * Deprecated label format kept for the archived badge view.
 * New code should use OrderCard, not this badge.
 */
export function legacyOrderLabel(order: Order): string {
  const shortId = order.id.replace(/^A-/, "");
  return `${LEGACY_PREFIX}-${shortId}`;
}
```

Observed:

```text
changed: —
deleted: legacyOrderLabel   (resolved from the base graph)
former callers:
  formatLegacySummary()      web/src/legacy.ts
  LegacyOrderBadge()         web/src/LegacyOrderBadge.tsx
  App()                      web/src/App.tsx
  main.tsx                   web/src/main.tsx
```

Deleting a symbol does not lose its callers — Ripple reconstructs them
from the base revision so "who used to call this?" still has an answer.

Undo: `git checkout -- web/src/legacy.ts`.

---

## Mixed-language note

`web/` (TypeScript), `worker/` (JavaScript), and `python-service/`
(Python) are indexed together in one analysis — this repository produces
a single merged graph with provenance on every symbol (`scip-typescript`
vs `scip-python` adapters).

Ripple does **not** synthesize cross-language edges: there are no
TypeScript→Python or JavaScript→Python relationships in the graph. A
frontend and backend with matching names are never linked by name.
