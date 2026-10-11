from demo_service.checkout import checkout


def test_checkout_returns_paid_invoice():
    result = checkout(100.0)
    assert result["status"] == "paid"
    assert result["invoice"]["total"] == 90.0


def test_checkout_invoice_shape():
    result = checkout(200.0)
    invoice = result["invoice"]
    assert invoice["subtotal"] == 200.0
    assert invoice["discount"] == 20.0
    assert invoice["currency"] == "USD"
    assert invoice["status"] == "issued"


def test_checkout_rejects_invalid_subtotal():
    try:
        checkout(0)
    except ValueError:
        return
    raise AssertionError("expected ValueError for non-positive subtotal")


if __name__ == "__main__":
    test_checkout_returns_paid_invoice()
    test_checkout_invoice_shape()
    test_checkout_rejects_invalid_subtotal()
    print("3 tests passed")
