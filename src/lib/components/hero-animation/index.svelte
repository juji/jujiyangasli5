<script lang="ts">

  /* 
  for hero animation 
  we set animation based on screen size
  and fps
  */

  // import Sign from './sign.svelte';
  import { isSafariOrWebkit } from '$lib/modules/safari';

  let importPromise: Promise<any> | null = $state(null)
  let goodInterval = 1000 / 60 // 60 fps
  let windowSizeLimit = 1366
  let module: 'circular' | 'grainy-thing' | null = $state(null)
  let sign: string = $state('')
  
  $effect(() => {
    if(module === 'circular'){
      importPromise = import('$lib/components/circular/index.svelte')
    }else if(module === 'grainy-thing'){
      importPromise = import('$lib/components/grainy-thing/index.svelte')
    }
  })

  const getRepaintInterval = () => {
    const p: Promise<number> = new Promise((resolve) => {
      requestAnimationFrame((t1) => {
        requestAnimationFrame((t2) => {
          resolve(t2 - t1);
        });
      });
    })
    return p
  };

  // get average repaint interval
  async function calcRepaintInterval(){
    const r1 = await getRepaintInterval()
    const r2 = await getRepaintInterval()
    const r3 = await getRepaintInterval()
    const r4 = await getRepaintInterval()
    const r5 = await getRepaintInterval()
    return (r1 + r2 + r3 + r4 + r5) / 5
  }

  function onWindowResize(){
    
    console.log('calculating window size and fps')

    if(Math.max(window.innerWidth, window.innerHeight) <= windowSizeLimit){

      if(module === 'circular') return;
      sign = 'window size is small, using "circular"'
      module = 'circular'
      return;

    }

    if(isSafariOrWebkit().usesSafariWebKit){
      if(module === 'circular') return;
      sign = 'browser detected, using "circular"'
      module = 'circular'
      return;
    }

    calcRepaintInterval().then((n: number) => {

      console.log('repaint interval', n)
      if(n <= goodInterval){

        if(module === 'grainy-thing') return;
        sign = 'fps calc shows 💛, using "blob"'
        module = 'grainy-thing'

      }else if(module !== 'circular'){

        sign = 'fps calc done, using "circular"'
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
    // debounceWindowResize()
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

