<script lang="ts">
  import Container from "../container.svelte";
  import type { Work } from "$lib/data/works/types";
  import { page } from '$app/state';

  let { data }: { data: { 
    work: Work
    content: string 
  } } = $props();

  function onBackButton(ev: MouseEvent){
    ev.preventDefault()
    history.back()
  }

</script>

<header>
  <Container>
    <div class="header-container">
      <div class="heading">
        <a href="/">juji&nbsp;};</a>
        <h1 class="work-title">{data.work.title}</h1>
      </div>
      <div class="back-button">
        <a onclick={onBackButton} href={`/#${data.work.id}`}>◀ Back</a>
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

      .heading{
        display: flex;
        align-items: center;
        a {
          color: var(--text-color);
          text-decoration: none;
          font-family: 'Grandstander';
          font-size: 21px;
          margin-right: 1rem;
        } 
      }
    }

  }

</style>