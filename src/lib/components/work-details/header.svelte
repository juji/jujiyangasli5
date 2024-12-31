<script lang="ts">
  import Container from "../container.svelte";
  import type { Work } from "$lib/data/works/types";

  let { data, onBackButton }: { 
    data: { 
      work: Work
      content: string 
    },
    onBackButton: (work: Work) => void
  } = $props();

  function onBackButtonLocal(ev: MouseEvent){
    ev.preventDefault()
    onBackButton(data.work)
    history.back()
  }

</script>

<header style={`--gradient:${data.work.gradientColor}`}>
  <Container>
    <div class="header-container">
      <div class="heading">
        <a href="/">juji&nbsp;};</a>
        <h1 class="work-title">{data.work.title}</h1>
      </div>
      <div class="back-button">
        <a 
          onclick={onBackButtonLocal}
          href={`/#${data.work.id}`}>◀ Back</a>
      </div>
    </div>
  </Container>
</header>

<style>
  header{

    --gradient: rgb(0 0 0 / 1);

    position: sticky;
    height: var(--header-height);
    top: 0;
    z-index: 20;
    background: rgb(from var(--background-color) r g b / 0.2);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);

    @media screen and (max-width: 1023px){
      background: radial-gradient(
        circle at 0% 0%, 
        var(--gradient) 5%, 
        hsl(0 0% 0% / 0.7) 80%
      );
    }
    
    .header-container{
      padding: 1rem 0;
      display: flex;
      justify-content: space-between;

      .heading{
        display: flex;
        align-items: center;
        text-shadow: 1px 1px 1px var(--shadow-color);

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