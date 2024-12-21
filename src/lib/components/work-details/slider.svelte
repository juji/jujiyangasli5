

<script lang="ts">
  import type { WorkImage } from "$lib/data/works/types";

  const { images }: {
    images: WorkImage[]
  } = $props()

  let currentImage = $state(0)
  let stopInterval = $state(false)
  let timeout = 5000
  let container: HTMLElement
  let startSlider = $state(new Date())

  $effect(() => {
    // to make svelte understand 
    // that we are using startSlider
    startSlider;

    setTimeout(() => {
      if(stopInterval) return;

      if(currentImage === (images.length-1)) currentImage = 0
      else currentImage += 1
      
      container && container.scrollTo( window.innerWidth * currentImage ,0)
      
      startSlider = new Date()
    },timeout)
  })


  // touch handlers
  let touchEndInt = 0;
  function cancelTimer(){
    if(touchEndInt) clearTimeout(touchEndInt)
    stopInterval = true
  }

  function onTouchEnd(){
    if(touchEndInt) clearTimeout(touchEndInt)
    touchEndInt = setTimeout(() => {
      stopInterval = false
      startSlider = new Date()
    },5000)
  }

  function onTouchCancel(){
    if(touchEndInt) clearTimeout(touchEndInt)
    touchEndInt = setTimeout(() => {
      stopInterval = false
      startSlider = new Date()
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

  // check if not touch input
  $effect(() => {
    const mm = window.matchMedia('(hover: none)')
    if(!mm || !mm.matches){
      stopInterval = true
    }
  })


</script>


<div class="container" bind:this={container}>

  {#each images as image, index }
    <button
      ontouchstart={cancelTimer}
      ontouchend={onTouchEnd}
      ontouchcancel={onTouchCancel}
    >
      <img src={image.thumbnail} 
        alt={image.title} 
        width={image.dimension.thumb.width} 
        height={image.dimension.thumb.height} 
        loading="lazy"
        data-index={index}
      />
    </button>
  {/each}

</div>

<style>
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

    button{
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

      button{
        margin-bottom: 1rem;
      }

      button, img{
        height: auto;
        aspect-ratio: unset;
      }
    }

  }
</style>