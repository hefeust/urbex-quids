
import { CycloTwistMWC } from './CycloTwistMWC.js'

const SAFE_MWC = Symbol.for ('safe-mwc')

export class QUID {

    constructor (salt_phrase = '#test-quid!') {
        const mwc = new CycloTwistMWC({
                a_mul: 147,
                r_lag: 3,
                b_mod: 256,
                size: 4
            })
    
        Object.defineProperty (this, SAFE_MWC, {
            value: mwc
        })
        
        mwc.resalt (salt_phrase)
    }
    
    reset () {}

    next (is_free_test = (qtest) => true) {
        const mwc = this [SAFE_MWC] 
        const LIMIT = 11
        let counter = 0
   
        do {
            const quid_str = this.raw_next ().toString ()

            if (is_free_test (quid_str)) {
                mwc.cycle ()
            
                return quid_str
            } else {
                mwc.twist ()
            }
        } while (counter++ < LIMIT)
        
        throw new Error ('#TOO_MUCH_COLLISIONS!')
    }

    raw_next () {
        const mwc = this [SAFE_MWC] 
        const values = mwc.next ()
        const hexits = this._toHexaString (values)        

        mwc.cycle ()

        return {
            values, 
            hexits,
            toString: () => hexits
        }
    }

   _toHexaString ([q1, q2, q3, q4]) {
        const values = [q1, q2, q3, q4]
        let str = ''
        
        for (const value of values) {
            const hexa = value.toString (16).padStart (2, 0)
        
            str += hexa
        }
    
        return str
    }
    
}