<script lang="ts">
  import { Ball } from "./ball";

  $effect(() => { 

    const jsBalls: Ball[] = []
    const balls = document.querySelectorAll('.ball')
    
    balls.forEach(ball => {
      jsBalls.push(new Ball(
        ball as HTMLDivElement,
      ))
    })

    requestAnimationFrame(function anim(){
      jsBalls.forEach(ball => ball.animate())
      requestAnimationFrame(anim)
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
      <div class="ball" style="--delay:200ms;--pos-x:50%;--pos-y:50%;--color:6,82,221;--diameter:860px"></div>
      <div class="ball" style="--delay:500ms;--pos-x:56%;--pos-y:6%;--color:234,32,39;--diameter:676px"></div>
      <div class="ball" style="--delay:700ms;--pos-x:18%;--pos-y:40%;--color:153,128,250;--diameter:698px"></div>
      <div class="ball" style="--delay:1200ms;--pos-x:67%;--pos-y:34%;--color:163,203,56;--diameter:676px"></div>
      <div class="ball" style="--delay:1500ms;--pos-x:43%;--pos-y:23%;--color:253,167,223;--diameter:646px"></div>
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

    @keyframes popout{
      from {
        transform: scale(0) translate3d(-10%, -10%, 0);
      }
      to{
        transform: scale(1) translate3d(-10%, -10%, 0);
      }
    }

    .ball{

      --diameter: 0px;
      --color: '0,0,0';
      --pos-x: 0%;
      --pos-y: 0%;
      --delay: 0ms;

      animation-name: popout;
      animation-duration: 2000ms;
      animation-fill-mode: both;
      animation-timing-function: cubic-bezier(.25,.08,.4,.87);
      animation-delay: var(--delay);

      
      border-radius: 50%;
      mix-blend-mode: screen;
      filter: blur(75px);
      display: block;
      position: fixed;
      width: var(--diameter);
      height: var(--diameter);

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