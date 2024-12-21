import Predator from '../items/predator'
import BoidBox from '../items/boidBox'

import {
  maxVelocity,
  minVelocity,
  turnFactor,
  avoidFactor,
  protectedRange,
  matchingfactor,
  centeringFactor,
  predatorturnfactor,
  graveYardY  
} from '../items/constants'

let predator:Predator

let boidBox: BoidBox

let calculating = false
let sharedArray: Float32Array;
let start = 0
let end = 0

let posCounter: Int8Array;
let counterIndex: number;

// visible range is a range
// and visible range should always be > protectedRange
const getVisibleRange = () => 40 + Math.random() * 40

// greatly  affects fps
// but, setting these to low, 
// we will start to see group of boids on the same space
const maxPartner = 15 // max is calcPerThread
//

// shares array length per boid
let sal = 0

function calculatePosition(){

  // https://vanhunteradams.com/Pico/Animal_Movement/Boids-algorithm.html
  const visibleRange = getVisibleRange()


  let i = end + 1
  while(i--) {

    if(i<start) break;

    const iPosition = [
      i * sal + 0,
      i * sal + 1,
      i * sal + 2,
    ]

    const iIsAlive = i * sal + 7;
    if(sharedArray[ iIsAlive ] === 0){
      if(sharedArray[ iPosition[1] ] > graveYardY)
        sharedArray[ iPosition[1] ] -= 5
      continue;
    }


    let partners = 0
    const acceleration = [0,0,0]

    const iVelocity = [
      i * sal + 3,
      i * sal + 4,
      i * sal + 5,
    ]

    // 6 is for grid pos
    const iGridPos = i * sal + 6

    // Separation
    let closeDx = 0
    let closeDy = 0
    let closeDz = 0

    let neighboringBoids = 0

    // Alignment
    let xVelAvg = 0
    let yVelAvg = 0
    let zVelAvg = 0

    // Cohesion
    let xPosAvg = 0
    let yPosAvg = 0
    let zPosAvg = 0

    const iGridNum = sharedArray[ iGridPos ]
    
    // calculate neighbour effect
    let j = sharedArray.length / sal
    while(j--) {
      if(j===i) continue;

      // is alive ?
      if(sharedArray[ j * sal + 7 ] === 0) continue;

      // grid based neighbour
      // https://ercang.github.io/boids-js/
      if(sharedArray[ j * sal + 6 ] !== iGridNum) continue;

      // 
      if(partners >= maxPartner) break;

      const jPosition = [
        j * sal + 0,
        j * sal + 1,
        j * sal + 2,
      ]
      
      const distance = Math.sqrt(
        (sharedArray[ jPosition[0] ] - sharedArray[ iPosition[0] ]) ** 2 +
        (sharedArray[ jPosition[1] ] - sharedArray[ iPosition[1] ]) ** 2 +
        (sharedArray[ jPosition[2] ] - sharedArray[ iPosition[2] ]) ** 2
      )

      if(distance >= visibleRange) continue;
      partners = partners + 1;

      // Separation
      if(distance < protectedRange){
        closeDx += sharedArray[ iPosition[0] ] - sharedArray[ jPosition[0] ]
        closeDy += sharedArray[ iPosition[1] ] - sharedArray[ jPosition[1] ]
        closeDz += sharedArray[ iPosition[2] ] - sharedArray[ jPosition[2] ]
      }

      else if(distance < visibleRange){

        // const jVelocity = [
        //   j * sal + 3,
        //   j * sal + 4,
        //   j * sal + 5,
        // ]

        // Alignment
        xVelAvg += sharedArray[ j * sal + 3 ] 
        yVelAvg += sharedArray[ j * sal + 4 ] 
        zVelAvg += sharedArray[ j * sal + 5 ] 

        // Cohesion
        xPosAvg += sharedArray[ jPosition[0] ]
        yPosAvg += sharedArray[ jPosition[1] ]
        zPosAvg += sharedArray[ jPosition[2] ]

        neighboringBoids = neighboringBoids + 1

      }

    }

    // Separation
    acceleration[0] += closeDx * avoidFactor
    acceleration[1] += closeDy * avoidFactor
    acceleration[2] += closeDz * avoidFactor
    
    if(neighboringBoids){
      
      // Alignment
      xVelAvg /= neighboringBoids
      yVelAvg /= neighboringBoids
      zVelAvg /= neighboringBoids
      acceleration[0] += (xVelAvg - sharedArray[ iVelocity[0] ]) * matchingfactor
      acceleration[1] += (yVelAvg - sharedArray[ iVelocity[1] ]) * matchingfactor
      acceleration[2] += (zVelAvg - sharedArray[ iVelocity[2] ]) * matchingfactor

      // Cohesion
      xPosAvg /= neighboringBoids
      yPosAvg /= neighboringBoids
      zPosAvg /= neighboringBoids
      acceleration[0] += (xPosAvg - sharedArray[ iPosition[0] ]) * centeringFactor
      acceleration[1] += (yPosAvg - sharedArray[ iPosition[1] ]) * centeringFactor
      acceleration[2] += (zPosAvg - sharedArray[ iPosition[2] ]) * centeringFactor

    }
    
    // calculate velocity
    sharedArray[ iVelocity[0] ] += acceleration[0]
    sharedArray[ iVelocity[1] ] += acceleration[1]
    sharedArray[ iVelocity[2] ] += acceleration[2]
    
    if(predator.exists){

      const predatorDx = sharedArray[ iPosition[0] ] - predator.x
      const predatorDy = sharedArray[ iPosition[1] ] - predator.y
      const predatorDz = sharedArray[ iPosition[2] ] - predator.z

      const predatorDistance = Math.sqrt(
        predatorDx**2 + predatorDy**2 + predatorDz**2
      )

      if(predatorDistance <= predator.size){
        sharedArray[ iIsAlive ] = 0
      } else if(predatorDistance < predator.range){

        const velX = Math.abs(sharedArray[ iVelocity[0] ])
        const velY = Math.abs(sharedArray[ iVelocity[1] ])
        const velZ = Math.abs(sharedArray[ iVelocity[2] ])
        const sumVel = velX + velY + velZ

        sharedArray[ iVelocity[0] ] += predatorturnfactor * ((predatorDx < 0 ? -1 : 1) * (1 - (velX/sumVel)))
        sharedArray[ iVelocity[1] ] += predatorturnfactor * ((predatorDy < 0 ? -1 : 1) * (1 - (velY/sumVel)))
        sharedArray[ iVelocity[2] ] += predatorturnfactor * ((predatorDz < 0 ? -1 : 1) * (1 - (velZ/sumVel)))
      }

      
    }

    if(sharedArray[ iIsAlive ] === 0){
      continue;
    }


    // turn factor
    // https://vanhunteradams.com/Pico/Animal_Movement/Boids-algorithm.html#Screen-edges

    let isTurning = false;
    if(sharedArray[ iPosition[0] ] > boidBox.right){
      sharedArray[ iVelocity[0] ] -= turnFactor
      isTurning = true
    }

    if(sharedArray[ iPosition[0] ] < boidBox.left){
      sharedArray[ iVelocity[0] ] += turnFactor
      isTurning = true
    }

    if(sharedArray[ iPosition[1] ] > boidBox.bottom){
      sharedArray[ iVelocity[1] ] -= turnFactor
      isTurning = true
    }

    if(sharedArray[ iPosition[1] ] < boidBox.top){
      sharedArray[ iVelocity[1] ] += turnFactor
      isTurning = true
    }

    if(sharedArray[ iPosition[2] ] > boidBox.front){
      sharedArray[ iVelocity[2] ] -= turnFactor
      isTurning = true
    }

    if(sharedArray[ iPosition[2] ] < boidBox.back){
      sharedArray[ iVelocity[2] ] += turnFactor
      isTurning = true
    }

    // limit velocity
    const velocity = Math.sqrt(
      sharedArray[ iVelocity[0] ]**2 + 
      sharedArray[ iVelocity[1] ]**2 + 
      sharedArray[ iVelocity[2] ]**2
    )

    if(velocity > maxVelocity){
      sharedArray[ iVelocity[0] ] = sharedArray[ iVelocity[0] ] / velocity * maxVelocity
      sharedArray[ iVelocity[1] ] = sharedArray[ iVelocity[1] ] / velocity * maxVelocity
      sharedArray[ iVelocity[2] ] = sharedArray[ iVelocity[2] ] / velocity * maxVelocity
    }

    // limit min vel, only do this when not turning
    if(velocity < minVelocity && !isTurning){
      sharedArray[ iVelocity[0] ] = sharedArray[ iVelocity[0] ] / velocity * minVelocity
      sharedArray[ iVelocity[1] ] = sharedArray[ iVelocity[1] ] / velocity * minVelocity
      sharedArray[ iVelocity[2] ] = sharedArray[ iVelocity[2] ] / velocity * minVelocity
    }

    //
    sharedArray[ iPosition[0] ] += sharedArray[ iVelocity[0] ]
    sharedArray[ iPosition[1] ] += sharedArray[ iVelocity[1] ]
    sharedArray[ iPosition[2] ] += sharedArray[ iVelocity[2] ]

    // grid pos
    sharedArray[ iGridPos ] = boidBox.getGridNum(
      sharedArray[ iPosition[0] ],
      sharedArray[ iPosition[1] ],
      sharedArray[ iPosition[2] ]
    )

  }

}

let last = performance.now()
let fpsLimit = 70
let frameTime = 1000 / fpsLimit
let paused = false

function calculate(){
  if(!sharedArray) {
    throw new Error('sharedArray does not exists')
  }

  // limit fps
  if((performance.now() - last) < frameTime){
    return  requestAnimationFrame(() => calculate())
  }

  if(!paused) requestAnimationFrame(() => calculate())

  last = performance.now()
  if( !posCounter[ counterIndex ] ){
    posCounter[ counterIndex ] = 1
    calculatePosition()
  }

}


self.onmessage = (e: MessageEvent) => {

  const { data } = e

  if(data.pause){
    paused = true
  }

  if(data.play){
    paused = false
    calculate()
  }

  if(data.predatorAttr){
    predator = data.predatorAttr
  }

  if(data.boidBox)
    boidBox = new BoidBox(data.boidBox)

  if(
    data.sab && data.posCounter && data.sal &&
    typeof data.start !== 'undefined' &&
    typeof data.end !== 'undefined'
  ){

    sal = data.sal
    start = data.start
    end = data.end
    counterIndex = data.counterIndex

    sharedArray = new Float32Array(data.sab)
    posCounter = new Int8Array(data.posCounter)
    
    if(!calculating){
      calculating = true
      calculate()
    }
  }

}