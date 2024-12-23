<script>
	import { page } from '$app/state';
  import GrainyThing from '$lib/components/grainy-thing/index.svelte'
</script>


<GrainyThing />
<div class="wrapper">
<svg style="visibility: hidden; position: absolute;" width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="roundcorner"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />    
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
      <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
    </filter>
  </defs>
</svg>
{#if page.status === 404}
    <h1>Nope..</h1>
    <p>
      We don't have that page..<br />
      It's a 404
    </p>
{:else}
    <h1>Whoaa..!!</h1>
    <p>
      Something bad just happened..<br />
      The developer has been notified.
    </p><br /><br />
    <p>He's probaly playing games right now..</p>
  {/if}
  <br />
  <br />
  <a href="/">Go To Main Page</a>
  </div>

<style>

  .wrapper{
    position: relative;
    max-width: var(--page-width);
    padding: var(--page-padding);
    margin: 0 auto;
    z-index: 1;
    mix-blend-mode: exclusion;
  }


  h1{
    font-size: 64px;
    font-weight: 600;
    margin-bottom: 2rem;
    color: var(--text-color);

    @media screen and (min-width: 614px) {
      font-size: 120px;
      margin-bottom: 1rem;
    }

    @media screen and (min-width: 945px) {
      font-size: 200px;
    }
  }

  p{
    font-size: larger;
    font-weight: bold;
    display: inline;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    background: var(--text-color);
    color: var(--background-color);
    padding: 0.3rem 1rem;
    filter: url('#roundcorner');

    @media screen and (min-width: 614px) {
      font-size: xx-large;
    }
  }

  a{
    font-size:larger;
    font-weight: bold;
    @media screen and (min-width: 614px) {
      font-size:xx-large;
    }
  }
</style>
