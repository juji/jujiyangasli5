<script lang="ts">
  import Container from "../container.svelte";
  import type { Work } from "$lib/data/works/types";
  import { page } from '$app/state';

  let { data }: { data: { 
    work: Work
    content: string 
  } } = $props();

  function onBackButton(ev: MouseEvent){
    
    const lastDomain = document.referrer.replace(/https?\:\/\//,'').split('/')[0]
    const hasReferrer = !!lastDomain
    const sameDomain = page.url.host === lastDomain
    
    console.log({
      referrer: document.referrer,
      lastDomain, hasReferrer, sameDomain
    })

    if(hasReferrer && sameDomain){
      ev.preventDefault()
      history.back()
    }
    
  }

</script>

<header>
  <Container>
    <div class="header-container">
      <h1>
        <span class="logo"><a href="/">juji };</a></span>
        <span class="work-title">{data.work.title}</span>
      </h1>
      <div class="back-button">
        <a onclick={onBackButton} href={`/#${data.work.id}`}>◀ Home</a>
      </div>
    </div>
  </Container>
</header>

<style>
  header{

    position: sticky;
    top: 0;
    z-index: 20;
    background: rgb(from var(--background-color) r g b / 0.2);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    
    .header-container{
      padding: 1rem 0;
      display: flex;
      justify-content: space-between;

      h1{
        .logo{
          font-family: 'Grandstander';
          font-size: 21px;
          margin-right: 1rem;
          a {
            color: var(--text-color);
            text-decoration: none;
          }  
        }
      }
    }

  }

</style>