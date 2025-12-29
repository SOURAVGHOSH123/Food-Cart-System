export function truncate(text, limit = 10) {
   return text.length > limit ? text.slice(0, limit) + "..." : text;
}