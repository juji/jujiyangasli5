<script lang="ts">

  /* 
  for hero animation 
  we set animation based on screen size
  */

  let importPromise: Promise<any> | null = $state(null)
  
  $effect(() => {
    if(Math.max(window.innerWidth, window.innerHeight) <= 1024){
      importPromise = import('$lib/components/circular/index.svelte')
    }else{
      importPromise = import('$lib/components/grainy-thing/index.svelte')
    }
  })
  
</script>

{#if importPromise}
  {#await importPromise then { 'default': Component }}
    <Component />
  {/await}
{/if}