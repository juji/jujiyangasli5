<script lang="ts">
  import Logo from './logo.svelte'
  import { sectionInView } from '$lib/modules/section-in-view';
	import { animate, scroll } from 'motion';

  let elm: HTMLElement
  let container: HTMLElement
  let logo: HTMLElement
  let hi: HTMLElement
  let name: HTMLElement
  let juji: HTMLElement
  let menu: HTMLElement

  let colors = [
    '#bfe600',
    '#00dee6',
    '#fb0',
    '#ff67e9',
    '#57bcff',
    '#fcf122' 
  ]

  // "web developer" color
  const webDevColor = [ ...colors, ...colors, ...colors ][
    Math.floor(Math.random() * colors.length * 3)
  ]

  $effect(() => { 
    const stop = sectionInView( elm ) 

    

    return () => {
      stop()
    }
  })

  let innerHeight: number = $state(0)
  let lastInnerHeight: number = 0
  let elmCancel: (() => void) | null

  function setParalax(){
    const elmHeight = container.getBoundingClientRect().height
    const translateY = elmHeight >= window.innerHeight ? 0 : (window.innerHeight * .9) - elmHeight
    elmCancel && elmCancel();
    elmCancel = scroll(animate(
      container,
      {
        transform: [ 
          `translateY(0px) rotateX(0deg) rotateY(0deg)`, 
          `translateY(${translateY}px) rotateX(20deg) rotateY(-30deg)`,
        ]
      }, { ease: 'easeOut' }
    ),{
      target: elm,
      offset: [ 0, `100vh` ]
    })
  }

  $effect(() => {

    if(!lastInnerHeight){
      lastInnerHeight = innerHeight
      setParalax()
      return;
    }
    
    if(Math.abs(innerHeight - lastInnerHeight) < 100) return;

    setParalax()

  })

  $effect(() => {
    return () => {
      elmCancel && elmCancel()
      elmCancel = null
    }
  })

</script>

<svelte:window bind:innerHeight={innerHeight}></svelte:window>

<div class="hero" id="home" bind:this={elm}>
  <div class="container" bind:this={container}>
    <header class="logo" bind:this={logo}>
      <Logo />
    </header>
    <div class="webdev">
      <p class="hi" bind:this={hi}>Hi, I'm a <span style={`color:${webDevColor}`}>web&nbsp;developer</span>.</p>
      <p class="smaller second" bind:this={name}>My name is <span>Tri&nbsp;Rahmat&nbsp;Gunadi,</span></p>
      <p class="smaller third" bind:this={juji}>but people call me juji..</p>
    </div>
    <div class="menu-bottom" bind:this={menu}>
      <a class="link" style="--delay:0ms" href="#works">Works</a>
      <a class="link" style="--delay:50ms" href="#play">Play</a>
      <a class="link" style="--delay:100ms" href="#techs">Techs</a>
      <a class="link" style="--delay:150ms" href="#contact">Contact</a>
      <a class="link outgoing" style="--delay:200ms" href="https://blog.jujiyangasli.com" target="_blank">Blog</a>
    </div>
  </div>
</div>

<style>
  @keyframes webdev {
    0% {
      opacity: 0;
      translate: 0 21px;
    }
    100% {
      opacity: 1;
      translate: 0 0px;
    }
  }

  .hero{

    height: 100vh;
    transform-origin: left bottom;
    perspective: 1000px;
    /* DO NOT REMOVE, for debuggin */
    /* background-color: rgba(255,255,255,0.8); */

    .container{
      display: inline-block;
    }

    .logo{

      padding: 1rem 0;
      display: flex;
      justify-content: space-between;

    }

    .webdev{

      filter: var(--drop-shadow);
      margin-top: 2rem;
      margin-bottom: 2rem;

      /* animation in the LCP is bad */
      /* p{
        animation-name: webdev;
        animation-duration: 200ms;
        animation-fill-mode: both;
        animation-timing-function: ease-out;
        animation-delay: 500ms;
      } */

      .hi{
        margin-bottom: 1.6rem;
        font-weight: 700;
        line-height: 2.3rem;
        font-size: 2.6rem;

        span{
          font-size: 2rem;
          @media screen and (min-width: 350px){
            font-size: unset;
          }
        }

        @media screen and (min-width: 350px){
          line-height: 2.3rem;
          font-size: 2.6rem;
        }
        
        @media screen and (min-width: 420px){
          line-height: 2.8rem;
          font-size: 3rem;
        }

        @media screen and (min-width: 560px){
          font-size: 4rem;
          line-height: 3.7rem;
        }
      }

      .smaller{
        font-size: 1.2rem;
        line-height: 1.8rem;
        font-weight: 600;

        @media screen and (min-width: 420px){
          font-size: 1.5rem;
          line-height: 2rem;
        }

        @media screen and (min-width: 560px){
          font-size: 2rem;
          line-height: 2.8rem;
        }

        &.second{
          animation-delay: 550ms;
          span{
            display: block;

            @media screen and (min-width: 350px) {
              display: inline;
            }
          }
        }

        &.third{
          animation-delay: 700ms;
        }
      }
    }

    .menu-bottom{
      display: inline-grid;
      gap: 1rem;

      grid-template-columns: auto auto;
      grid-template-rows: auto auto auto;
      margin-top: 1rem;
      
      @media screen and (min-width: 382px) {
        grid-template-columns: auto auto auto auto auto;
        grid-template-rows: auto;
        margin-top: 0rem;
      }

      a.link{
        --delay: 0ms;
        animation-name: webdev;
        animation-duration: 200ms;
        animation-fill-mode: both;
        animation-timing-function: ease-out;
        animation-delay: calc(700ms + var(--delay));
        font-weight: 600;
        filter: var(--drop-shadow);
      }
    }

  }
</style>