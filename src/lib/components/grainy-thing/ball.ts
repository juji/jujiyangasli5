

let colors = [
  // [196, 229, 56], // '#C4E538',
  // [18, 203, 196], // '#12CBC4',
  [237, 76, 103], // '#ED4C67',
  [163, 203, 56], // '#A3CB38',
  [238, 90, 36], // '#EE5A24',
  [0, 148, 50], // '#009432',
  [234, 32, 39], // '#EA2027',
  [6, 82, 221], // '#0652DD',
  [217, 128, 250], // '#D980FA',
  [153, 128, 250], // '#9980FA',
]

colors = [ ...colors, ...colors, ...colors ]

function randomColor(){
  return colors[Math.floor(Math.random() * colors.length)].join(',');
}

export class Ball {

  elm: HTMLDivElement
  radius = 0
  diameter = 0
  x = 0
  y = 0
  color = ''
  speedX = 0
  speedY = 0
  accelX = 0
  accelY = 0

  leftBorder = 0
  topBorder = 0
  rightBorder = 0
  bottomBorder = 0

  // blur = 0
  maxSpeed = 999
  turnAccelDelta = 0.09
  // state = {}

  baseSpeed = 2

  runFunc = {
    update: () => {},
    render: () => {}
  }

  box = {
    width: 720, 
    height: 580
  }

  constructor(
    elm: HTMLDivElement,
    {
      width,
      height
    } : {
      width: number,
      height: number
    }
  ){

    this.elm = elm

    this.box.width = width
    this.box.height = height

    this.baseSpeed = this.baseSpeed + (-.6 + Math.random())

    this.setBorders()

    let radius = this.box.width * (0.3 + (Math.random() * 0.4))
    this.radius = Math.round(radius + (Math.random() * 100))

    this.x = ((screen.width - this.box.width) / 2) + (Math.random() * this.box.width)
    this.y = ((screen.height - this.box.height) / 2) + (Math.random() * this.box.height)
    this.color = randomColor()

    this.speedX = this.baseSpeed * (Math.random() < .5 ? -1 : 1)
    this.speedY = this.baseSpeed * (Math.random() < .5 ? -1 : 1)


    this.elm.style.setProperty('--diameter', (this.radius * 2) + 'px')
    this.elm.style.setProperty('--color', this.color)
    this.elm.style.setProperty('--pos-x', this.x + 'px')
    this.elm.style.setProperty('--pos-y', this.y + 'px')

    // do i want to save the state?
    // this.state = JSON.parse(JSON.stringify(this))

  }

  setBorders(){
    const screen = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  
    this.leftBorder = ((screen.width - this.box.width) / 2)
    this.topBorder = ((screen.height - this.box.height) / 2)
    this.rightBorder = (((screen.width - this.box.width) / 2) + this.box.width)
    this.bottomBorder = (((screen.height - this.box.height) / 2) + this.box.height)
  }

  onResize(){
    this.setBorders()
  }

  update(){
    if(this.x > this.rightBorder){
      this.accelX -= this.turnAccelDelta
    }

    if(this.x < this.leftBorder){
      this.accelX += this.turnAccelDelta
    }

    if(this.y > this.bottomBorder){
      this.accelY -= this.turnAccelDelta
    }

    if(this.y < this.topBorder){
      this.accelY += this.turnAccelDelta
    }

    this.x += this.speedX + this.accelX
    this.y += this.speedY + this.accelY
  }

  render(){
    this.elm.style.setProperty('--pos-x', this.x + 'px')
    this.elm.style.setProperty('--pos-y', this.y + 'px')
  }

}
