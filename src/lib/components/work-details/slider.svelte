

<script lang="ts">
  import type { WorkImage } from "$lib/data/works/types";
  import PhotoSwipeLightbox from 'photoswipe/lightbox';
  import 'photoswipe/style.css';

  const { images }: {
    images: WorkImage[]
  } = $props()

  let currentImage = $state(0)
  let timeout = 5000
  let container: HTMLElement
  let sliderStart = $state(new Date())
  let stopSlider = $state(false)

  $effect(() => {

    const lightbox = new PhotoSwipeLightbox({
      gallery: '#my-gallery',
      children: 'a',
      pswpModule: () => import('photoswipe')
    });
    lightbox.init();

  })
  
  $effect(() => {
    // to make svelte understand 
    // that we are using sliderStart
    // also to prevent double invocation
    let ss = sliderStart.toISOString()

    setTimeout(() => {
      if(stopSlider) return;
      if(sliderStart.toISOString() !== ss) return;

      if(currentImage === (images.length-1)) currentImage = 0
      else currentImage += 1
      
      container && container.scrollTo( window.innerWidth * currentImage ,0)
      
      sliderStart = new Date()
    },timeout)
  })


  // touch handlers
  let touchEndInt = 0;
  function onTouchStart(){
    if(touchEndInt) clearTimeout(touchEndInt)
    stopSlider = true
  }

  function onTouchEnd(){
    if(touchEndInt) clearTimeout(touchEndInt)
    touchEndInt = setTimeout(() => {
      stopSlider = false
      sliderStart = new Date()
    },5000)
  }

  // image intersection observer
  // record current image on currentImage
  $effect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          const img = entry.target as HTMLImageElement
          const idx = Number(img.dataset.index)
          if(idx !== currentImage) currentImage = idx
        }
      })
    }, {
      root: container,
      rootMargin: '0px -1px -1px 0px'
    });

    container.querySelectorAll('img').forEach(img => observer.observe(img))

    return () => {
      observer.disconnect()
    }
  })

  // update stopSlider based on browser size
  let innerWidth = $state(0)
  $effect(() => {
    
    if(innerWidth >= 1024 && !stopSlider){
      stopSlider = true
    }else if(innerWidth < 1024 && stopSlider){
      stopSlider = false
      sliderStart = new Date()
    }

  })


</script>

<svelte:window bind:innerWidth={innerWidth} />

<div class="container" id="my-gallery" data-fancybox={1} bind:this={container}>
  {#each images as image, index }
    <a
      href={image.url}
      data-pswp-width={image.dimension.image.width}
      data-pswp-height={image.dimension.image.height}
      target="_blank"
      ontouchstart={onTouchStart}
      ontouchcancel={onTouchEnd}
      ontouchend={onTouchEnd}
    >
      <picture>
        <source media="(max-width: 767px)" 
          srcset={image.thumbnail} 
          width={image.dimension.thumb.width}
          height={image.dimension.thumb.height}
        />
        <source media="(min-width: 768px)" 
          srcset={image.url} 
          width={image.dimension.image.width}
          height={image.dimension.image.height}
        />
        <img 
          src={image.url} 
          alt={image.title} 
          loading="lazy"
          data-index={index}
        />
      </picture>
    </a>
  {/each}
</div>

<style>

  :global(.pswp__icn-shadow){
    /* stroke: #8c8c8c; */
    stroke: transparent;
  }

  :global(.pswp__icn){
    fill: #adadad;
  }

  :global(.pswp__container){
    transition: transform 300ms ease-out;
    @media screen and (hover: none){
      transition: initial;
    }
  }

  .container{

    position: relative;
    left: calc(-1 * var(--page-padding));
    width: calc(100% + var(--page-padding) + var(--page-padding));

    display: flex;
    aspect-ratio: 16 / 9;
    
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    
    scrollbar-width: none;
    scroll-behavior: smooth;

    user-select: none;
    overscroll-behavior: none; 
    -webkit-user-select: none; 
    -webkit-touch-callout: none; 

    a{
      margin: 0;
      padding: 0;
      border: none;
      aspect-ratio: 16 / 9;
      height: 100%;
      width: auto;
      display: block;
    }

    img{
      aspect-ratio: 16 / 9;
      height: 100%;
      width: auto;
      display: block;
      object-fit: cover;
      object-position: center top;
      scroll-snap-align: center;
    }

    @media screen and (min-width: 1024px) {
      display: block;
      aspect-ratio: unset;
      overflow-x: hidden;
      overflow-y: auto;
      left: 0;
      width: 100%;

      a{
        margin-bottom: 1rem;
      }

      a, img{
        height: auto;
        aspect-ratio: unset;
      }
    }

  }
</style>