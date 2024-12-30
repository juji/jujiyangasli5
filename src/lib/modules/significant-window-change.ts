type Vars = {
  lastWindowHeight: number
  lastWindowWidth: number
}

// 
export const onSignificantWindowChange = (() => {

  const vars: Vars = {
    lastWindowHeight: 0,
    lastWindowWidth: 0,
  }
  
  function isSignificant(innerWidth: number, innerHeight: number, significantChange: number){
    // when one is significant
    const widthSig = Math.abs(innerWidth - vars.lastWindowWidth) >= significantChange
    const heightSig = Math.abs(innerHeight - vars.lastWindowHeight) >= significantChange
    return widthSig || heightSig
  }
  
  return function onSignificantWindowChange( par: {
    onChange: () => void
    debounce?: boolean
    debounceTimeout?: number
    significantChange?: number
  }){
  
    const {
      onChange,
      debounce = false,
      debounceTimeout = 50,
      significantChange = 150,
    } = par
  
    if(vars.lastWindowHeight === 0) 
      vars.lastWindowHeight = window.innerHeight
  
    if(vars.lastWindowWidth === 0) 
      vars.lastWindowWidth = window.innerWidth
  
    function listen(){
      
      if(
        isSignificant(
          window.innerWidth,
          window.innerHeight,
          significantChange
        )
      ) onChange()
  
      vars.lastWindowHeight = window.innerHeight
      vars.lastWindowWidth = window.innerWidth
    
    }
  
    let to = 0
    function debounced(){
      if(to) clearTimeout(to)
      to = setTimeout(() => {
        to = 0
        listen()
      }, Math.min(0, debounceTimeout))
    }
    
    window.addEventListener('resize', debounce ? debounced : listen )
  
    return () => {
      if(to) clearTimeout(to)
      window.removeEventListener('resize', debounce ? debounced : listen )
    }
  
  }

})()

