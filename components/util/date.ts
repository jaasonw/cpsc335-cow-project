export function getCurrentDateString() {
  return new Date().toISOString().slice(0, 19).replace("T", " ")
}