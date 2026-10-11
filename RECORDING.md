# Recording runbook (~80 seconds)

Target length: 75–90 seconds. One continuous take is fine; cut nothing
that shows evidence.

Before recording:

1. `git reset --hard demo-v2 && git clean -fd`
2. Have VS Code open on `web/src/formatDate.ts` and the Ripple explorer
   running (`ripple explore`) side-by-side.
3. Close unrelated tabs/windows. This repo is safe for 4K capture.

| Time | Action |
|---|---|
| 0:00 | Ripple answers: "I changed this code. What else could be affected — and why?" |
| 0:05 | Show `ripple-demo` in VS Code and Ripple explorer side-by-side. |
| 0:10 | Open TypeScript `formatDate()` (DEMO.md scenario 1). |
| 0:15 | Make the formatting edit (`month: "short"` → `month: "long"`). |
| 0:18 | Save. |
| 0:20 | Show Ripple live re-analysis. |
| 0:25 | Show the downstream chain: formatDate → formatOrderSummary → OrderCard → App → main. |
| 0:35 | Open WHY on an affected symbol. |
| 0:45 | Show the evidence / source relationship. |
| 0:55 | Switch to Python `calculate_discount()` in `python-service/demo_service/pricing.py`. |
| 1:00 | Change `0.10` → `0.15`. |
| 1:05 | Save. |
| 1:08 | Show the Python chain: calculate_discount → calculate_total → build_invoice → checkout. |
| 1:15 | Show the relevant test `test_checkout`. |
| 1:20 | Show reference ≠ call: `discount_handler` is a reference, not a call. |
| 1:27 | End on the Ripple explorer. |

End card text:

```
Ripple

I changed this code.
What else could be affected — and why?

github.com/Aliferous3/ripple-impact

TypeScript / JavaScript
Python experimental

Local-first
No telemetry
No source upload
```

Optional add-on takes (not in the 90s cut):

- Type-only impact: edit `OrderStatus` in `web/src/types.ts` — type
  impact surfaces, runtime list stays clean.
- Deletion: remove `legacyOrderLabel` — DELETED tombstone with former
  caller `formatLegacySummary`.
- Reset on camera: `git reset --hard demo-v2 && git clean -fd`.
