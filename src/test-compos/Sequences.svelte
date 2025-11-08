
<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { QUID } from '$lib'
    
    const qgen = new QUID (Date.now ().toString (16))
//    const qgen = new QUID ('#test!')

    let ival
    let items = []
    let loop_idx = 0
    
    onMount (() => {
        ival = setInterval (() => {
            items = []
            
            for (let i = 0; i < 100; i++) {
                const quid = qgen.next (q => true)
                
                items.push (quid.toString ())
            }
            
            loop_idx++
        }, 1000)
    })
    
    onDestroy (() => {
        return () => clearInterval (ival)
    })
</script>

{#snippet draw_quid (quid) }
    <div class="quid-viewer">
        <div class="quid-gradient">
            <div class="quid-circle" style={ `background-color: #${ quid };` }>
                &nbsp;
            </div>
        </div>
        <div class="quid-refs"> { quid } </div>
    </div>
{/snippet}

<h1> QUIDs sequence test </h1>

<p> trail number { loop_idx } </p>

<div class="items">
    {#each items as quid}
        {@render draw_quid (quid) }
    {/each}
</div>

<style>
    div.items {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
    }
    
    div.quid-viewer {
        display: grid;
        align-items: center;
        justify-content: center;        
        grid-template-columns: 1fr;
        grid-template-rows: 3fr 1fr;     
        background-color: darkslateblue;
        padding: 0.25em;
        margin: 0.25em;
        border-radius: 5%;
        border: 1px solid darkorange;
    }
    
    div.quid-gradient {
        width: 50%;
        justify-self: center;
        padding: 0.5vh;
        background: linear-gradient(black, black, grey, white, white);
    }
    
    div.quid-circle {
        justify-self: center;    
        width: 5vh; 
        height: 5vh;
        border: 3px solid grey;
        border-radius: 50%;
    }
    
    div.quid-refs {
        font-weight: bold;
        font-family: sans;

    }
</style>