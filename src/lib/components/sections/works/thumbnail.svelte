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

    // ratios [-1,1]
    const x = ( ev.x - (rect.left + (rect.width / 2)) ) / (rect.width / 2)
    const y = ( ev.y - (rect.top + (rect.height / 2)) ) / (rect.height / 2)

    // rotation
    const rotX = 0.05 * Math.PI * y
    const rotY = - 0.05 * Math.PI * x
    elm.style.setProperty(
      'transform', 
      `rotateX(${rotX}rad) rotateY(${rotY}rad)`
    )

    // light
    const lightX = (x + 1) / 2 * 100
    const lightY = (y + 1) / 2 * 100

    const shadow = 1 - (.2 + (.8 * lightY / 100))
    const lightness = shadow - 0.7

    // let it be ellipse
    anchor.style.setProperty(
      'background',
      `radial-gradient(
        ellipse at ${lightX}% ${lightY}%, 
        hsl(0 0% 0% / ${lightness}) 50%, 
        hsl(0 0% 0% / ${shadow}) 100%
      )`
    )


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
        hsl(0 0% 0% / .4) 50%, 
        hsl(0 0% 0% / .4) 80%
      )` }
    )
    
    rect = null
  }

  // $effect(() => {
  //   console.log('inView', inView)
  // })

</script>

<div class="container">
  <div class="work-thumb" id={work.id} class:inView 
    bind:this={elm} 
    style={`--index:${index}`}
  >
    <img 
      src={work.image.url} 
      width={work.image.dimension.image.width}
      height={work.image.dimension.image.height}
      alt={work.image.title}
      loading="lazy"
    />
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

    aspect-ratio: 16 / 8; /* wait, what? yes, we do with what we got */
    position: relative;
    overflow: hidden;
    background: black;
    outline: 1px solid black;
    opacity: 0;
    
    translate: 0 0 0px;
    transition: 
      translate 500ms var(--easeOutBounce),
      opacity 300ms var(--animInDelay) ease-out,
      transform 100ms ease-out
    ;

    &.inView{
      opacity: 1;
    }

    img{
      object-position: center center;
      object-fit: contain;
      opacity: .8;
      opacity: 1;
      transition: opacity 200ms 200ms;
    }

    a{
      position: absolute;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at 50% 50%, 
        hsl(0 0% 0% / .4) 50%, 
        hsl(0 0% 0% / .4) 80%
      );

      &:hover{
        background: radial-gradient(
          circle at 50% 50%, 
          hsl(0 0% 0% / .0) 50%, 
          hsl(0 0% 0% / .1) 80%
        )
      }

      @media (hover: none) {
        background: radial-gradient(
          circle at 50% 50%, 
          hsl(0 0% 0% / .0) 50%, 
          hsl(0 0% 0% / .1) 80%
        )
      }
    }

    &:hover{
      translate: 0 0 100px;

      img{
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