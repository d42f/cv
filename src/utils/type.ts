export const isObject = (value: unknown): value is object => typeof value === 'object';

export const isNull = (value: unknown): value is null => isObject(value) && !value;
