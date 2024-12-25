;(function(){

  function randomColor(){
    return 'rgba(' + 
      (70 + Math.round(Math.random()*185)) + ',' +
      (70 + Math.round(Math.random()*185)) + ',' +
      (70 + Math.round(Math.random()*185)) + ',' +
      1+
    ')'
  }

  function randomSize(){
    return 2 * Math.random()
  }

  let colors: string[] = []
  let radiuses: number[] = []
  let canvas: OffscreenCanvas
  let started = false
  let paused = false
  let bufferData:Float32Array
  let sal: number;
  let dpr: number
  let translateTop: number = 0

  function setupCanvas(){
    if(!canvas) throw new Error('no canvas')
    
    const ctx = canvas.getContext('2d')

    ctx?.translate( 
      canvas.width / 2, 
      canvas.height / 2
    )
    ctx?.rotate(-0.2)
  }

  function start(){
    started = true

    if(!canvas) throw new Error('no canvas')
    const context = canvas.getContext('2d')
    if(!context) throw new Error('canvas context is gone')

    requestAnimationFrame(function render(){

      if(paused) return;
      
      context.clearRect(
        -1 * canvas.width,
        -1 * canvas.height, 
        canvas.width * 2, 
        canvas.height * 2
      )

      let num = colors.length
      while(num--){
        context.beginPath();
        context.arc(
          bufferData[ num * sal + 0 ],
          bufferData[ num * sal + 1 ]
           - (bufferData[ num * sal + 5 ] * canvas.height)
           - (translateTop / 10)
          ,
          radiuses[ num ], 
          0, 2 * Math.PI
        )
        context.fillStyle = colors[num]
        context.fill()
      }

      requestAnimationFrame(render)

    })

  }

  self.onmessage = (e: MessageEvent) => {

    const { data } = e
    const { 
      num, 
      canvas: c, 
      sharedBuffer,
      dataLength,
      pause, 
      play,
      width: w,
      height: h,
      devicePixelRatio,
      scroll
    } = data

    if(typeof scroll !== 'undefined' && started){
      translateTop = scroll
      return;
    }

    if(w && h && started && canvas && devicePixelRatio){

      if(w === canvas.height){
        // rotated
        canvas.height = h
        canvas.width = w
      }else{
        // just change the width
        canvas.width = w
      }

      dpr = devicePixelRatio
      setupCanvas()
      return;
    }

    if(pause && started){
      paused = true
      return;
    }

    if(pause && !started){
      throw new Error('not started')
    }

    if(play && paused){
      paused = false
      start()
      return;
    }

    if(play && !paused){
      throw new Error('not paused')
    }

    if(!num){
      throw new Error('num not recieved')
    }

    if(!c){
      throw new Error('canvas not recieved')
    }

    if(!sharedBuffer){
      throw new Error('sharedBuffer not recieved')
    }

    if(!w){
      throw new Error('width not recieved')
    }

    if(!h){
      throw new Error('height not recieved')
    }

    if(!dataLength){
      throw new Error('dataLength not recieved')
    }

    if(!devicePixelRatio){
      throw new Error('devicePixelRatio not recieved')
    }

    for(let i =0;i<num;i++){
      colors.push(randomColor())
      radiuses.push(randomSize())
    }

    sal = dataLength
    bufferData = new Float32Array(sharedBuffer)
    canvas = c
    canvas.width = w
    canvas.height = h
    dpr = devicePixelRatio
    setupCanvas()
    start()

    self.postMessage({ ready: true })

  }

})()