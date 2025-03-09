export function toCamelCase(word: string) {
  if (!word) return word;
  return word[0].toUpperCase();
}
