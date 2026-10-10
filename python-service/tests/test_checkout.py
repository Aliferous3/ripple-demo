from demo_service.checkout import checkout


def test_checkout_returns_paid_invoice():
    result = checkout(100.0)
    assert result["status"] == "paid"
    assert result["invoice"]["total"] == 90.0
