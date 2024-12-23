<script lang="ts">
  import { Circles } from "./circles";
  import { scroll } from "motion";
  import { animate } from "motion/mini"


  let canvas:HTMLCanvasElement
  let circles: Circles

  let overlay: HTMLDivElement
  let activateScroll = false

  function onReady(){
    animate(overlay, { opacity: 0 }, { duration: 1 })
    .then(() => {
      activateScroll = true
    })
  }

  $effect(() => {
    circles = new Circles(canvas, onReady)
  })

  let offscreen = $state(false)
  $effect(() => {
    if(!offscreen && circles && circles.paused){
      circles.play()
    }

    if(offscreen && circles && !circles.paused){
      circles.pause()
    }
  })

  $effect(() => {
    scroll((_, info) => {

      if(!activateScroll) return;

      if(!info.y.current){
        overlay && overlay.style.setProperty('opacity', '0')
        if(offscreen) offscreen = false
      }
  
      else if(info.y.current >= window.innerHeight){
        if(offscreen) return;
        offscreen = true
        overlay && overlay.style.setProperty('opacity', '1')
      }
  
      else {
        if(offscreen) offscreen = false 
        overlay && overlay.style.setProperty(
          'opacity', `${1 - ((window.innerHeight - info.y.current) / window.innerHeight)}`
        ) 
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

