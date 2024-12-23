import { onNavigate, beforeNavigate, afterNavigate } from '$app/navigation';
import { globalState } from './global.svelte';

const wait = (timeout: number) => new Promise(r => setTimeout(r,timeout))

export function viewTransition(){

  beforeNavigate(async () => {
    document.querySelector('html')?.classList.add('no-smooth')
  })

  afterNavigate(() => {
    document.querySelector('html')?.classList.remove('no-smooth')
  })

  onNavigate(async (navigation) => {
    
    if (!document.startViewTransition) return;

    await wait(globalState.viewTransitionDelay)
    globalState.viewTransitionDelay = 0
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      });
    });

  });
  
}