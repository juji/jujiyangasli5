<script lang="ts">
  // LCP issues by displaying log
  // removing log instead
	// import { globalState } from '$lib/modules/global.svelte';

  /* 
  for hero animation 
  we set animation based on screen size
  and fps
  */

  // import Sign from './sign.svelte';
  import { isSafariOrWebkit } from '$lib/modules/safari';
  import { globalState } from '$lib/modules/global.svelte';
  import type { FpsMonitorListenerParams } from '$lib/modules/fps-monitor';

  let importPromise: Promise<any> | null = $state(null)
  let windowSizeLimit = 1366
  let module: 'circular' | 'grainy-thing' | null = $state(null)
  
  $effect(() => {
    if(module === 'circular'){
      importPromise = import('$lib/components/circular/index.svelte')
    }else if(module === 'grainy-thing'){
      importPromise = import('$lib/components/grainy-thing/index.svelte')
    }
  })

  // add fps listener
  let fps: FpsMonitorListenerParams | null = null
  $effect(() => {

    const listener = (e: Event) => {
      const ev = e as CustomEvent<FpsMonitorListenerParams>
      fps = ev.detail
    }

    globalState.fpsEvent.addEventListener('fps', listener)
    return () => {
      globalState.fpsEvent.removeEventListener('fps', listener)
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
    setTimeout(() => {
      if(fps?.isGoodInterval){
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

