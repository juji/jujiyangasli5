import { inView } from "motion";

export function sectionInView( 
  elm: HTMLElement, 
  onIn?: (entry: IntersectionObserverEntry) => void,
  onOut?: (entry: IntersectionObserverEntry) => void,
){

  const id = elm.id

  return inView(`#${id}`, (info: IntersectionObserverEntry) => {
    
    // entering viewport
    const menu = document.querySelector(`#menuTop a[href="#${id}"]`) as HTMLAnchorElement
    menu && menu.classList.add('active')
    onIn && onIn(info)

    // leaving
    return (leaveInfo) => { 
      const menu = document.querySelector(`#menuTop a[href="#${id}"]`) as HTMLAnchorElement
      menu && menu.classList.remove('active')  
      onOut && onOut(leaveInfo) 
    }
    
  },{
    margin: '-1px 0px -10% 0px',
    amount: 0.5
  })

}