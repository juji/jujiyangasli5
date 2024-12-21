import { elmInView } from "./elm-in-view"

export function sectionInView( 
  elm: HTMLElement, 
  onIn?: (entry: IntersectionObserverEntry) => void,
  onOut?: (entry: IntersectionObserverEntry) => void,
){

  const id = elm.id
  
  elmInView({
    selector: `#${id}`,
    onIn(entry: IntersectionObserverEntry){
      const menu = document.querySelector(`#menuTop a[href="#${id}"]`) as HTMLAnchorElement
      menu && menu.classList.add('active')
      onIn && onIn(entry)  
    },
    onOut(entry: IntersectionObserverEntry) {
      const menu = document.querySelector(`#menuTop a[href="#${id}"]`) as HTMLAnchorElement
      menu && menu.classList.remove('active')  
      if(onOut) onOut(entry)
    },
    margin: '-1px 0px -1px 0px',
  })

}