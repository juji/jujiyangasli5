<script>

  import MenuButton from "./menu-button.svelte";

  let js = $state(false)
  let open = $state(false)
  $effect(() => {if(!js) js = true})
  
</script>


<div class="menu-top" class:js id="menuTop">
  <MenuButton onClick={() => {open = !open}} />
  
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="menu-container" class:open onclick={() => {open = !open}} tabindex="0" role="button">
    <nav class="menu-content">
      <a style="--link-delay-in: 0ms" class="link" href="#home">Home</a>
      <a style="--link-delay-in: 100ms" class="link" href="#works">Works</a>
      <a style="--link-delay-in: 200ms" class="link" href="#play">Play</a>
      <a style="--link-delay-in: 300ms" class="link" href="#techs">Techs</a>
      <a style="--link-delay-in: 400ms" class="link" href="#contact">Contact</a>
      <a style="--link-delay-in: 500ms" class="link outgoing" href="https://blog.jujiyangasli.com" target="_blank">Blog</a>
    </nav>
  </div>
</div>

<style>

  .menu-top{
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 1;
    left: calc(50% + calc(min(100%, var(--page-width)) / 2) - 48px - var(--page-padding));
    top: 27px;

    @media screen and (min-width: 380px) {
      left: calc(50% + calc(min(100%, var(--page-width)) / 2) - 64px - var(--page-padding));
      top: 42px;
    }

    @media screen and (min-width: 500px) {
      top: 64px;
    }

    &:not(.js){

      .menu-container{
        position: absolute;
        top: calc(50% + 3rem - 95px);
        background-color: hsl(from var(--background-color) h s l / 0.6);
        overflow: hidden;
        height: 0;
        padding: 1rem;
        padding-top: 80px;
        padding-bottom: 1rem;
        opacity: 0;
        border-top-left-radius: 3rem;
        border-top-right-radius: 3rem;
        border-bottom-left-radius: 3rem;
        border-bottom-right-radius: 3rem;
        outline: 1px solid hsl(from var(--text-color) h s l / 0.6);
        overflow: hidden;
        transition: 
          opacity 300ms, 
          height 300ms,
          border-bottom-left-radius 200ms,
          border-bottom-right-radius 200ms,
          padding-top 200ms,
          padding-bottom 200ms
        ;

        .menu-content{

          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          
          a{
            display: block;
    
            &:first-child{
              margin-top: 1rem;
            }
          }
        }
  
      }

      :global(&:has(button:hover)), &:has(.menu-container:hover){
        .menu-container{
          height: auto;
          opacity: 1;
          padding: 1rem;
          padding-top: 96px;
          padding-bottom: 21px;
          border-bottom-left-radius: 1rem;
          border-bottom-right-radius: 1rem;
  
          transition: 
            opacity 200ms,
            height 300ms 100ms,
            border-bottom-left-radius 200ms 100ms,
            border-bottom-right-radius 200ms 100ms,
            padding-top 200ms 100ms,
            padding-bottom 200ms 100ms
          ; 
          
        }
      }
    }


    &.js{
      .menu-container{
        /* display: none; */
        position: fixed;
        top: 0;
        left: 100vw;
        width: 100vw;
        height: 100vh;
        backdrop-filter: blur(10px);
        background: linear-gradient(
          240deg, 
          rgba(0,0,0,1) calc(100% - var(--page-width) - calc(100% - var(--page-width)) + 100px), 
          rgba(0,0,0,0) 100%
        );

        opacity: 0;
        transition: opacity 300ms 100ms, left 0ms 400ms;

        .menu-content{
          max-width: var(--page-width);
          padding: 0 var(--page-padding);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-end;
          height: 100vh;
          padding-top: 5rem;
          a{

            --link-delay-in: 0ms;

            padding: 0.5rem 0;
            padding-right: 2rem;
            font-size: 21px;
            opacity: 0;
            transform: translateY(21px);
            transition: 
              opacity 100ms, 
              transform 100ms
            ;
          }
        }

        &.open{
          left: 0vw;
          opacity: 1;
          transition: opacity 300ms, left 0ms;

          .menu-content a {
            transition: 
              opacity 200ms var(--link-delay-in), 
              transform 200ms var(--link-delay-in)
            ;
            opacity: 1;
            transform: translateY(0px);
          }
        }
      }

      .menu-content{
        a{
          font-weight: 600;
          :global(&.active){
            text-decoration: underline;
            text-decoration-thickness: 5px;
            text-decoration-color: var(--active-link-color);
          }
        }

      }

    }
  }
    
</style>
