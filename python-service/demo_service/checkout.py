from demo_service.invoice import build_invoice
from demo_service.pricing import calculate_discount

# Registry-style alias: references calculate_discount without calling it.
# Ripple classifies this as a reference, not a runtime call.
discount_handler = calculate_discount


def checkout(subtotal: float) -> dict:
    invoice = build_invoice(subtotal)
    return {
        "status": "paid",
        "invoice": invoice,
    }
