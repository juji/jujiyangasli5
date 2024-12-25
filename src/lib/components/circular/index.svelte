<script lang="ts">
  import { Circles } from "./circles";
  import { scroll } from "motion";
  import { animate } from "motion/mini"


  let canvas:HTMLCanvasElement
  let circles: Circles | null = $state(null)

  let overlay: HTMLDivElement
  let activateScroll = $state(false)

  function onReady(){
    animate(overlay, { 
      opacity: Math.min(1, 1 - ((window.innerHeight - window.scrollY) / window.innerHeight))
    }, { duration: 1 })
    .then(() => { activateScroll = true })
  }

  $effect(() => {
    circles = new Circles(canvas, onReady)
  })

  $effect(() => {
    // this results in better performance
    window.addEventListener('scroll',(e: Event) => {
      circles && circles.scroll(window.scrollY)
    })
  })

  $effect(() => {
    const hMult = 1.5

    scroll((_, info) => {

      if(!activateScroll) return;

      // circles && circles.scroll(info.y.current)

      if(!info.y.current){
        overlay && overlay.style.setProperty('opacity', '0')
        circles && circles.paused && circles.play()
      }
  
      else if(info.y.current >= (window.innerHeight * hMult)){
        if(circles && circles.paused) return;
        overlay && overlay.style.setProperty('opacity', '1')
        circles && !circles.paused && circles.pause()
      }
  
      else {
        overlay && overlay.style.setProperty(
          'opacity', `${1 - (((window.innerHeight * hMult) - info.y.current) / (window.innerHeight * hMult))}`
        )
        circles && circles.paused && circles.play()
      }
    })
  })

</script>


<canvas class="circularcanvas" bind:this={canvas}></canvas>
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

