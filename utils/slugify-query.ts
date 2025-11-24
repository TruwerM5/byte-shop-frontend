export function slugifyString(key: string) {
    return key.toLowerCase().split(' ').join('-');
}