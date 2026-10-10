# Ripple Demo

A deliberately small, mixed-language fixture for demonstrating
[Ripple](https://github.com/Aliferous3/ripple-impact) — a deterministic
change-impact explorer.

> I changed this code. What else could be affected — and why?

This repository contains a tiny fictional order-processing app split
across three supported language families:

| Folder | Language | Status |
|---|---|---|
| `web/` | TypeScript / TSX (React) | stable |
| `worker/` | JavaScript (Node) | stable |
| `python-service/` | Python | experimental |

Ripple analyzes each language family in this repository with real
semantic indexing. It does **not** invent cross-language API/RPC edges —
there are no synthetic TypeScript→Python or JavaScript→Python
relationships.

## What this fixture demonstrates

- TypeScript runtime impact (`formatDate → formatOrderSummary → OrderCard → App → main`)
- JSX usage edges
- Type-only impact kept separate from runtime impact
- JavaScript runtime impact (`formatCustomerName → buildNotification → sendNotification`)
- Python runtime impact (`calculate_discount → calculate_total → build_invoice → checkout → test_checkout`)
- Relevant tests
- **A reference is not a call** — `dateFormatter` and `discount_handler`
  alias functions without calling them
- Deleted-symbol tombstones with former callers (`legacyOrderLabel`)
- Mixed-language analysis in a single repository

## Recording

- `DEMO.md` — numbered scenarios with exact edits and actual observed
  Ripple output.
- `RECORDING.md` — a ~80-second recording runbook.

## Reset

```sh
git reset --hard demo-v1
git clean -fd
```

This discards all local edits. `scripts/reset-demo.ps1` does the same.

## Install Ripple

```sh
npm install -g https://github.com/Aliferous3/ripple-impact/releases/download/v0.2.0-beta.1/ripple-impact-0.2.0-beta.1.tgz
```

Then, from this repository:

```sh
ripple explore
```

TypeScript/JavaScript stable; Python experimental. Requirements: Node ≥ 22,
git, and Python ≥ 3.10 on PATH for Python indexing.

## License

Apache-2.0
