import { formatDate } from "./formatDate";

// Registry-style alias: references formatDate without calling it.
// Ripple classifies this as a reference, not a runtime call.
export const dateFormatter = formatDate;
