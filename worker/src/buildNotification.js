import { formatCustomerName } from "./formatCustomerName.js";

export function buildNotification(customer) {
  const name = formatCustomerName(customer.firstName, customer.lastName);
  return `Order ${customer.orderId} confirmed for ${name}`;
}
