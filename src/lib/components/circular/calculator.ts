
let sharedBuffer: Float32Array
let started = false
let paused = false
let len = 0
let direction = 1
let speedScale = 1

let pointerDistance = 0
let pointerInit = 0
let lastPointer = 0
let radialMovement = 0

let sal: number

function start(){
  started = true

  requestAnimationFrame(function calculate(){

    if(paused) return;

    let num = len
    while(num--){
  
      // [ x, y, radiusX, radiusY, radians, translateY, speed ]
      sharedBuffer[ num * sal + 0 ] = sharedBuffer[ num * sal + 2 ] * Math.cos( sharedBuffer[ num * sal + 4 ] )
      sharedBuffer[ num * sal + 1 ] = sharedBuffer[ num * sal + 3 ] * Math.sin( sharedBuffer[ num * sal + 4 ] )
      sharedBuffer[ num * sal + 4 ] += sharedBuffer[ num * sal + 6 ] * direction * speedScale
  
    }

    if(speedScale > 1){
      speedScale -= speedScale * 0.005
    }else if(speedScale < 1){
      speedScale += 0.01
    }

    requestAnimationFrame(calculate)

  })
}

function setPosOnRadialMovement(){
  let num = len
    while(num--){
      sharedBuffer[ num * sal + 4 ] += radialMovement
      sharedBuffer[ num * sal + 0 ] = sharedBuffer[ num * sal + 2 ] * Math.cos( sharedBuffer[ num * sal + 4 ] )
      sharedBuffer[ num * sal + 1 ] = sharedBuffer[ num * sal + 3 ] * Math.sin( sharedBuffer[ num * sal + 4 ] )
    }
}

self.onmessage = (e: MessageEvent) => {

  const { 
    sharedBuffer: sab,
    dataLength,
    play, pause, num,
    pointerX, pointerDownTime
  } = e.data


  if(pointerDownTime && play){

    if(lastPointer - pointerInit) {
      speedScale = (lastPointer - pointerInit) / pointerDownTime * -7 // 7 is a magic number
      direction = speedScale / Math.abs(speedScale)
      speedScale = Math.abs(speedScale)
    }else{
      speedScale = 0.01 // to start the rotation
    }

    paused = false
    pointerInit = 0
    lastPointer = 0
    start()
    return;
  }

  if(pointerX && started){

    if(!pointerInit) {
      pointerInit = pointerX
      lastPointer = pointerX
      speedScale = 0
    } else {
      radialMovement = (pointerX - lastPointer) * - 0.005 // ratio
      lastPointer = pointerX
      setPosOnRadialMovement()
    }
    
    if(pause) paused = true
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