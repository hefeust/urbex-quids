export class QUID {
    constructor(salt_phrase?: string);
    initialize(salt_phrase: any): void;
    reset(): void;
    next(is_free_test?: (qtest: any) => boolean): string;
    raw_next(): {
        values: any;
        hexits: string;
        toString: () => string;
    };
    _toHexaString([q1, q2, q3, q4]: [any, any, any, any]): string;
}
