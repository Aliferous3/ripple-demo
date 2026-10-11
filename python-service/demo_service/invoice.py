"""Invoice assembly for completed checkouts."""

from demo_service.pricing import calculate_total

CURRENCY = "USD"
INVOICE_STATUS = "issued"


def build_invoice(subtotal: float) -> dict:
    """Build a structured invoice document for a subtotal."""
    total = calculate_total(subtotal)
    return {
        "subtotal": round(subtotal, 2),
        "discount": round(subtotal - total, 2),
        "total": total,
        "currency": CURRENCY,
        "status": INVOICE_STATUS,
    }
