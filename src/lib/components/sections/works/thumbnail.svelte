<script lang="ts">
	import type { WorkSingle } from "$lib/data/works/types";
  import { noHover } from "$lib/modules/no-hover";
  import {animate} from 'motion/mini'
	import { scroll, cubicBezier } from "motion";

  let { 
    work, index,
    indexLength,
    onThumbnailClick,
    fadeOutSpeed,
    fadeOut,
    fromWork,
  }: {
    work: WorkSingle
    index: number 
    indexLength: number
    fadeOutSpeed: number
    fadeOut: boolean
    fromWork: boolean
    onThumbnailClick: ({ image }:{ image: string }) => void
  } = $props()

  let elm:HTMLDivElement;
  let anchor:HTMLAnchorElement;
  let logo:HTMLElement;
  let rect: any = null;
  let clicked = $state(false)
  function onMouseMove(ev: MouseEvent){

    if(noHover()) return;
    if(clicked) return;

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

    // checkout 150 -150 on the default
    logo.style.setProperty(
      'background',
      `radial-gradient(
        circle at ${x * 150 + 150}% ${y * -150 - 150}%, 
        hsl(0 0% 0% / 0) 55%, 
        hsl(0 0% 0% / ${shadowOpacity * 0.5}) 110%
      )`
    )

    // yeah, this is a playground
    // test it on the amber card

  }

  function normalizeTransform(){
    animate(
      elm, 
      { transform: `rotateX(0rad) rotateY(0rad) translate3d(0,0,0)` }
    )

    animate(
      anchor, 
      { background: `radial-gradient(
        circle at 50% 50%, 
        hsl(0 0% 0% / .0) 50%, 
        hsl(0 0% 0% / .1) 80%
      )` }
    )

    animate(
      logo, 
      { background: `radial-gradient(
        circle at 150% -150%, 
        hsl(0 0% 0% / .0) 50%, 
        hsl(0 0% 0% / .1) 80%
      )` }
    )
  }

  function onMouseLeave(){
    if(noHover()) return;
    if(clicked) return;
    normalizeTransform()
    rect = null
  }

  function onClick(){
    onThumbnailClick({ image: work.image.url })
    normalizeTransform()
    clicked = true
  }

  let innerWidth = $state(0)
  let container: HTMLElement
  let clientHeight = $state(0)

  // stacking card anim on scroll
  // on small width
  $effect(() => {

    let animRotate;
    let animRotateOpt;
    let animTranslate;
    let animTranslateOpt;
    const gap = 72

    if(innerWidth >= 800) {

      animRotate = animate(container, { rotate: ['x 0deg', 'x 0deg']});
      animRotateOpt = { offset: [0,1] };
      animTranslate = animate(container, { translate: ['0 0 0', '0 0 0']});
      animTranslateOpt = { offset: [0,1] };

    }else{

      animRotate = animate(container, { rotate: [
        `x ${-10 * (index + 1)}deg`,
        `x ${-10 * (index + 1)}deg`,
        `x 0deg`
      ]})

      animRotateOpt = { offset: [ 
        0, 
        `${(clientHeight + gap) * index}px`, 
        `${(clientHeight + gap) * (index + 1)}px` 
      ]}

      animTranslate = animate(container, { translate: [
        `0 ${clientHeight - gap}px 0`,
        `0 ${clientHeight - gap}px 0`,
        `0 0 0`,
      ]})

      animTranslateOpt = { offset: [ 
        0, 
        `${((clientHeight + gap) * ((index * .5) + 1))}px`, 
        `${((clientHeight + gap) * ((index * .5) + 2))}px`, 
      ]}

    }

    // @ts-ignore
    const rotate = scroll(animRotate, animRotateOpt)
    // @ts-ignore
    const translate = scroll(animTranslate, animTranslateOpt)

    return () => {
      rotate()
      translate()
    }
  })

</script>

<svelte:window bind:innerWidth={innerWidth}></svelte:window>

<div class="container" 
  bind:this={container}
  class:clicked
  class:fadeOut
  class:fromWork
  style={
    `--fadeOutSpeed: ${fadeOutSpeed}ms;`
  }>
  <div class="work-thumb" id={work.id}
    bind:this={elm} 
    bind:clientHeight={clientHeight}
    style={`--index:${index}`}
  >
    <img 
      src={work.image.thumbnail} 
      width={work.image.dimension.thumb.width}
      height={work.image.dimension.thumb.height}
      alt={work.image.title}
      loading="lazy"
      class="work-image"
      style={`view-transition-name: ${work.id}`}
    />
    <div 
      class="work-logo"
      class:clicked
      data-bg={work.logo.url}
    >
      <img 
        src={work.logo.url}
        width={work.logo.width}
        height={work.logo.height}
        alt={work.image.title + ' logo'}
      />
      <div class="gradient" bind:this={logo}></div>
    </div>
    <!--  last site uses "works" so... -->
    <a 
      href={`/works/${work.id}`} 
      onclick={onClick}
      onmousemove={onMouseMove}
      onmouseleave={onMouseLeave}
      aria-label={`see ${work.title} page`}
      bind:this={anchor}></a>
  </div>
</div>

<style>

    @keyframes cardFadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    @keyframes cardFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes workLogoIn{
      from { 
        opacity: 0; 
        transform: translateZ(30px);
      }
      to { 
        opacity: 1; 
        transform: translateZ(0px);
      }
    }

    @keyframes workLogoOut{
      from { 
        opacity: 1; 
        transform: translateZ(0px);
      }
      to { 
        opacity: 0; 
        transform: translateZ(30px);
      }
    }

  .container{

    --fadeOutSpeed: 0ms;

    perspective: 1000px;
    z-index: 2;
    transition: z-index 0ms 200ms;
    position: relative;
    opacity: 0;
    animation: cardFadeIn 500ms 500ms both;
    position: sticky;
    bottom: 0;


    &:hover{ 
      transition: z-index 0ms 0ms;
      z-index: 20;
    }

    &.fromWork{
      animation: cardFadeIn 0ms 0ms both;
    }

    @media screen and (min-width: 800px) {
      position: static;
      bottom: unset;
    }


  }

  .work-thumb{

    --index: 0;
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
    
    will-change: transform;
    
    scroll-margin-top: 4rem;
    translate: 0 0 0px;
    
    transition: 
      translate 500ms var(--easeOutBounce) 0ms
    ;

    min-width: 0px;

    img.work-image{
      aspect-ratio: 16 / 9;
      object-position: center top;
      object-fit: cover;
      opacity: 1;
      transform: translateZ(0px);
      min-width: 0px;
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
      opacity: 1;
      translate: 0 0 0;
      transition: 
        opacity 300ms calc(100ms * var(--index) + var(--fadeOutSpeed)),
        translate 300ms calc(100ms * var(--index) + var(--fadeOutSpeed))
      ;

      img{
        display: block;
        height: 100%;
        width: auto;
      }

      div{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(
          circle at 150% -150%, 
          hsl(0 0% 0% / .0) 50%, 
          hsl(0 0% 0% / .1) 80%
        );
      }
    }

    a{
      position: absolute;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      z-index: 10;
      opacity: 1;
      
      background: radial-gradient(
        circle at 50% 50%, 
        hsl(0 0% 0% / .0) 50%, 
        hsl(0 0% 0% / .1) 80%
      );

      transition: opacity 500ms calc(100ms * var(--index) + var(--fadeOutSpeed));
    }

    &:hover{
      transition: 
        translate 300ms ease-out 0ms
      ;
      translate: 0 0 50px;

      img.work-image{
        transition: opacity 0ms;
        opacity: 1;
      }
    }

    &:active{
      translate: 0 0 10px;
      @media (hover: none) {
        translate: 0 0 0px;
      } 
    }

    .work-logo.clicked{
      transition: opacity var(--fadeOutSpeed) 0ms;
      opacity: 0 !important;
    }
  }

  .container.fadeOut:not(.clicked){
    animation: cardFadeOut var(--fadeOutSpeed) 0s both;
    .work-thumb{
      transform: rotateX(0rad) rotateY(0rad) !important;
  
      .work-logo{
        transition: 
          opacity 300ms 0ms,
          translate 300ms 0ms
        ;
        opacity: 0;
        translate: 0 21px 0;
      }
  
      a{
        transition: opacity 300ms 0ms;
        opacity: 0;
      }
  
    }

  }

</style>