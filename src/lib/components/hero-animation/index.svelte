<script lang="ts">

  /* 
  for hero animation 
  we set animation based on screen size
  and fps
  */

  let importPromise: Promise<any> | null = $state(null)
  let goodInterval = 1000 / 60 // 60 fps
  let windowSizeLimit = 1366
  let module: 'circular' | 'grainy-thing' | null = $state(null)
  let sign: string = $state('')
  let js = $state(false)

  $effect(() => { js = true })
  
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

  function showSign(str: string){
    signElm && signElm.classList.remove('fadeOut')
    signElm && signElm.classList.remove('off')
    sign = str
  }

  // fade out sign
  $effect(() => {
    if(sign && signElm){
      setTimeout(() => {
        signElm && signElm.classList.add('fadeOut')
        setTimeout(() => {
          signElm && signElm.classList.add('off')
        },6500)
      },500)
    }
  })

  let signElm: HTMLElement | null = $state(null);
  function onWindowResize(){
    
    console.log('calculating window size and fps')

    if(Math.max(window.innerWidth, window.innerHeight) <= windowSizeLimit){

      if(module === 'circular') return;
      showSign('window size is small, use "circular"')
      module = 'circular'
      return;

    }

    calcRepaintInterval().then((n: number) => {

      console.log('repaint interval', n)
      if(n <= goodInterval){

        if(module === 'grainy-thing') return;
        showSign('fps calc shows 💛, using "blob"')
        module = 'grainy-thing'

      }else if(module !== 'circular'){

        showSign('fps calc done, using "circular"')
        module = 'circular'

      }

    })
  }

  // start
  $effect(() => {
    onWindowResize()
    window.addEventListener('resize',onWindowResize)
    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  })
  
</script>

{#if importPromise}
  {#await importPromise then { 'default': Component }}
    <Component />
  {/await}
{/if}


{#if sign && js}
  <div bind:this={signElm} class="sign">
    <span>{sign || 'Checking environment'}</span>
  </div>
{/if}

<style>
  .sign{
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    opacity: 1;
    font-size: 0.9rem;
    transition: 
      opacity 500ms ease-out 6s
    ;

    span{
      background-color: #1fc31f;
      color: black;
      padding: 0.5rem 1rem;
      display: inline-block;
    }

    :global(&.fadeOut){
      opacity: 0;
    }

    :global(&.off){
      display: none;
    }
  }
</style>