<script lang="ts">
  import { Circles } from "./circles";
  import { scroll } from "motion";
  import { animate } from "motion/mini"


  let canvas:HTMLCanvasElement
  let circles: Circles | null = $state(null)

  let overlay: HTMLDivElement
  let activateScroll = $state(false)

  function onReady(){
    if(!window.scrollY){
      animate(overlay, { opacity: 0 }, { duration: 1 })
      .then(() => { activateScroll = true })
    }else{
      activateScroll = true
    }
  }

  $effect(() => {
    circles = new Circles(canvas, onReady)
  })

  $effect(() => {
    scroll((_, info) => {

      if(!activateScroll) return;

      if(!info.y.current){
        overlay && overlay.style.setProperty('opacity', '0')
        circles && circles.paused && circles.play()
      }
  
      else if(info.y.current >= window.innerHeight){
        if(circles && circles.paused) return;
        overlay && overlay.style.setProperty('opacity', '1')
        circles && !circles.paused && circles.pause()
      }
  
      else {
        overlay && overlay.style.setProperty(
          'opacity', `${1 - ((window.innerHeight - info.y.current) / window.innerHeight)}`
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
    height: 100lvh;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .overlay{
    position: fixed;
    width: 100%;
    height: 100lvh;
    top: 0;
    left: 0;
    z-index: 1;
    background: black;
  }

</style>

