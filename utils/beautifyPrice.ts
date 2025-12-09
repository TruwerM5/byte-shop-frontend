export function beautifyProductPrice(price: number) {
    let rest = `${price % 1000}`;

    while (rest.length < 3) {
        rest += '0';
    }
    return `${Math.floor(price / 1000)} ${rest}`;
}

export function beutifyFilterInputPrice(price: string) {
    if (price.length <= 3) {
        return price
            .split('')
            .filter((l) => !isNaN(Number(l)))
            .join('');
    }
    let rest = `${Number(price) % 1000}`;
    while (rest.length < 3) {
        rest += '0';
    }
    return `${Math.floor(Number(price) / 1000)} ${rest}`;
}
