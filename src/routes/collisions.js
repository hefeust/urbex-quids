


const PARTS = 4
const BSIZE = 64
const COUNT = 128

function bucket_gashcode (quid) {
    const parts = []
    
    for (const byte of quid.values) {
        const part = Math.floot (byte / PARTS)
        
        parts.push (part)
    }
    
    return parts.join ('')
}

const scores = new Map ()

let oldie = '0000'
let newly = '0000'

function bucket_score (quid) {
    const newly = bucket_hashcode (quid)
    const s_key = `${oldie}:${newly}`
    const score = scores.get (s_key) || 0
    
    scores.set (s_key, 1 + s) 
}

function scoring () {
    const results = []
    
    for (let oidx = 0; oidx < COUNT; oidx++) {
        for (let nidx = 0; nidx < COUNT; nidx++) {
            const hex_o = oidx.toString (PARTS)
            const hex_n = nidx.toString (PARTS)
            const s_key = `${hex_o}:${hex_n}`
            const score = scores.get (s_key) || 0            

            results.push (score)
        }    
    }

    return results
}
