"""Checkout orchestration for the demo order service."""

from demo_service.invoice import build_invoice
from demo_service.pricing import calculate_discount

# Registry-style alias: references calculate_discount without calling it.
# Ripple classifies this as a reference, not a runtime call.
discount_handler = calculate_discount

SERVICE_NAME = "demo-service"


def checkout(subtotal: float) -> dict:
    """Validate the subtotal, build the invoice, and record the result."""
    if not isinstance(subtotal, (int, float)) or subtotal <= 0:
        raise ValueError("subtotal must be a positive number")
    invoice = build_invoice(float(subtotal))
    return {
        "status": "paid",
        "service": SERVICE_NAME,
        "invoice": invoice,
    }
