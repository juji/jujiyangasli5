<script>
  import { page } from '$app/state';

  import 'sanitize.css';
  import 'sanitize.css/typography.css';
  import 'sanitize.css/assets.css';
  import 'sanitize.css/forms.css';
  import 'minireset.css';
  
  import '$lib/styles/fonts.css';
  import '$lib/styles/main.css';
  import 'sanitize.css/reduce-motion.css';
  import '$lib/styles/view-transition.css';

  import { viewTransition } from '$lib/functions/view-transition';
  import Footer from '$lib/components/footer.svelte'
  import LoadingIndicator from '$lib/components/loading-indicator.svelte';

  let { children } = $props();

  viewTransition();

</script>

<svelte:head>
  <link rel="icon" href={`${page.url.origin}/icons/favicon.ico`} sizes="any" />
  <link rel="icon" href={`${page.url.origin}/icons/favicon-16x16.png`} type="image/png" sizes="16x16" />
  <link rel="icon" href={`${page.url.origin}/icons/favicon-32x32.png`} type="image/png" sizes="32x32" />
  <link rel="icon" href={`${page.url.origin}/icons/android-chrome-192x192.png`} type="image/png" sizes="192x192" />
  <link rel="icon" href={`${page.url.origin}/icons/android-chrome-512x512.png`} type="image/png" sizes="512x512" />
  <link rel="icon" href={`${page.url.origin}/icons/favicon.svg`} type="image/svg+xml" />
  <link rel="apple-touch-icon" href={`${page.url.origin}/icons/apple-touch-icon.png`} sizes="180x180" />
  <link rel="mask-icon" href={`${page.url.origin}/icons/favicon.svg`} color="#000000" />
  <meta name="theme-color" content="#000000" />

  <title>Juji: Web Developer</title>
  <meta name="description" content="Hello, my name is Tri Rahmat Gunadi, and i like to code stuff." />
  <meta name="color-scheme" content="dark" />

  <meta property="og:url" content={`${page.url.origin}`} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Juji: Web Developer" />
  <meta property="og:description" content="Hello, my name is Tri Rahmat Gunadi, and i like to code stuff." />
  <meta property="og:image" content={`${page.url.origin}/images/juji-1200-630.jpeg`} />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={`${page.url.host}`} />
  <meta property="twitter:url" content={`${page.url.origin}`} />
  <meta name="twitter:title" content="Juji: Web Developer" />
  <meta name="twitter:description" content="Hello, my name is Tri Rahmat Gunadi, and i like to code stuff." />
  <meta name="twitter:image" content={`${page.url.origin}/images/juji-800-418.jpeg`} />

</svelte:head>

{@render children()}
<Footer />
<LoadingIndicator />