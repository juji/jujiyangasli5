import { elmInView } from "./elm-in-view"

export function sectionInView( 
  elm: HTMLElement, 
  onIn?: (entry: IntersectionObserverEntry) => void,
  onOut?: (entry: IntersectionObserverEntry) => void,
){

  const id = elm.id
  const menu = document.querySelector(`#menuTop a[href="#${id}"]`) as HTMLAnchorElement

  elmInView({
    selector: `#${id}`,
    onIn(entry: IntersectionObserverEntry){
      menu.classList.add('active')
      onIn && onIn(entry)  
    },
    onOut(entry: IntersectionObserverEntry) {
      menu.classList.remove('active')  
      if(onOut) onOut(entry)
    },
    margin: '-80% 0px -19% 0px'
  })

}