const decimalSep = ',';

export const Format = {
    decimal(v: number, decPlaces: number = 2) {
        return Number(v).toFixed(decPlaces).replace('.', decimalSep);
    }
}