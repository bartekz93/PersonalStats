const decimalSep = ',';

export const Format = {
    decimal(v: number, decPlaces: number = 2) {
        return Number(v).toFixed(decPlaces).replace('.', decimalSep);
    },
    string(text: string, params: any) {
        if (!params) return text;
        for (let key of Object.keys(params)) {
            text = text.replace(new RegExp("{" + key + "}", "gi"), params[key]);
        }
        return text;
    }

}