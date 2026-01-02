export function slugifyString(key: string): string {
  return key.split(' ').join('-');
}
