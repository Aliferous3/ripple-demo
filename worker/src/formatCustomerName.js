const FALLBACK_NAME = "Valued Customer";

function normalizeNamePart(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}

export function formatCustomerName(firstName, lastName) {
  const first = normalizeNamePart(firstName);
  const last = normalizeNamePart(lastName);
  if (!first && !last) {
    return FALLBACK_NAME;
  }
  if (!last) {
    return first;
  }
  return `${first} ${last}`;
}
