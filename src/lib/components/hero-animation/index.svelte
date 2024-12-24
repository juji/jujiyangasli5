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
    if(
      window.innerWidth <= 1024 ||
      window.innerWidth > 1920
    ){
      importPromise = import('../circular/index.svelte')
    }else{
      importPromise = import('../grainy-thing/index.svelte')
    }
  })

</script>

{#if importPromise}
  {#await importPromise then { 'default': Component }}
    <Component />
  {/await}
{/if}