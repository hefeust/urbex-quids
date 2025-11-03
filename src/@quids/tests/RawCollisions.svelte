
<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { QUID } from '../QUID.js'
    
    const qgen = new QUID ('#test!')
    const scores = new Map ()

    let loop_idx = $state (0)

    let ival
    
    onMount (() => {
        ival = setInterval (() => {
//            items = []
            
            for (let i = 0; i < 16384; i++) {
                const quid = qgen.next (q => true)
                const hkey = quid.toString ()
                const hits = scores.get (hkey) || 0
                    scores.set (hkey, 1 + hits)
            }
            
            loop_idx++
            
        }, 10)

    })
    
    onDestroy (() => {
        return () => clearInterval (ival)
    })
    
    let counts = $derived.by (() => {
        let count = 0
    
            for (const key of [...scores.keys ()]) {
                const s = scores.get (key) || 0
                
                count += s
            }

        return count
    })

</script>

<h1> QUID Raw Collisions Test </h1>

<pre>
    loop index: { loop_idx } * 1000;

        number of { counts };

</pre>

<style>
    pre {
        width: 100vw;
        white-space: pre-wrap;
        word-wrap; break-word;
    }
</style>