<script lang="ts">
	import type { TechItem } from '$lib/data/techs/types';
	import { noHover } from '$lib/modules/no-hover';
  import { sectionInView } from '$lib/modules/section-in-view';
	import { inView } from 'motion';

  let { techs } : { techs: TechItem[][] } = $props()
  let elm: HTMLElement
  let js = $state(false)
  $effect(() => { 
    const stop = sectionInView( elm ) 
    js = true
    return () => {
      stop()
    }
  })

  $effect(() => {
    
    const stop = inView('.grid',( info ) => {
      info.target.classList.add('visible')
      return () => {
        info.target.classList.remove('visible')
      }
    },{
      margin: '999% 0% -89px 0%',
      amount: 'some'
    })

    return () => {
      stop()
    }
  })

  // svelte-ignore (non_reactive_update)
  let animDelay = 0

  function onMouseEnter(e: MouseEvent){

    if(noHover()) return true;

    const div = e.target as HTMLDivElement
    const bound = div.getBoundingClientRect()
    console.log('div', div)
    // use height, since width has children
    // it's a square
    let relativeMouseX = (e.x - bound.x) / bound.height
    div.style.setProperty('--relative-mouse-x', relativeMouseX+'')
    function onMove(mouse: MouseEvent){
      relativeMouseX = (mouse.x - bound.x) / bound.height
      div.style.setProperty('--relative-mouse-x', relativeMouseX+'')
    }
    
    function onOut(mouse: MouseEvent){
      const relativeMouse = (mouse.x - bound.x) / bound.height
      if(relativeMouse < 0.5) div.style.setProperty('--relative-mouse-x', '0')
      else div.style.setProperty('--relative-mouse-x', '1')
      window.removeEventListener('mousemove', onMove)
      div.removeEventListener('mouseleave',onOut)
    }

    window.addEventListener('mousemove', onMove)
    div.addEventListener('mouseleave',onOut)
  }

</script>

<svg xmlns="http://www.w3.org/2000/svg" class="hidden">
  <filter id="gootech">
    <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blurtech" />
    <feColorMatrix in="blurtech" type="matrix" 
      values="1 0 0 0 0  
              0 1 0 0 0  
              0 0 1 0 0  
              0 0 0 7 -2" 
      />
      <!-- 0 0 0 6 -2 is realistic -->
      <!-- 0 0 0 7 -2 is more dreamy -->
  </filter>
</svg>
<section class="container" id="techs" bind:this={elm}>
  <h2 class="section-title">
    Techs
  </h2>
  <p>Things i've used in my work,</p><p>Still learning bunch of stuff</p><br />
  <div class="grid" class:js role="complementary">
    {#each techs as techrow}
    {#each techrow as item}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="item-container">
        <div class="item"
          id={`tech-${item.id}`} 
          style={`--in-delay:${animDelay++};--mask-image:url(${item.image})`} 
          onmouseenter={onMouseEnter}>
          <img src={item.image} alt={item.title} loading="lazy" />
          <span class={'metalic matte'}></span>
          <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.title}></a>
        </div>
      </div>
    {/each}
    {/each}
  </div>
</section>

<style>

  svg.hidden{
    height: 0;
    width: 0;
    position: absolute;
  }

  .container{

    margin-bottom: 8rem;
    
    .grid{
      display: -webkit-grid;
      display: grid;
      height: auto;
      
      /* https://css-tricks.com/a-responsive-grid-layout-with-no-media-queries/ */
      grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
      
      gap: 3px;
      
      
      --delay-mult: 80ms;
      --relative-mouse-x: 0;
      --mask-image: url(unknown.svg);
      --image-padding: 1.2rem;
      
      .item-container{
        perspective: 500px;
        transform-style: preserve-3d;
      }


      .item{
        aspect-ratio: 1;
        border: 1px solid var(--border-color);
        position: relative;
        background: rgb( from var(--tech-color) r g b / 0);
        border-radius: 3px;
        transition: 
          transform 100ms ease-out,
          opacity 100ms ease-out,
          background 1000ms 500ms,
          border 2000ms 500ms
        ;
        opacity: 1;
        transform: rotateY(0deg);
        overflow: hidden;

        img{
          display: block;
          width: 100%;
          height: 100%;
          object-position: center center;
          object-fit: contain;
          padding: var(--image-padding);
        }

        span{
          filter: url(#gootech);
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;

          &:before{
            content: '';
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background-image: var(--mask-image);
            background-position: center center;
            background-size: calc(100% - calc(var(--image-padding) * 2));
            opacity: 0.3;
          }

          &:after{
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 400%; /* this just feels right. width = speed */
            height: 100%;
            transform: translateX(calc(var(--relative-mouse-x) * 75%));
            transition: transform 0ms ease-out;
          }

          /* 
            so, these are something.. 
            matte, spotuv and metallic
            I'm just gonna keep these
          */

          &:global(.matte:before){
            /* light should make thing bigger */
            top: -2px;
            left: -2px;
            width: calc(100% + 4px);
            height: calc(100% + 4px);
            /* give some blur for the matte effect */
            filter: blur(2px);
          }
          
          &:global(.spotuv:after){
            background: linear-gradient(
              111deg, 
                rgb(0 0 0 / 0) 0%,
                rgb(0 0 0 / 0) 30%,
                rgb(255 255 255 / .2) 31%,
                rgb(255 255 255 / .3) 41%,
                rgb(255 255 255 / .2) 59%,
                rgb(0 0 0 / 0) 60%,
                rgb(0 0 0 / 0) 100%
            );
          }
          
          &:global(.metalic:after){
            background: linear-gradient(
              111deg, 
                rgb(0 0 0 / 0) 0%,
                rgb(0 0 0 / 0) 30%,
                rgb(255 255 255 / .2) 39%,
                rgb(255 255 255 / .3) 41%,
                rgb(255 255 255 / .2) 43%,
                rgb(0 0 0 / 0) 60%,
                rgb(0 0 0 / 0) 100%
            );
          }
        }


        /* Some images are SpeCialEr than others */
        /* Yeah, i'm pissed. maybe find new image */
        &#tech-svelte span:before{
          background-size: calc(100% - 3rem);
        }

        &#tech-s3 span:before{
          background-size: calc(100% - 3rem);
        }

        

        a{
          position: absolute;
          top: 0;
          right: 0;
          width: 400%;
          height: 100%;
          z-index: 2;
          background: linear-gradient(
            111deg, 
              rgb(0 0 0 / 0) 0%,
              rgb(0 0 0 / 0) 40%,
              rgb(255 255 255 / .3) 41%,
              rgb(255 255 255 / .3) 59%,
              rgb(0 0 0 / 0) 60%,
              rgb(0 0 0 / 0) 100%
          );
        }

      }

      &.js{
        .item{
          opacity: 0;
          transform: rotateY(45deg);
        }

        a{
          transform: translateX(0%);
        }
      }

      &:global(.visible){
        .item{
          transition: 
            transform 400ms ease-out calc(var(--in-delay) * var(--delay-mult)),
            opacity 100ms ease-out calc(var(--in-delay) * var(--delay-mult)),
            background 1000ms 500ms,
            border 2000ms 500ms
          ;
          transform: rotateY(0deg);
          opacity: 1;

          a{
            transition: transform 400ms ease-out calc(var(--in-delay) * var(--delay-mult));
            transform: translateX(75%);
          }

          @media screen and (hover: none) {
            --delay-mult: 40ms;
          }

        }
      }

      /* .item:hover:before{
        transition: transform 200ms ease-out 0ms;
        transform: translateX(75%);
      } */

      .item:hover, .item:has(a:focus) {
        transition: 
          transform 200ms ease-out,
          opacity 200ms ease-out calc(var(--in-delay) * var(--delay-mult)),
          background 0ms,
          border 0ms
        ;

        border: 1px solid hsl(from var(--background-color) h s calc(l + 42));

        img{
          scale: 1;
        }
      }

      .item:has(a:focus){
        outline: 1px solid var(--active-link-color);
      }

    }
  }
</style>