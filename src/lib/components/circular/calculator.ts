
let sharedBuffer: Float32Array
let started = false
let paused = false
let len = 0
let speedScale = 2
let speedScaleLimit = 2

let pointerDistance = 0
let pointerInit = 0
let lastPointer: number | null = null
let radialMovement = 0

let sal: number

function start(){
  started = true

  requestAnimationFrame(function calculate(){

    if(paused) return;

    let num = len
    while(num--){

      if(!speedScale) break;
  
      // [ x, y, radiusX, radiusY, radians, translateY, speed ]
      sharedBuffer[ num * sal + 4 ] += sharedBuffer[ num * sal + 6 ] * speedScale
      sharedBuffer[ num * sal + 0 ] = sharedBuffer[ num * sal + 2 ] * Math.cos( sharedBuffer[ num * sal + 4 ] )
      sharedBuffer[ num * sal + 1 ] = sharedBuffer[ num * sal + 3 ] * Math.sin( sharedBuffer[ num * sal + 4 ] )
  
    }

    if(speedScale > speedScaleLimit){
      speedScale -= speedScale * 0.005
    }

    if(speedScale < -speedScaleLimit){
      speedScale += -speedScale * 0.005
    }

    requestAnimationFrame(calculate)

  })
}

self.onmessage = (e: MessageEvent) => {
  
  const { 
    sharedBuffer: sab,
    dataLength,
    play, pause, num,
    pointerX, pointerDownTime,
  } = e.data

  if(pointerDownTime && started){
    lastPointer = null
    return;
  }

  if(pointerX && started){
    if(lastPointer === null) {
      lastPointer = pointerX
    }else{
      radialMovement = pointerX - lastPointer
      speedScale += radialMovement * -0.07
      lastPointer = pointerX
    }
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

  if(!num) throw new Error('num is gone')
  if(!sab) throw new Error('sharedBufferBuffer is gone')
  if(!dataLength) throw new Error('dataLength is gone')

  
  len = num
  sal = dataLength
  sharedBuffer = new Float32Array(sab)
  start()

  self.postMessage({ ready: true })

}