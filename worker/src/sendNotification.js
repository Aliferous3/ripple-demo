import { buildNotification } from "./buildNotification.js";

export function sendNotification(customer) {
  const message = buildNotification(customer);
  console.log(`[notify] ${message}`);
  return message;
}

sendNotification({ firstName: "Ada", lastName: "Lovelace", orderId: "A-1024" });
