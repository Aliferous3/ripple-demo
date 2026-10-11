import { buildNotification } from "./buildNotification.js";

function isDeliverable(notification) {
  return Boolean(notification.recipient && notification.orderId !== "UNKNOWN");
}

export function sendNotification(customer) {
  const notification = buildNotification(customer);
  if (!isDeliverable(notification)) {
    console.warn(`[notify] skipped undeliverable notification for ${notification.orderId}`);
    return { sent: false, orderId: notification.orderId };
  }
  console.log(`[${notification.channel}] ${notification.subject} -> ${notification.recipient}`);
  return {
    sent: true,
    channel: notification.channel,
    priority: notification.priority,
  };
}

sendNotification({
  firstName: "Ada",
  lastName: "Lovelace",
  orderId: "a-1024",
  expedited: true,
});
