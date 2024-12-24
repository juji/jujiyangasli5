<script lang="ts">
  import { Ball } from "./ball";
  import { scroll } from "motion";
  
  let dBalls: Ball[] = $state([]);
  let overlay: HTMLDivElement

  $effect(() => {

    // if screen width < 768, just use 3 balls
    let smaller = false
    if(Math.max(window.innerWidth,window.innerHeight) <= 1536){
      console.log('smaller')
      document.querySelectorAll('.ball').forEach(v => {
        if(v.classList.contains('remove')) v.remove()
        else v.classList.add('small')
      })
      smaller = true
    }

    // set dBalls
    if(!dBalls.length){
      const jsBalls: Ball[] = []
      const balls = document.querySelectorAll('.ball')
      balls.forEach(ball => {
        const dball = new Ball(
          ball as HTMLDivElement,
          smaller // smaller number
        )
        jsBalls.push(dball)
      })
      dBalls = jsBalls
    }
  })

  let offscreen = $state(false)

  $effect(() => {
    if(!offscreen) requestAnimationFrame(function draw(){
      
      dBalls.forEach(v => v.update())
      dBalls.forEach(v => v.render())

      if(!offscreen) requestAnimationFrame(draw)
    })
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
        overlay && overlay.style.setProperty('opacity', '0.8')
      }
      
      else {
        if(offscreen) offscreen = false 
        overlay && overlay.style.setProperty('opacity', `${0.8 - (
          (window.innerHeight - info.y.current) / window.innerHeight
        )}`) 
      }
    })

  })

</script>

<svg xmlns="http://www.w3.org/2000/svg" class="hidden">
  <filter id="goo">
    <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
    <feColorMatrix in="blur" type="matrix" 
      values="1 0 0 0 0  
              0 1 0 0 0  
              0 0 1 0 0  
              0 0 0 3 -1" />

  </filter>
  <filter id="goosafari">
    <feGaussianBlur in="dimmed" stdDeviation="1" result="blur" />
    <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  
                                                  0 1 0 0 0  
                                                  0 0 1 0 0  
                                                  0 0 0 21 -7" />
    <feComposite in="blur" in2="goo" operator="in" result="composite" />
  </filter>
</svg>
<div class="wrapper" class:shown={!offscreen}>
  <div class="grain">
    <div class="balls">
      <div style="--delay:2000ms;--pos-x:50%;--pos-y:50%;--color:6,82,221;--diameter:860px" class="ball"></div>
      <div style="--delay:2300ms;--pos-x:56%;--pos-y:6%;--color:234,32,39;--diameter:676px" class="ball"></div>
      <div style="--delay:2600ms;--pos-x:18%;--pos-y:40%;--color:153,128,250;--diameter:698px" class="ball"></div>
      <div style="--delay:2900ms;--pos-x:67%;--pos-y:34%;--color:163,203,56;--diameter:676px" class="ball remove"></div>
      <div style="--delay:3100ms;--pos-x:43%;--pos-y:23%;--color:253,167,223;--diameter:646px" class="ball remove"></div>
    </div>
  </div>
</div>
<div class="overlay" bind:this={overlay}></div>

<style>

  .overlay{
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 0;
    opacity: 0;
    transition: opacity 500ms;
    background: rgba(0,0,0,1);
  }

  .wrapper{
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 0;
    transform: translate3d(1,1,1);
    transition: left 200ms ease-out;

    :global(&.shown){
      display: block;
    }

  }

  svg.hidden{
    height: 0;
    width: 0;
    position: absolute;
  }

  .grain{
    overflow: hidden;
    filter: contrast(200%);
    height: 100%;
    background: 
      radial-gradient(circle at 50% 50%, rgba(0,0,0,.7), rgba(0,0,0,.6)),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 277 277' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
      ;
    image-rendering: pixelated;  
  }

  .balls{
    height: 100%;
    filter: url(#goo) blur(5px);
  }

  @keyframes popout{
    from {
      scale: 0;
      translate: 100% 0 0;
    }
    to{
      scale: 1;
      translate: 0% 0 0;
    }
  }

  .ball{

    --diameter: 0px;
    --color: 0,0,0;
    --pos-x: 0%;
    --pos-y: 0%;
    --delay: 0ms;

    position: fixed;
    image-rendering: pixelated;
    animation-name: popout;
    animation-duration: 2000ms;
    animation-fill-mode: both;
    animation-timing-function: ease-out;
    animation-delay: var(--delay);

    border-radius: 50%;
    mix-blend-mode: screen;
    filter: blur(75px);
    display: block;
    width: var(--diameter);
    height: var(--diameter);
    
    background: radial-gradient(circle at center, rgba(var(--color), 0.9) 0%, rgba(var(--color), 0) 100%) no-repeat;
    
    top: var(--pos-y);
    left: var(--pos-x);

    transform: translate3d(-30%, -30%, 0);

    :global(&.small){
      transform: translate3d(-40%, -30%, 0);
    }
  }

  /* safari only */
  @supports (hanging-punctuation: first) and (font: -apple-system-body) and (-webkit-appearance: none) {

    .balls{
      filter: url(#goosafari);
    }

    .ball{
      mix-blend-mode: plus-lighter;
    }

  }
</style>