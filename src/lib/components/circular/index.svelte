<script lang="ts">
  import { Circles } from "./circles";
  import { scroll } from "motion";
  import { animate } from "motion/mini"


  let canvas:HTMLCanvasElement
  let circles: Circles | null = $state(null)

  let overlay: HTMLDivElement
  let activateScroll = $state(false)
  let paused = $state(false)

  function onReady(){
    animate(overlay, { 
      opacity: Math.min(1, 1 - ((window.innerHeight - window.scrollY) / window.innerHeight))
    }, { duration: 1 })
    .then(() => { activateScroll = true })
  }

  $effect(() => {
    circles = new Circles(canvas, onReady)
    return () => {
      circles?.terminate()
      circles = null
    }
  })

  $effect(() => {
    const hMult = 1.5

    if(!activateScroll) return;

    // scroll overlay's opacity
    const overlayCancel = scroll(
      animate(
        overlay,
        { opacity: [ 0, 1 ] }
      ), 
      { offset: [ 0, `${100 * hMult}vh` ]}
    )

    const canvasCancel = scroll(
      animate(
        canvas,
        { transform: [
          'translateY(0)',
          'translateY(-200px)'
        ] }
      ), 
      { offset: [ 0, `${100 * hMult}vh` ]}
    )

    const timelineCancel = scroll((_, info) => {

      if(
        info.y.current >= (window.innerHeight * hMult)
      ) {
        paused = true
      }

      else {
        paused = false
      }

    })

    return () => {
      overlayCancel()
      canvasCancel()
      timelineCancel()
    }
  })

  $effect(() => {
    if(paused) circles && !circles.paused && circles.pause()
    else circles && circles.paused && circles.play()
  })

</script>


<canvas class="circularcanvas" bind:this={canvas} class:paused></canvas>
<div class="overlay" bind:this={overlay}></div>


<style>

  canvas.circularcanvas{
    position: fixed;
    width: 100%;

    
    left: 0;
    z-index: 0;
    pointer-events: none;
    
    /* anchor to bottom */
    height: 100lvh;
    bottom: 0;

    @supports (-webkit-touch-callout: none) {
     /* CSS specific to iOS devices */ 
     bottom: unset;
     top: 0;
    }

    &.paused{
      display: none;
    }
  }

  .overlay{
    position: fixed;
    width: 100%;
    
    left: 0;
    z-index: 1;
    background: black;
    pointer-events: none;

    /* anchor to bottom */
    height: 100lvh;
    bottom: 0;
    
    @supports (-webkit-touch-callout: none) {
     /* CSS specific to iOS devices */ 
     bottom: unset;
     top: 0;
    }
  }


</style>

