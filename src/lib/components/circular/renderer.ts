import { buffer } from "three/tsl"

function randomColor(){
  return 'rgba(' + 
    (70 + Math.round(Math.random()*185)) + ',' +
    (70 + Math.round(Math.random()*185)) + ',' +
    (70 + Math.round(Math.random()*185)) + ',' +
    1+
  ')'
}

function randomSize(){
  return 2 + ( Math.random() * 2 )
}

let colors: string[] = []
let radiuses: number[] = []
let canvas: OffscreenCanvas
let started = false
let paused = false
let bufferData:Float32Array
let sal: number;
let dpr: number
let context: OffscreenCanvasRenderingContext2D | null

function setupCanvas(){
  if(!canvas) throw new Error('no canvas')
  
  canvas.getContext('2d')?.translate( 
    canvas.width / 2, 
    canvas.height / 2 
  )
}

function start(){
  started = true

  if(!canvas) throw new Error('no canvas')
  const context = canvas.getContext('2d')
  if(!context) throw new Error('canvas context is gone')

  requestAnimationFrame(function render(){

    if(paused) return;
    
    context.clearRect(
      -1 * canvas.width / 2,
      -1 * canvas.height / 2, 
      canvas.width, 
      canvas.height
    )

    let num = colors.length
    const translateY = canvas.height * 0.3
    while(num--){
      context.beginPath();
      context.arc(
        bufferData[ num * sal + 0 ],
        bufferData[ num * sal + 1 ] - (bufferData[ num * sal + 5 ] * translateY),
        radiuses[ num ] / dpr, 
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
    devicePixelRatio
  } = data

  if(w && h && started && canvas && devicePixelRatio){
    canvas.width = w
    canvas.height = h
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

  setTimeout(() => {
    self.postMessage({ ready: true })
  },500)

}