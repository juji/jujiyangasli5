<script lang="ts">
  import { sectionInView } from '$lib/functions/section-in-view';

  let elm:HTMLElement
  $effect(() => { 
    const stop = sectionInView( elm ) 
    return () => { stop() }
  })

</script>


<section class="container" id="contact" bind:this={elm}>

  <h2>About Me:</h2>

  <address class="left">
    <p>my name is</p>
    <p class="name">Tri Rahmat Gunadi</p>
    <p class="nick">But people call me juji..</p><br />
    <p class="mail"><a href="mailto:him@jujiyangasli.com">him@jujiyangasli.com</a></p>
    <p class="city">Tangerang, Indonesia</p>
  </address>

  <div class="right">
    <div class="play">
      <a href="https://jujiplay.com" target="_blank"
        rel="noreferrer noopener"
      >https://jujiplay.com</a>
    </div>
    <div class="blog">
      <a href="https://blog.jujiyangasli.com" target="_blank"
        rel="noreferrer noopener"
      >https://blog.jujiyangasli.com</a>
    </div>
    <div class="icons">
      <div class="github icon">
        <img src="/images/contact-logo/github.svg" alt="github" />
        <a href="https://github.com/juji" 
          target="_blank" 
          rel="noreferrer noopener"
          aria-label="github link"></a>
      </div>
      <div class="npm icon">
        <img src="/images/contact-logo/npm.svg" alt="npm" />
        <a href="https://www.npmjs.com/~juji_" 
          target="_blank" 
          rel="noreferrer noopener"
          aria-label="npm link"></a>
      </div>
    </div>
  </div>

  <p class="copy">
    @ 2024 by Tri Rahmat Gunadi
  </p>
  <p class="made">
    Made with <span class="red">♥️</span> + <a href="https://svelte.dev/" 
      rel="noreferrer noopener"
      target="_blank">svelte</a>
  </p>
</section>

<style>

  .container{

    margin: 4rem 0;

    h2{
      margin-bottom: 2rem;
    }

    .left{
      .name{
        font-size: 1.2rem;
      }

      .mail{
        margin-bottom: 1rem;
      }

      margin-bottom: 2rem;
    }

    .right{

      display: flex;
      flex-direction: column;
      gap: 5px;

      .icons{
        display: flex;
        align-items: center;
        gap: 21px;
        padding: 2rem 0;

        .icon{
          position: relative;
          a{
            position: absolute;
            top:0;
            left:0;
            width: 100%;
            height: 100%;
          }
        }
      }

      img{
        height: 2rem;
        width: auto;
      }

      margin-bottom: 2rem;
    }

    .copy{
      color: var(--muted-color);
    }

    .made{
      margin-top: 1rem;
    }
  }

</style>