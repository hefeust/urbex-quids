
# QUID keys generator

Quasi-Unique IDentifiers (QUIDs) hexadecimal string key pseudo-random number generator for the UREX project. Work-In-Progress.

Produces 8-characters length (morethan 4.27 * 10*9 possible keys)  for JS/TS Map  indexation.

## read more...

Please visit the article [Playinng with QUIDs](https://dev.to/hefeust/playing-with-quid-string-keys-3fjk) on dev.to forum for more informations.

## Installation as (n)npm package from github repository:

    pnpm install hefeust/urbex-quids


## Usage

    import { QUID } from 'urbex-quids'

    // either with a chaeacter salting phrase:    
    const keysgen = new QUID ('#test!')
    
    // ... or with custom time-based one  (less predictible)
    const keysgen = new QUID (Date.now ().toString (16))

    // user storage
    const m = new Map ()
    
    for (let i = 0; i < 10 * 1000; i++) {
        // available (free) of key callback
        // Mapsare O(1) complexity (constant time)
        // loops while collisions detected
        const quid = keysgen.next ((test_quid) => {
            false === m.has (test_quid)
        })
        
        m.set (quid.toString (), quid.values)
    }    
    
## Demo mode

As a tniy SvelteKit project: clone the repo, open web browser, then run in terminal:

    pnpm run dev --open
    
    





