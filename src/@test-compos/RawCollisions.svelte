
<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { QUID } from '@quids/QUID.js'
    
    const MAX = 128 * 128
    const qgen = new QUID ('#test!')
    const scores = new Map ()

    let loop_idx = $state (0)

    let ival
    
    onMount (() => {
        ival = setInterval (() => {
//            items = []
            
            for (let i = 0; i < MAX; i++) {
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

        return count - scores.size
    })

</script>

<h1> QUID Raw Collisions Test </h1>

<pre>
    loop index: { loop_idx } * { MAX } = { loop_idx * MAX };

        number of hits { counts } 
        ratio: { (counts/(loop_idx*MAX)).toFixed (3) };

</pre>

<style>
    pre {
        width: 100vw;
        white-space: pre-wrap;
        word-wrap; break-word;
    }
</style>