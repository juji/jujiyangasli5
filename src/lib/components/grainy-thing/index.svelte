<script lang="ts">
  import { Ball } from "./ball";
  import { scroll, animate } from "motion";
  import { isSafariOrWebkit } from '$lib/functions/safari'
  
  let dBalls: Ball[] = $state([]);
  let overlay: HTMLDivElement
  let wrapper: HTMLDivElement

  let width = 800
  let height = 520
  let translateX = 300
  let translateY = 120

  $effect(() => {

    // if screen width < 768, just use 3 balls
    let smaller = false
    if(Math.max(window.innerWidth,window.innerHeight) <= 1536){
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
          {
            width,
            height
          }
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
    
    const hMult = 1.2
    const minimumOpacity = isSafariOrWebkit().usesSafariWebKit ? 0.1 : 0

    // scroll overlay's opacity
    scroll(animate(overlay,{
      opacity: [ minimumOpacity, 1 ]
    }), 
    { offset: [ 0, `${100 * hMult}vh` ]}
  )

    // scroll canvas paralax
    scroll(
      animate(
        wrapper,
        { transform: [
          'translateY(0)',
          'translateY(-300px)'
        ] }
      ), 
      { offset: [ 0, `${100 * hMult}vh` ]}
    )

    // is offscreen?
    scroll((_, info) => {
      offscreen = info.y.current >= (window.innerHeight * hMult)
    })

  })

</script>

<svg xmlns="http://www.w3.org/2000/svg" class="hidden">
  <filter id="goo">
    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
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
<div class="wrapper" class:shown={!offscreen} bind:this={wrapper}>
  <div class="grain">
    <div class="balls"
      style={`--translateX: ${translateX}px;--translateY: ${translateY}px`}
    >
      <div style="--delay:2000ms;--pos-x:50%;--pos-y:50%;--color:6,82,221;--diameter:860px" class="ball"></div>
      <div style="--delay:2300ms;--pos-x:56%;--pos-y:6%;--color:234,32,39;--diameter:676px" class="ball"></div>
      <div style="--delay:2600ms;--pos-x:18%;--pos-y:40%;--color:153,128,250;--diameter:698px" class="ball"></div>
      <div style="--delay:2900ms;--pos-x:67%;--pos-y:34%;--color:163,203,56;--diameter:676px" class="ball remove"></div>
      <div style="--delay:3100ms;--pos-x:43%;--pos-y:23%;--color:253,167,223;--diameter:646px" class="ball remove"></div>
    </div>
  </div>
</div>
<div class="overlay" bind:this={overlay}></div>
<div class="debug" style={
  `--width: ${width}px;--height: ${height}px;`+
  `--translateX: ${translateX}px;--translateY: ${translateY}px`
}></div>

<style>

  .debug{
    position: fixed;
    top: 50%;
    left: 50%;

    width: var(--width,0);
    height: var(--height,0);
    border: 1px solid red;
    transform: translate3d(-50%, -50%, 0);
    translate: var(--translateX,0) var(--translateY,0);

    display: none;
  }

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
    /* overflow: hidden; */
    filter: contrast(200%);
    height: 200%;
    background: 
      radial-gradient(circle at 50% 50%, rgba(0,0,0,.7), rgba(0,0,0,.6)),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 277 277' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='10' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
      ;
  }

  .balls{
    height: 100%;
    width: 100%;
    filter: url(#goo);
    position: absolute;
    translate: var(--translateX,0) var(--translateY,0);
  }

  @keyframes rushin{
    from {
      scale: 0;
      /* translate: 50% 0 0; */
    }
    to{
      scale: 1;
      /* translate: 0% 0 0; */
    }
  }

  .ball{

    --diameter: 0px;
    --color: 0,0,0;
    --pos-x: 0%;
    --pos-y: 0%;
    --delay: 0ms;

    position: absolute;
    
    
    animation-name: rushin;
    animation-duration: 2000ms;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.025, 0.725, 0.530, 1.475);
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

    transform: translate3d(-50%, -50%, 0);
  }

  /* safari only */
  @supports (hanging-punctuation: first) and (font: -apple-system-body) and (-webkit-appearance: none) {

    .overlay{
      opacity: 0.2;
    }

    .grain{
      filter: brightness(90%) contrast(200%);
    }

    .balls{
      filter: url(#goosafari);
    }

    .ball{
      mix-blend-mode: plus-lighter;
    }

  }
</style>