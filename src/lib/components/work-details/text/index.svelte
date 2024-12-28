<script lang="ts">
  import type { Work } from '$lib/data/works/types';
  import SvelteMarkdown from 'svelte-markdown'
  import Link from './link.svelte'

  let { data }: { data: { 
    work: Work
    content: string 
  } } = $props();

  let js = $state(false)
  $effect(() => { js = true })

  let sticky: HTMLElement
  let innerHeight = $state(0)
  let stickyTop = $state(0)
  $effect(() => {
    var style = window.getComputedStyle(document.body)
    const headerHeight = Number(style.getPropertyValue('--header-height').replace('px',''))
    const elmHeight = sticky.getBoundingClientRect().height
    if(
      elmHeight <=
      (innerHeight - headerHeight)
    ) {
      stickyTop = 0  
    }else{
      stickyTop = elmHeight - window.innerHeight + headerHeight + 55 // padding
    }

  })

  let { work, content } = data
  const urlText = work.url.replace(/https?\:\/\/(www\.)?/,'')

</script>

<svelte:window bind:innerHeight={innerHeight} />

<div class="container" style={`--sticky-top: ${stickyTop}px;`}>
  <div class="sticky-container" class:js bind:this={sticky}>

    <p><a href={work.url} rel="noopener noreferrer" target="_blank">{urlText}</a></p>
    <p>Year: {work.year}</p>
    <br />
    <SvelteMarkdown source={content} 
      renderers={{ link: Link }} 
    />
  </div>
</div>

<style>
  .container{

    --topbar-height: var(--header-height);
    --sticky-top: 0;

    line-height: 1.8rem;
    
    .sticky-container{
      padding-top: 3rem;

      &.js{
        position: sticky;
        top: calc(var(--topbar-height) - var(--sticky-top));
        /* bottom: 0; */
      }
    }

    :global(ul),:global(ol){ 
      margin-left: 1.2rem;
    }

    :global(p){
      margin-bottom: 1rem;
    }

    :global(blockquote) {
      background-color: rgb(54, 54, 54);
      padding: 1.6rem 2rem;
      position: relative;
      overflow: hidden;
      z-index: 0;
      margin-bottom: 1rem;
      border-radius: 8px;

      &:before{
        font-family: Times New Roman,Times,serif;
        content: "”";
        position: absolute;
        top: 34px;
        left: 0;
        font-size: 144px;
        color: #505050;
        z-index: -1;
      }
    }

    :global(blockquote p) {
      margin:0;
      padding:0; 
    }

    @media screen and (min-width: 768px) {
      max-width: 500px;
      margin-left: auto ;
      margin-right: auto ;
    }

    @media screen and (min-width: 1024px) {
      padding-left: 2rem;
    }

  }
</style>