// @target: esnext

declare const strings: Record<string, string>;
declare const symbols: Record<symbol, string>;

const o1 = { a: 1, ...strings };
const o2 = { [Symbol.iterator]: 1, ...strings };
const o3 = { [Symbol.iterator]: 1, ...symbols };
