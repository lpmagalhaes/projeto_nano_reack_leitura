export function converterTimestamp(valor) {
    const data = new Date(valor);
    return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}-${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
}