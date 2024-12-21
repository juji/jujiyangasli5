<script lang="ts">
  import { sectionInView } from '$lib/functions/section-in-view';

  let elm:HTMLElement
  $effect(() => { 
    sectionInView( elm ) 
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
      <div class="github">
        <img src="/images/contact-logo/github.svg" alt="github" />
        <a href="https://github.com/juji" 
          target="_blank" 
          rel="noreferrer noopener"
          aria-label="github link"></a>
      </div>
      <div class="npm">
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
  }

</style>