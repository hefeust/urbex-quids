
<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { QUID } from '@quids/QUID.js'
    
    const qgen = new QUID ('#test!')

    let ival
    let items = []
    
    onMount (() => {
        ival = setInterval (() => {
            items = []
            
            for (let i = 0; i < 1000; i++) {
                const quid = qgen.next (q => true)
                
                items.push (quid.toString ())
            }
        }, 1000)
    })
    
    onDestroy (() => {
        return () => clearInterval (ival)
    })
</script>

<h1> QUID Collisions Test </h1>

<pre>
    { items.join (', ')}
</pre>

<style>
    pre {
        width: 100vw;
        white-space: pre-wrap;
        word-wrap; break-word;
    }
</style>