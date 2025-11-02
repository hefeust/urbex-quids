
const SAFE_CONF = Symbol.for ('SAFE_CONF')
const SAFE_DATA = Symbol.for ('SAFE_DATA')

export class CycloTwistMWC {

    constructor ({ a_mul, b_mod, r_lag }) {
        Object.defineProperty (this, SAFE_CONF, {
            get: () => {
                return {
                    a_mul, b_mod, r_lag
                }
            }
        })
        
        let size = 2 * r_lag + 1
        let numbers = new Array (size).fill (131)
        let carries = new Array (size).fill (0)
        let vidx = r_lag
        let cidx = 0
        let wave = 0
        
        Object.defineProperty (this, SAFE_DATA, {
            value: {
                numbers, carries, size, vidx, cidx, wave
            }
        })
    }
    
    initialize (salt_phrase = '#test-mwc-twister!') {
        console.log ({ salt_phrase })
    
        for (let i = 0; i < salt_phrase.length; i++) {
            const k = salt_phrase.charCodeAt (i)
            
            console.log (k)
            
            this.coeffs = { value: k, carry: 0 }
            this.cycle ()
        }
        
        console.log ('' + this)
    }
    
    set coeffs ({ value, carry }) {
        const data = this [SAFE_DATA]  

//          console.log ('set coeffs: ' + value + ' ' + carry)

        data.numbers [data.vidx] = value
        data.carries [data.cidx] = carry            
        
    }
    
    get coeffs () {
        const data = this [SAFE_DATA]  

        return {
            value: data.numbers [data.vidx],
            carry: data.carries [data.cidx]
        }
    }
    
    next () {
        const conf = this [SAFE_CONF]
        const data = this [SAFE_DATA]
        const { a_mul, b_mod, r_lag } = conf
        const { value, carry } = this.coeffs

        const s = a_mul * value + carry
        const v = s % b_mod
        let d = s - v
        let q = d / conf.b_mod
        let idx = 0
        
        do {
            if (q < conf.b_mod) {
                break
            } else {
                d -= q * conf.b_mod
                q /= conf.b_mod
            }
        } while (idx++ < conf.r_lag)
        
      
        this.coeffs = {
            value: v, carry: Math.floor(q)
        }       
     
        this.cycle ()   
        this.twist ()
        
        const output = []

        for (let offset = 0; offset < conf.r_lag; offset++) {
            const nidx = data.vidx + conf.r_lag * (offset + data.cidx) 
        
            output.push (data.numbers [nidx % conf.r_lag])
        }
        
        return output
    }
    
    cycle () {
        const conf = this [SAFE_CONF]
        const data = this [SAFE_DATA]

        data.vidx = (data.vidx + conf.r_lag) % data.size
        data.cidx = (data.cidx + conf.r_lag) % data.size
    }
    
    twist () {
        const { value, carry } = this.coeffs       
        if (value === 0) {
            this.coeffs = {
                value: carry,
                carry: value
            }
        }
    }
    
    toString () {
        const texts = []
        const data = this [SAFE_DATA]

        texts.push ('[[' + data.numbers.join (", ") + ']]')
        texts.push ('[[' + data.carries.join (", ") + ']]')        
        
        return texts.join ('\n')       
    }
}