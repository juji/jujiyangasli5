<script lang="ts">
  import { spring } from "motion"
  import { animate } from "motion/mini"
  import '$lib/styles/rubbery.css'

  let { onClick } = $props();
  let button: HTMLButtonElement;
  let circle: HTMLElement;
  let mouseListener: ((event: MouseEvent) => void) | null = null

  function angle(cx: number, cy: number, ex: number, ey: number) {
    const dy = ey - cy;
    const dx = ex - cx;
    let theta = Math.atan2(dy, dx); // range (-PI, PI]
    if (theta < 0) theta += Math.PI
    return theta;
  }

  function normalizeStyle(){
    animate(
      button,
      { translate: "0px 0px" },
      { type: spring, duration: 0.2, bounce: 0.5 }
    )
    animate(
      circle,
      { scale: '1 1' },
      { type: spring, duration: 0.2, bounce: 0.5 }
    ).then(() => {
      circle.style.setProperty('rotate', `0rad`)
    })
    if(mouseListener) document.removeEventListener('mousemove',mouseListener)
  }

  function onClickLocal(){
    normalizeStyle()
    onClick()
  }

  function onMouseLeave(e: MouseEvent){
    const n = button.getBoundingClientRect()
    const points = {
      outX: e.x,
      outY: e.y,
      centerX: n.left + (n.width / 2),
      centerY: n.top + (n.height / 2),
    }
    document.addEventListener('mousemove',function listenMouseMove(event: MouseEvent){
      
      mouseListener = listenMouseMove
      const xGap = (event.x - points.outX)
      const yGap = (event.y - points.outY)
      const translateScale = 0.6
      
      const gap = Math.hypot(xGap, yGap)
      const a = angle(points.centerX, points.centerY, event.x, event.y)
      const scale = .07 * Math.abs(gap) / n.height
      
      circle.style.setProperty('rotate', `${a}rad`)
      circle.style.setProperty('scale', `${1 + scale} ${1 - (scale * 1.1)}`)
      button.style.setProperty('translate', `${xGap * translateScale}px ${yGap * translateScale}px`)

      if(gap > 100){
        document.removeEventListener('mousemove',listenMouseMove)
        mouseListener = null
        animate(
          button,
          { translate: "0px 0px" },
          { type: spring, duration: 0.7, bounce: 0.5 }
        )
        animate(
          circle,
          { scale: '1 1' },
          { type: spring, duration: 0.7, bounce: 0.5 }
        ).then(() => {
          circle.style.setProperty('rotate', `0rad`)
        })
      }
    })
  }

</script>

<button aria-label="menu" 
  bind:this={button}
  onmouseenter={normalizeStyle}
  onmouseleave={onMouseLeave}
  onclick={onClickLocal}>
  <span class="circle" bind:this={circle}></span>
  <span class="lines a"></span>
  <span class="lines b"></span>
  <span class="lines c"></span>
</button>

<style>
  @keyframes menuSpan {
    from {
      width: 0%;
    }
    to {
      width: 50%;
    }
  }

  @keyframes buttonAnim {
    0%{
      scale: 0 0 1;
    }
    100%{
      scale: 1 1 1;
    }
  }

  button{
    cursor: pointer;
    background-color: transparent;
    border: 0px;
    width: 3rem;
    height: 3rem;
    display: block;
    
    animation-delay: 1500ms;
    animation-name: buttonAnim;
    animation-duration: 1000ms;
    animation-fill-mode: both;
    animation-timing-function: var(--rubbery);
    position: absolute;
    z-index: 2;

    filter: var(--drop-shadow);

    span.circle{
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      outline: 2px solid var(--text-color);
      background-color: rgb(from var(--text-color) r g b / 0.2);
      border-radius: 50%;
      top: 0;
      left: 0;
    }

    span.lines{
      background-color: var(--text-color);
      position: absolute;
      display: block;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 50%;
      height: 3px;
      border-radius: 5px;

      animation-name: menuSpan;
      animation-duration: 300ms;
      animation-fill-mode: both;
      animation-timing-function: cubic-bezier(.3,.08,.54,1.49);

      &.a{
        transform: translate3d(-50%, calc(-50% - 8px), 0);
        animation-delay: 2200ms;
      }

      &.b{
        animation-delay: 2300ms;
      }

      &.c{
        transform: translate3d(-50%, calc(-50% + 8px), 0);
        animation-delay: 2400ms;
      }
    }

    &:hover{
      span.circle{
        background-color: rgb(from var(--text-color) r g b / 0.3);
      }
    }

    &:active{
      opacity: 0.8;
    }

    @media screen and (min-width: 380px) {
      width: 4rem;
      height: 4rem;
    }
  }
</style>