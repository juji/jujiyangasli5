<script lang="ts">

  /* 
  for hero animation 
  we check the viewport size, and 
  load the module
  */



  let importPromise: Promise<any> | null = $state(null)
  $effect(() => {
    if(window.innerWidth <= 1024){
      importPromise = import('./grainy-thing/index.svelte')
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