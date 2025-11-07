
const SYM_CONF = Symbol ('conf')
const SYM_DATA = Symbol ('data')

export class CycloTwistMWC {

    constructor ({ a_mul, b_mod, r_lag, size }) {
        this [SYM_CONF] = {
            a_mul, b_mod, r_lag, size
        }
        
        this [SYM_DATA] = {
            cidx: 0,
            vidx: r_lag,
            nums: Array (2 * (2 * size) + r_lag).fill (Math.floor (b_mod / 2))
        }
        
        this.resalt ('#test!')
    }
    
    resalt (salt_phrase) {
        const { a_mul, b_mod, r_lag, size } = this [SYM_CONF]
        const data = this [SYM_DATA]

        for (let i = 0; i < salt_phrase.length; i++) {
            const k = salt_phrase.charCodeAt (i)

            data [data.cidx] = k
            data [data.vidx] = b_mod - k
            
            this.cycle ()
        }
        
        console.log ('' + this)        
    }
    
    next () {
        const { a_mul, b_mod, r_lag, size } = this [SYM_CONF]
        const data = this [SYM_DATA]
        const value = data.nums [data.vidx]
        const carry = data.nums [data.cidx]
        const output = new Array (size)
        
        const lin = (a_mul * value + carry)
        const mod = lin % b_mod
        const sub = lin - mod
        const div = sub / b_mod
        
        data.nums [data.vidx] = mod
        data.nums [data.cidx] = div

        for (let off = 0; off < size; off++) {
            output [off] = data.nums [off]
        }
        
        return output
    }
       
    cycle () {
        const { a_mul, b_mod, r_lag, size } = this [SYM_CONF]
        const data = this [SYM_DATA]    

        data.vidx = (data.vidx + r_lag) % data.nums.length
        data.cidx = (data.cidx + r_lag) % data.nums.length 
    }
    
    twist () {
        const { a_mul, b_mod, r_lag, size } = this [SYM_CONF]
        const data = this [SYM_DATA]        
        const temp = daa.vidx
        
        data.vidx = data.cidx
        data.cidx = temp
    }
    
}