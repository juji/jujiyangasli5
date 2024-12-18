<script lang="ts">
  import { Ball } from "./ball";

  $effect(() => { 

    // @ts-ignore
    const jsBalls = []
    const balls = document.querySelectorAll('.ball')
    balls.forEach(ball => {
      jsBalls.push(new Ball(ball as HTMLDivElement))
    })

    requestAnimationFrame(function anim(){
      // @ts-ignore
      jsBalls.forEach(ball => ball.animate())
      requestAnimationFrame(anim)
    })

    window.addEventListener('resize',() => {
      // @ts-ignore
      jsBalls.forEach(ball => ball.onResize())
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
<div class="wrapper">
  <div class="grain">
    <div class="balls">
      <div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>
      <div class="ball"></div>
    </div>
  </div>
</div>

<style>
  .wrapper{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
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
      
    }

    .balls{
      height: 100%;
      filter: url(#goo) blur(5px);
    }

    .ball{

      --width: 0px;
      --height: 0px;
      --color: '0,0,0';
      --pos-x: '#000000';
      --pos-y: '#000000';
      --blur: 0px;


      border-radius: 50%;
      mix-blend-mode: screen;
      filter: blur(75px);
      display: block;
      position: fixed;
      transform: translate3d(-50%, -50%, 0);
      width: var(--width);
      height: var(--height);

      background: radial-gradient(circle at center, rgba(var(--color), 0.9) 0%, rgba(var(--color), 0) 100%) no-repeat;

      top: var(--pos-y);
      left: var(--pos-x);
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