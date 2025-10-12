export default function beautifyPrice(price: number) {
    let rest = `${price % 1000}`;

    while (rest.length < 3) {
        rest += '0';
    }
    return `${(Math.floor(price / 1000))} ${rest}`;
}
