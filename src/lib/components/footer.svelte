<script lang="ts">
  import Contact from '$lib/components/contact/index.svelte'
  import Container from '$lib/components/container.svelte'

  let footer:HTMLElement

  // for experiment,
  // lets try using an object instead of state
  const vars = {
    started: false,
    deltaAlpha: 0,
    minAlpha: 0.1,
    delta: 0.03  * .7,
    timeEffect: 0.99
  }
  
  function addOffset( ratio = 1 ){

    vars.deltaAlpha += vars.delta * ratio

    if(!vars.started) {
      vars.started = true
      start()
    }
  }

  $effect(() => {
    
    window.addEventListener('wheel',(e: WheelEvent) => {
      if(
        e.deltaY < 0 ||
        window.scrollY <
        (document.body.offsetHeight - window.innerHeight)
      ) return;
      addOffset()
    })

    window.addEventListener('touchstart', (init: TouchEvent) => {
      if(
        window.scrollY <
        (document.body.offsetHeight - window.innerHeight - 200) // 200 is est. adressbar
      ) return;

      const initY = init.touches[0].clientY
      const onPointerMove = (e: TouchEvent) => {
        if(e.touches[0].clientY < initY) addOffset( 0.3 )
      }
      const onPointerUp = (e: TouchEvent) => {
        window.removeEventListener('touchmove', onPointerMove)
        window.removeEventListener('touchend', onPointerUp)
        window.removeEventListener('touchcancel', onPointerUp)
      }
      window.addEventListener('touchmove', onPointerMove)
      window.addEventListener('touchend', onPointerUp)
      window.addEventListener('touchcancel', onPointerUp)
    })
  })

  let rid:number | null = null;
  function start(){
    rid = requestAnimationFrame(function anim(){
      if(!vars.started) return;
      if(!footer) return;

      // draw
      footer.style.setProperty(
        'background',
        `radial-gradient(
          ellipse at 40% 100%,
          rgb(0 255 0 / ${vars.minAlpha + vars.deltaAlpha}) 0%,
          rgb(0 0 0 / 0) 100%
        ), rgb(from var(--background-color) r g b / 0.2)`
      )
        
      // done
      if(!vars.deltaAlpha) {
        vars.started = false
        return;
      }

      // set & loop
      vars.deltaAlpha *= vars.timeEffect
      if(vars.deltaAlpha <= 0.001) vars.deltaAlpha = 0
      rid = requestAnimationFrame(anim)
    })
  }

  $effect(() => {
    return () => {
      if(rid) cancelAnimationFrame(rid)
    }
  })

</script>


<footer bind:this={footer}>
  <Container>
    <Contact />
  </Container>
</footer>

<style>
  footer{
    position: relative;
    padding: 2rem 0;
    border-top: 1px solid var(--border-color);
    z-index: 2;
    background: 
      radial-gradient(
        ellipse at 40% 100%,
        rgb(0 255 0 / 0.1) 0%,
        rgb(0 0 0 / 0) 100%
      ), rgb(from var(--background-color) r g b / 0.2);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
</style>