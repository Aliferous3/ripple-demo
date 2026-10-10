def calculate_discount(total: float) -> float:
    return total * 0.10


def calculate_total(subtotal: float) -> float:
    return subtotal - calculate_discount(subtotal)
