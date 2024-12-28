

export function noHover(){
  return !window.matchMedia('(hover: none)') || 
    window.matchMedia('(hover: none)').matches
}