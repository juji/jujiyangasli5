import { onNavigate, beforeNavigate, afterNavigate } from '$app/navigation';
import { globalState } from './global.svelte';

const wait = (timeout: number) => new Promise(r => setTimeout(r,timeout))

export function viewTransition(){

  beforeNavigate(() => {
    document.querySelector('html')?.classList.add('loading')
    globalState.loading = true
  })

  afterNavigate(() => {
    document.querySelector('html')?.classList.remove('loading')
    globalState.loading = false
  })

  onNavigate(async (navigation) => {
     
    if(globalState.viewTransitionDelay){
      await wait(globalState.viewTransitionDelay)
      globalState.viewTransitionDelay = 0
    }
    
    if(globalState.waitForAssets){
      await globalState.waitForAssets
      globalState.waitForAssets = null
    }

    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      });
    });

  });
  
}