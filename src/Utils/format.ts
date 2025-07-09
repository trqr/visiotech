export function numberFormat(value: number): string {
    if (value == null) return "";
    if (value > 1000000 ){
        return `${(value/1000000).toFixed(1)}M`
    }
    return value.toString();
}