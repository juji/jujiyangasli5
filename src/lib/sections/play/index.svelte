<script lang="ts">
	import type { Play } from '$lib/data/play/types';


  import { sectionInView } from '$lib/functions/section-in-view';

  let { play } : { play: Play[] } = $props()
  let elm: HTMLElement
  $effect(() => { sectionInView( elm ) })

</script>


<section class="container" id="play" bind:this={elm}>
  <h2 class="section-title">Play</h2>
  <p>
    Things learned, 
    or just playing around: 
    <a target="_blank" 
      rel="noreferrer nofollower"
      class="outgoing" 
      href="https://jujiplay.com">https://jujiplay.com</a>
  </p>
  <br /><br />
  <div class="grid">
    {#each play as item}
      <div class="item">
        <img src={item.image} alt={item.title} loading="lazy" />
        <p>{item.title}</p>
        <a 
          aria-label={item.title}
          href={item.url} 
          target="_blank" 
          rel="noreferrer noopenner"></a>
      </div>
    {/each}
  </div>
</section>

<style>
  .container{
    margin-bottom: 4rem;

    .grid{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
      gap: 3px;

      .item{

        aspect-ratio: 16 / 9;
        overflow: hidden;
        background-color: black;
        position: relative;

        p{
          position: absolute;
          right: 0;
          bottom: 0;
          z-index: 1;
          padding: 5px 8px;
        }

        a{
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        img{
          display: block;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          scale: 1.1;
          transition: scale 300ms;
        }
        
        &:hover{
          outline: 2px solid var(--link-color);
          img{
            scale: 1.5
          }
        }

        &:active{
          outline: 2px solid var(--active-link-color);
          img{
            scale: 1
          }
        }


      }

    }
  }
</style>