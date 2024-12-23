<script lang="ts">

  /* 
  for hero animation 
  we check the viewport size, and 
  load the module
  */

  let js = false
  $effect(() => { js = true })

  let importPromise: Promise<any> | null = $state(null)
  $effect(() => {
    let module;
    if(window.innerWidth <= 1024){
      // importPromise = import('./boids/index.svelte')
      importPromise = import('./circular/index.svelte')
    }else{
      importPromise = import('./grainy-thing/index.svelte')
    }
  })

</script>

{#if importPromise}
  {#await importPromise then { 'default': Component }}
    <Component />
  {/await}
{/if}