const decimalSep = ',';

export const Format = {
    decimal(v: number, decPlaces: number = 2) {
        return Number(v).toFixed(decPlaces).replace('.', decimalSep);
    },
    date(d: string | Date) {
        if (typeof d === 'string' || d instanceof String) {
            return d.substring(0, 10);
        }
        else if (d instanceof Date) {
            return d.toLocaleDateString("sv-SE");
        }
        return '';
    },
    string(text: string, params: any) {
        if (!params) return text;
        for (let key of Object.keys(params)) {
            text = text.replace(new RegExp("{" + key + "}", "gi"), params[key]);
        }
        return text;
    }

}