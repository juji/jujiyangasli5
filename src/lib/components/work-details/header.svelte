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
        text-shadow: var(--text-shadow);

        .work-title{
          background-color: rgba(0,0,0,0.8);
          border-radius: 21px;
          padding: 0.2rem 0.8rem;
          box-shadow: 
          rgba(50, 50, 93, 0.25) -3px -6px 13px 5px inset, 
          rgba(0, 0, 0, 0.3) -1px 7px 6px 1px inset, 
          rgb(237 237 237 / 40%) 0px 1px 2px 0px
          ;
          border: 1px solid #424242;
          display: none;

          @media screen and (min-width: 390px) {
            display: block;
          }
        }
        
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