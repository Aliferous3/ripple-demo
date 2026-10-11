import { formatCustomerName } from "./formatCustomerName.js";

const CHANNEL = "order-updates";

export function buildNotification(customer) {
  const recipient = formatCustomerName(customer.firstName, customer.lastName);
  const orderRef = String(customer.orderId ?? "unknown").toUpperCase();
  const subject = `Order ${orderRef} confirmed`;
  return {
    channel: CHANNEL,
    subject,
    body: `${subject} for ${recipient}. Thank you for your purchase.`,
    recipient,
    orderId: orderRef,
    priority: customer.expedited ? "high" : "normal",
  };
}
