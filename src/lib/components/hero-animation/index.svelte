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

  let { 
    hasGoodFps 
  }:{ 
    hasGoodFps: Promise<boolean>
  } = $props()
  
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
    hasGoodFps.then(good => {
      if(good){
        if(module === 'grainy-thing') return;
        module = 'grainy-thing'
      }else if(module !== 'circular'){
        module = 'circular'
      }

    })

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
    onWindowResize()
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

