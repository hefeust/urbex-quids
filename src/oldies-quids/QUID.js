
import { CycloTwistMWC } from './CycloTwistMWC.js'

const SAFE_MWC = Symbol.for ('safe-mwc')

export class QUID {

    constructor (salt_phrase = '#test-quid!') {
        Object.defineProperty (this, SAFE_MWC, {
            value: new CycloTwistMWC({
                a_mul: 247,
                r_lag: 4,
                b_mod: 256
            })
        })
        
        this.initialize (salt_phrase)
    }

    initialize (salt_phrase) {
        const mwc = this [SAFE_MWC] 
        
        console.log ({  mwc })
        
        mwc.initialize (salt_phrase)
    }
    
    reset () {}

    next (is_free_test = (qtest) => true) {
        const LIMIT = 11
        let counter = 0
   
        do {
            const quid_str = this.raw_next ().toString ()
            
            if (is_free_test (quid_str)) {
                return quid_str
            }
        } while (counter++ < LIMIT)
        
        throw new Error ('#TOO_MUCH_COLLISIONS!')
    }

    raw_next () {
        const mwc = this [SAFE_MWC] 
        const values = mwc.next ()
        const hexits = this._toHexaString (values)        

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