
<script lang="ts">
    import '../app.css'

    const LINKS = {
        '/': 'Table of contents',
        '/01-raw-collisions': '/01-raw-collisions',
        '/02-bucket-impacts': '02. Bucket impacts',        
    }    

    let { children } = $props ()
    
</script>

<ul>
    {#each Object.keys (LINKS) as url }
        <li>
            <a href={ url }> { LINKS[url] } </a>
         </li>
    {/each}
</ul>


{@render children () }

<style>

    
    a { 
        color: orange;
    }
</style>