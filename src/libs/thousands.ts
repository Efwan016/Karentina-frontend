type TLocales = "en-US" | "id_ID"

// eslint-disable-next-line-no-unused-var

interface Number {
    thousands(locales? : TLocales): string
}

Number.prototype.thousands = function (locales: TLocales): string {
    return new Intl.NumberFormat(locales || "id-ID").format(Number(this));
};