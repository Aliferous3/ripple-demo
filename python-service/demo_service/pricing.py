"""Pricing rules for the demo order service."""

MIN_SUBTOTAL = 0.0
CURRENCY = "USD"


def calculate_discount(total: float) -> float:
    """Apply the flat discount rate to a positive subtotal."""
    if total <= MIN_SUBTOTAL:
        return 0.0
    rate = 0.10
    return round(total * rate, 2)


def calculate_total(subtotal: float) -> float:
    """Subtotal minus discount, rounded to cents."""
    discount = calculate_discount(subtotal)
    return round(subtotal - discount, 2)
