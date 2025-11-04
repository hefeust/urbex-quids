export class CycloTwistMWC {
    constructor({ a_mul, b_mod, r_lag }: {
        a_mul: any;
        b_mod: any;
        r_lag: any;
    });
    initialize(salt_phrase?: string): void;
    set coeffs({ value, carry }: {
        value: any;
        carry: any;
    });
    get coeffs(): {
        value: any;
        carry: any;
    };
    next(): any[];
    cycle(): void;
    twist(): void;
    toString(): string;
}
