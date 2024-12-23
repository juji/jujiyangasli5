import { onNavigate, beforeNavigate, afterNavigate } from '$app/navigation';

export function viewTransition(){

  beforeNavigate(() => {
    document.querySelector('html')?.classList.add('no-smooth')
  })

  afterNavigate(() => {
    document.querySelector('html')?.classList.remove('no-smooth')
  })

  onNavigate((navigation) => {
    
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });

  });
  
}