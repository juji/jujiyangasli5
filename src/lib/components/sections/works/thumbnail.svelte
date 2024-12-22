<script lang="ts">
	import type { WorkSingle } from "$lib/data/works/types";
	import { animate } from "motion/mini";
  import { noHover } from "$lib/functions/no-hover";

  let { work, inView, index }: {
    work: WorkSingle
    inView: boolean
    index: number 
  } = $props()

  let elm:HTMLDivElement;
  let anchor:HTMLAnchorElement;
  let rect: any = null;
  function onMouseMove(ev: MouseEvent){

    if(noHover()) return;

    if(!rect) rect = elm.getBoundingClientRect()

    // mouse pos 
    // ratios [-1,1]
    const x = ( ev.x - (rect.left + (rect.width / 2)) ) / (rect.width / 2)
    const y = ( ev.y - (rect.top + (rect.height / 2)) ) / (rect.height / 2)

    // rotation
    const rotX = 0.05 * Math.PI * y
    const rotY = - 0.05 * Math.PI * x
    elm.style.setProperty(
      'transform', 
      `rotateX(${rotX}rad) rotateY(${rotY}rad) translate3d(0,0,0)`
    )
    
    // light source is the mouse
    // transform from [-1,1] into [0,100]
    const lightX = (x + 1) / 2 * 100
    const lightY = (y + 1) / 2 * 100
    
    // it can be simple
    // let shadowOpacity = 0.2

    // but why...?

    // use y to set shadows
    // less y = more shadow; 
    // it's like we get more light from a different source when we tilt the card

    // first we have our y value: lightY
    // which we will convert into [0,1]

    // we need the shadow opacity, not the shadow
    // let shadowOpacity = 1 - (lightY / 100)

    // but the range is too big
    // shadow appear when the mouse is on the very top 
    // and the dissapear on the very bottom
    // so we setup range [0.2,0.8] 
    // and result * .5 for less intensity
    let shadowOpacity = (1 - (.2 + (.8 * lightY / 100))) * 0.5

    anchor.style.setProperty(
      'background',
      `radial-gradient(
        circle at ${lightX}% ${lightY}%, 
        hsl(0 0% 0% / 0) 50%, 
        hsl(0 0% 0% / ${shadowOpacity}) 100%
      )`
    )

    // yeah, this is a playground
    // test it on the amber card

  }

  function onMouseLeave(){
    if(noHover()) return;

    animate(
      elm, 
      { transform: `rotateX(0rad) rotateY(0rad)` }
    )

    animate(
      anchor, 
      { background: `radial-gradient(
        circle at 50% 50%, 
        hsl(0 0% 0% / .0) 50%, 
        hsl(0 0% 0% / .1) 80%
      )` }
    )
    
    rect = null
  }

</script>

<div class="container">
  <div class="work-thumb" id={work.id} class:inView 
    bind:this={elm} 
    style={`--index:${index}`}
  >
    <img 
      src={work.image.thumbnail} 
      width={work.image.dimension.thumb.width}
      height={work.image.dimension.thumb.height}
      alt={work.image.title}
      loading="lazy"
      class="work-image"
    />
    <div 
      class="work-logo"
      data-bg={work.logo.url}
    >
      <img 
        src={work.logo.url}
        width={work.logo.width}
        height={work.logo.height}
        alt={work.image.title + ' logo'}
      />
    </div>
    <a 
      bind:this={anchor}
      onmousemove={onMouseMove}
      onmouseleave={onMouseLeave}
      href={`/work/${work.id}`}
      aria-label={`see ${work.title} page`}></a>
  </div>
</div>

<style>

  .container{
    perspective: 1000px;
    z-index: 2;
    transition: z-index 0ms 200ms;
    position: relative;
    &:hover{ 
      transition: z-index 0ms 0ms;
      z-index: 20;
    }
  }

  .work-thumb{

    --index: 0;
    --animInDelay: calc(100ms + calc(var(--index) * 100ms));
    --easeOutBounce: linear(
        0, 0.004, 0.016, 0.035, 0.063, 0.098, 0.141 13.6%, 0.25, 0.391, 0.563, 0.765,
        1, 0.891 40.9%, 0.848, 0.813, 0.785, 0.766, 0.754, 0.75, 0.754, 0.766, 0.785,
        0.813, 0.848, 0.891 68.2%, 1 72.7%, 0.973, 0.953, 0.941, 0.938, 0.941, 0.953,
        0.973, 1, 0.988, 0.984, 0.988, 1
      );

    position: relative;
    transform-style: preserve-3d;
    /* overflow: hidden; with overflow hidden, the 3d effect will not work */
    background: black;
    outline: 1px solid black;
    opacity: 0;

    will-change: transform;
    
    scroll-margin-top: 2rem;
    translate: 0 0 0px;
    
    transition: 
      translate 500ms var(--easeOutBounce),
      opacity 300ms var(--animInDelay) ease-out
    ;

    &.inView{
      opacity: 1;
    }

    img.work-image{
      aspect-ratio: 16 / 9;
      object-position: center top;
      object-fit: cover;
      opacity: .8;
      opacity: 1;
      transition: opacity 200ms 200ms;
      transform: translateZ(0px);
    }

    .work-logo{
      position: absolute;
      bottom: 16px;
      left: 21px;
      height: 34px;
      background: white;
      border: 1px solid #b9b9b9;
      padding: 8px;

      transform: translateZ(30px);
      pointer-events: none;
      z-index: 1;

      img{
        display: block;
        height: 100%;
        width: auto;
      }
    }

    a{
      position: absolute;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      z-index: 10;
      
      background: radial-gradient(
        circle at 50% 50%, 
        hsl(0 0% 0% / .0) 50%, 
        hsl(0 0% 0% / .1) 80%
      );
    }

    &:hover{
      translate: 0 0 100px;

      img.work-image{
        transition: opacity 0ms;
        opacity: 1;
      }
    }

    &:active{
      translate: 0 0 50px;
      @media (hover: none) {
        translate: 0 0 -50px;
      } 
    }
  }
</style>