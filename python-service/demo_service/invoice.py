from demo_service.pricing import calculate_total


def build_invoice(subtotal: float) -> dict:
    total = calculate_total(subtotal)
    return {
        "subtotal": subtotal,
        "total": total,
    }
