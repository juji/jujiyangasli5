import { onNavigate, beforeNavigate, afterNavigate } from '$app/navigation';
import { globalState } from './global.svelte';

const wait = (timeout: number) => new Promise(r => setTimeout(r,timeout))

export function viewTransition(){

  beforeNavigate(async () => {
    document.querySelector('html')?.classList.add('no-smooth')
    globalState.loading = true
  })

  afterNavigate(() => {
    document.querySelector('html')?.classList.remove('no-smooth')
    globalState.loading = false
  })

  onNavigate(async (navigation) => {
    
    if (!document.startViewTransition) return;

    
    if(globalState.viewTransitionDelay){
      await wait(globalState.viewTransitionDelay)
      globalState.viewTransitionDelay = 0
    }

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        
        // blindly wait for assets to load
        if(globalState.waitForAssets){
          await wait(globalState.waitForAssets)
          globalState.waitForAssets = 0
        }
        
        await navigation.complete

      });
    });

  });
  
}