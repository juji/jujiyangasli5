import { inView } from "motion";

export function elmInView({
  selector,
  onIn,
  onOut,
  margin = "0px 0px 0px 0px",
}:{
  selector: string, 
  onIn: (entry: IntersectionObserverEntry) => void,
  onOut: (entry: IntersectionObserverEntry) => void,
  margin?: string
}){

  inView(selector, (info) => {
    
    // entering viewport
    onIn(info)

    // leaving
    return (leaveInfo) => { onOut(leaveInfo) }
    
  // @ts-expect-error
  },{ margin })

}