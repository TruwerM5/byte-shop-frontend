export function slugifyString(key: string) {
    return key.split(' ').join('-');
}
