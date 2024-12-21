<script lang="ts">

  import { Renderer } from "./threads/renderer";
  import { scroll } from "motion";

  let canvas: HTMLCanvasElement
  let overlay: HTMLDivElement
  let renderer: Renderer | null = $state(null)
  $effect(() => {

    renderer = new Renderer({
      canvas,
      boidNum: 1000,
      screen: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    })

    window.addEventListener('resize', () => {
      renderer && renderer.changeScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    })

  })

  let offscreen = $state(false)
  $effect(() => {
    if(!offscreen && renderer && renderer.paused){
      renderer.play()
    }

    if(offscreen && renderer && !renderer.paused){
      renderer.pause()
    }
  })

  $effect(() => {
    scroll((_, info) => {
  
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
        overlay && overlay.style.setProperty('opacity', `${1 - ((window.innerHeight - info.y.current) / window.innerHeight)}`) 
      }
    })
  })


</script>

<canvas class="boidcanvas" bind:this={canvas}></canvas>
<div class="overlay" id="boids-overlay" bind:this={overlay}></div>

<style>

  canvas.boidcanvas{
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 20%;
    left: 0;
    z-index: 0;
  }

  .overlay{
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0;
    transition: opacity 500ms;
    background: rgba(0,0,0,1);
  }

</style>