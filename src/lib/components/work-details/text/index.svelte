<script lang="ts">
  import type { Work } from '$lib/data/works/types';
  import SvelteMarkdown from 'svelte-markdown'
  import Link from './link.svelte'

  let { data }: { data: { 
    work: Work
    content: string 
  } } = $props();

  let { work, content } = data
  const urlText = work.url.replace(/https?\:\/\/(www\.)?/,'')

</script>

<div class="container">
  <p><a href={work.url} rel="noopener noreferrer" target="_blank">{urlText}</a></p>
  <p>Year: {work.year}</p>
  <br />
  <SvelteMarkdown source={content} 
    renderers={{ link: Link }} 
  />
</div>

<style>
  .container{
    line-height: 1.9rem;
    margin-top: 3rem;

    :global(ul),:global(ol){ 
      margin-left: 1.2rem;
    }

    :global(p){
      margin-bottom: 1rem;
    }

    :global(blockquote) {
      background-color: rgb(64 64 64 / 34%);
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
        color: #333;
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