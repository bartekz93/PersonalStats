const decimalSep = ',';

export const Format = {
    decimal(v: number, decPlaces: number = 2) {
        return Number(v).toFixed(decPlaces).replace('.', decimalSep);
    },
    date(d: string) {
        return d.substring(0, 10);
    },
    string(text: string, params: any) {
        if (!params) return text;
        for (let key of Object.keys(params)) {
            text = text.replace(new RegExp("{" + key + "}", "gi"), params[key]);
        }
        return text;
    }

}