<script lang="ts">

  /* 
  for hero animation 
  we set animation based on screen size
  and fps
  */

  import { isSafariOrWebkit } from '$lib/modules/safari';

  let importPromise: Promise<any> | null = $state(null)
  let windowSizeLimit = 1366
  let module: 'circular' | 'grainy-thing' | null = $state(null)

  let { hasGoodFps }:{ hasGoodFps: boolean | null } = $props()
  
  $effect(() => {
    if(module === 'circular'){
      importPromise = import('$lib/components/circular/index.svelte')
    }else if(module === 'grainy-thing'){
      importPromise = import('$lib/components/grainy-thing/index.svelte')
    }
  })

  function onWindowResize(){

    if(Math.max(window.innerWidth, window.innerHeight) <= windowSizeLimit){

      if(module === 'circular') return;
      module = 'circular'
      return;

    }

    const safari = isSafariOrWebkit()
    if(safari.usesSafariWebKit || safari.isSafari || safari.isIOS){
      if(module === 'circular') return;
      module = 'circular'
      return;
    }

    // maybe wait for fps?
    // local testing says i don't have to
    // but still
    let int = setInterval(() => {
      if(hasGoodFps === null) return;
      clearInterval(int)

      if(hasGoodFps){
        if(module === 'grainy-thing') return;
        module = 'grainy-thing'
      }else if(module !== 'circular'){
        module = 'circular'
      }
    }, 300 )

  }

  let to: number = 0
  function debounceWindowResize(){
    if(to) clearTimeout(to)
    to = setTimeout(() => {
      onWindowResize()
    },500)
  }

  // start
  $effect(() => {
    // set timeout to let fps counter finishes
    setTimeout(() => onWindowResize(),500)
    window.addEventListener('resize', debounceWindowResize)
    return () => {
      window.removeEventListener('resize', debounceWindowResize)
    }
  })
  
</script>

{#if importPromise}
  {#await importPromise then { 'default': Component }}
    <Component />
  {/await}
{/if}

<!-- <Sign content={sign} /> -->

