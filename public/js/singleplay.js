import holePositionsFromDataFile from './data_files/holepositions.js'
import floorDetails from './data_files/floordetails.js'
let holePositions = holePositionsFromDataFile

const gauge = document.querySelector('.gauge')
const gaugeStopBtn = document.querySelector('.gauge_stop_btn')
const resetBtn = document.querySelector('.reset_btn')

let gaugeNum = 15 // 게이지 위치 수치 변수 선언

let gaugeNumbering = setInterval(() => { // 게이지 위치 수치화
        if(!gauge.classList.contains('change_direction')) { 
            gaugeNum += 3
        }                                         
        else { 
            gaugeNum -= 3
        }
    }, 20)

let changeDirection = setInterval(() => {
    gauge.classList.toggle('change_direction')
}, 2000)

const reset = () => {
    resetBtn.disabled = true
    if(gauge.classList.contains('change_direction')) {
        gauge.classList.remove('change_direction')
    }
    isGaugeStopped = false
    isBouncedByWall = false   
    gauge.classList.add('stop')
    void gauge.offsetWidth;
    gauge.classList.remove('stop')
    gauge.style.animationPlayState = 'running'
    gaugeNum = 15
    changeDirection = setInterval(() => {
        gauge.classList.toggle('change_direction')
    }, 2000)
    gaugeNumbering = setInterval(() => {
    if(!gauge.classList.contains('change_direction')) {
        gaugeNum += 3
    }                                         
    else {
        gaugeNum -= 3
    }
    }, 20)
}

const screenWidth = window.innerWidth 
const screenHeight = window.innerHeight 

const config = {
    type: Phaser.AUTO,
    width: screenWidth,    // console.log(window.innerWidth) : 1280
    height: screenHeight,    // console.log(window.innerHeight) : 623
    scene: {
        preload : preload,
        create : create,
        update : update
    },
    scale : {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        matter: {
            gravity: { y : 100 }
        }
    }
}

const game = new Phaser.Game(config)

function preload()
{
    this.load.image('ball', '/images/ball.png')
    this.load.image('transparent_ball', '/images/ball.png')
    this.load.image('floor_unit', '/images/floor_unit.png')
    this.load.image('hole', '/images/hole.png')
    this.load.image('wall', '/images/wall.png')
    this.load.image('background', '/images/background.jpg')
    this.load.image('sky_lounge', '/images/sky_lounge.png')
    this.load.image('sky_cafe', '/images/sky_cafe.png')
    this.load.image('sky_cafeteria', '/images/sky_cafeteria.png')
    this.load.image('sky_garden', '/images/sky_garden.png')
    this.load.image('sky_hotel', '/images/sky_hotel.png')
    this.load.image('playground', '/images/playground.png')
    this.load.image('oceanpark', '/images/oceanpark.png')
    this.load.image('spa', '/images/spa.png')
    this.load.image('winebar', '/images/winebar.png')
}

let group, 
ball,
centerX,
centerY, 
virtualCenter,
virtualCenterPositionX,
virtualCenterPositionY,
createNewFloor, 
wallLeft, 
wallRight, 
createNewWall,
originalBallPositionX, 
originalBallPositionY, 
holePositionX, 
distanceWillMove,
isBouncedByWall, 
isGaugeStopped, 
ballStopPositionX, 
putting
let isBallStopped = false 
let isBallUpward = false 
let direction = 0
let currentFloor = 101 
let puttingChance = currentFloor == 101 ? 100 : 10
let totalChance = currentFloor == 101 ? 100 : 10 
const totalFloor = 100 + 1
const oneFloorHeight = 0.8 * (600 / 1790) * screenWidth 
const puttingChanceText = document.querySelector('.putting_chance .chance_number')
const totalChanceText = document.querySelector('.putting_chance .total_chance')
const ballDistanceText = document.querySelector('.ball_distance .distance_number')
const tipText = document.querySelector('.tip')
const tipContentsText = document.querySelector('.tip_contents')

function create()
{
    for(let i=0; i<=10; i++) {
        const background = this.add.image(game.config.width/2, game.config.height/2 + 300 * i, 'background')
        background.setScale(1.5)
        background.setDepth(-100)
    }

    centerX = this.cameras.main.centerX
    centerY = this.cameras.main.centerY 
    ball = this.physics.add.sprite(centerX - screenWidth * 0.4 + 200, screenHeight - 60 - 25, 'ball')
    ball.setScale(0.4)
    ball.setMass(1)
    ball.body.gravity.y = 1000
    originalBallPositionX = ball.x
    originalBallPositionY = ball.y + 2.5
    virtualCenterPositionX = centerX
    virtualCenterPositionY = centerY 
    virtualCenter = this.physics.add.sprite(virtualCenterPositionX, virtualCenterPositionY, 'transparent_ball')
    virtualCenter.setAlpha(0)
    this.cameras.main.startFollow(virtualCenter, false, 0, 1)

    holePositions = holePositions.map(el => { el += centerX ; return el } )

    const floor = []

    // for(let i=0; i<=holePositions.length; i++) {    // 바닥 너비(width) = 0.8 * screenWidth
    createNewFloor = (currentFloor) => {
        if(currentFloor == 101) {
            for(let i=totalFloor - currentFloor; i<=totalFloor - currentFloor + 1; i++) {
                for(let j=centerX - 0.4 * screenWidth; j<=holePositions[i]; j+=6.25) {
                    const floorUnit = this.physics.add.sprite(j, screenHeight - 60 + oneFloorHeight * i, 'floor_unit')
                    floor.push(floorUnit)
                }
                for(let j=holePositions[i] + 50; j<=centerX + 0.4 * screenWidth; j+=6.25) {
                    const floorUnit = this.physics.add.sprite(j, screenHeight - 60 + oneFloorHeight * i, 'floor_unit')
                    floor.push(floorUnit)
                }
            }
        }
        else {
            for(let j=centerX - 0.4 * screenWidth; j<=holePositions[totalFloor - currentFloor + 1]; j+=6.25) {
                const floorUnit = this.physics.add.sprite(j, screenHeight - 60 + oneFloorHeight * (totalFloor - currentFloor + 1), 'floor_unit')
                floor.push(floorUnit)
            }
            for(let j=holePositions[totalFloor - currentFloor + 1] + 50; j<=centerX + 0.4 * screenWidth; j+=6.25) {
                const floorUnit = this.physics.add.sprite(j, screenHeight - 60 + oneFloorHeight * (totalFloor - currentFloor + 1), 'floor_unit')
                floor.push(floorUnit)
            }
        }
        floor.forEach(el => {
            el.body.immovable = true
            el.body.allowGravity = false 
            el.setScale(0.125)
        })
    }
    createNewFloor(currentFloor)
    // }

    const walls = []



    createNewWall = (currentFloor) => {
        if(currentFloor == 101) { 
            for(let i=totalFloor - currentFloor; i<=totalFloor - currentFloor + 1; i++) {
                const wallLeft = this.physics.add.sprite(centerX - 0.4 * screenWidth, screenHeight - 160 - 60 - 25/2 + oneFloorHeight * i, 'wall')
                const wallRight = this.physics.add.sprite(centerX + 0.4 * screenWidth, screenHeight - 160 - 60 - 25/2 + oneFloorHeight * i, 'wall')
                walls.push(wallLeft, wallRight)
            }
         }
        else {
            const wallLeft = this.physics.add.sprite(centerX - 0.4 * screenWidth, screenHeight - 160 - 60 - 25/2 + oneFloorHeight * (totalFloor - currentFloor + 1), 'wall')
            const wallRight = this.physics.add.sprite(centerX + 0.4 * screenWidth, screenHeight - 160 - 60 - 25/2 + oneFloorHeight * (totalFloor - currentFloor + 1), 'wall')
            walls.push(wallLeft, wallRight)
        } 
        walls.forEach(el => {
            el.setImmovable(true)
            el.setBounce(0.5)
            el.setMass(10)
            el.setScale(0.8)
        })
    }
    createNewWall(currentFloor)

    currentFloor = 101

    const INDOOR_BACKGROUNDS = this.add.group()

    // const skyLounge = this.add.sprite(centerX, screenHeight - 192.5 + oneFloorHeight, 'sky_lounge')
    // indoorBackgrounds.add(skyLounge)
    const SKY_CAFE = this.add.sprite(centerX, screenHeight - (oneFloorHeight/2) - 60 -25/2 + oneFloorHeight * 2, 'sky_cafe')
    INDOOR_BACKGROUNDS.add(SKY_CAFE)
    const SKY_CAFETERIA = this.add.sprite(centerX, screenHeight - (oneFloorHeight/2) - 60 -25/2 + oneFloorHeight * 3, 'sky_cafeteria')
    INDOOR_BACKGROUNDS.add(SKY_CAFETERIA)
    const SKY_GARDEN = this.add.sprite(centerX, screenHeight - (oneFloorHeight/2) - 60 -25/2 + oneFloorHeight * 4, 'sky_garden')
    INDOOR_BACKGROUNDS.add(SKY_GARDEN)
    const SKY_HOTEL = this.add.sprite(centerX, screenHeight - (oneFloorHeight/2) - 60 -25/2 + oneFloorHeight * 5, 'sky_hotel')
    INDOOR_BACKGROUNDS.add(SKY_HOTEL)
    const PLAYGROUND = this.add.sprite(centerX, screenHeight - (oneFloorHeight/2) - 60 -25/2 + oneFloorHeight * 6, 'playground')
    INDOOR_BACKGROUNDS.add(PLAYGROUND)
    const OCEANPARK = this.add.sprite(centerX, screenHeight - (oneFloorHeight/2) - 60 -25/2 + oneFloorHeight * 7, 'oceanpark')
    INDOOR_BACKGROUNDS.add(OCEANPARK)
    const SPA = this.add.sprite(centerX, screenHeight - (oneFloorHeight/2) - 60 -25/2 + oneFloorHeight * 8, 'spa')
    INDOOR_BACKGROUNDS.add(SPA)
    const WINEBAR = this.add.sprite(centerX, screenHeight - (oneFloorHeight/2) - 60 -25/2 + oneFloorHeight * 9, 'winebar')
    INDOOR_BACKGROUNDS.add(WINEBAR)
    INDOOR_BACKGROUNDS.getChildren().forEach(
        el => {
            el.setScale(oneFloorHeight / 600)
            el.setDepth(-10)
        } 
    )

    this.physics.add.collider(ball, floor, () => {
        ball.setBounce(0.2) // 공 바닥에 떨어질 때 튕김현상
    })

    const bouncedByWall = () => {   // 공 벽에 튕길 때 상황
        isBouncedByWall = true
        setTimeout(() => {
            let ballSlowDown = setInterval(() => {
                ball.body.velocity.x *= 0.9
                ball.body.acceleration.x *=0.9      
                if(ball.body.velocity.x > -30 && ball.body.velocity.x < 0
                || ball.body.velocity.x < 30 && ball.body.velocity.x > 0) {
                    clearInterval(ballSlowDown)
                    ball.body.stop() 
                    puttingChance--
                    puttingChanceText.innerHTML = puttingChance 
                    if(puttingChance <= 0) {    // 퍼팅 기회 모두 소진
                        isBallUpward = true
                        this.tweens.add({
                            targets: ball,
                            x: currentFloor == 101 ? centerX - screenWidth * 0.4 + 200 : holePositions[totalFloor - currentFloor],
                            y: ball.y - oneFloorHeight,
                            duration: 2000,
                            ease: 'Linear', 
                            onComplete: function() { chanceOver() }
                        })
                    }
                    resetBtn.disabled = false 
                    return 
                }
            }, 75)
        }, 100)
    }
    this.physics.add.collider(ball, walls, bouncedByWall, null, this)

    putting = () => {
        if (isGaugeStopped) { return }
        ball.setVelocityX(gaugeNum * 4 * ballTowardsCheck())
        ball.setAccelerationX(gaugeNum * (-2) * ballTowardsCheck())
    }

    this.input.keyboard.on('keydown-SPACE', () => { putting() }, this)   
}

function update()
{ 
    virtualCenter.y = (ball.y - virtualCenterPositionY) + 35 + 60

    if (!isBouncedByWall) { // 벽에 안튕긴 상황
        if((ballTowardsCheck() > 0 && ball.body.velocity.x < 0) 
        || (ballTowardsCheck() < 0 && ball.body.velocity.x > 0)) {
            ball.body.stop()
            puttingChance--
            puttingChanceText.innerHTML = puttingChance 
            if(puttingChance <= 0 && ball.y == originalBallPositionY) {    // 퍼팅 기회 모두 소진
                isBallUpward = true 
                this.tweens.add({
                    targets: ball,
                    x: currentFloor == 101 ? centerX - screenWidth * 0.4 + 200 : holePositions[totalFloor - currentFloor],
                    y: ball.y - oneFloorHeight,
                    duration: 1000,
                    ease: 'Linear', // 이동에 사용되는 easing 함수 (옵션)
                    onComplete: function() { chanceOver() }
                })
            }
            resetBtn.disabled = false  
        }
    }

    ballDistanceText.innerHTML = !isBallUpward ? `${Math.abs(Math.floor(ball.x - originalBallPositionX))}` : 0
    isBallUpward ? ball.body.setEnable(false) : ball.body.setEnable(true)

    if (ball.y == originalBallPositionY + oneFloorHeight) { goalIn() }
}

const ballTowardsCheck = () => {
    originalBallPositionX < holePositions[totalFloor - currentFloor] ? direction = 1 : direction = -1
    return direction 
}

const currentFloorText = document.querySelector('.current_floor .text') 

const goalIn = () => {
    reset()
    currentFloor -= 1
    floorChanged()
}

const chanceOver = () => {
    reset()
    currentFloor += 1
    floorChanged()
    isBallUpward = false 
}

const floorChanged = () => {
    createNewFloor(currentFloor)
    createNewWall(currentFloor)
    originalBallPositionX = ball.x 
    originalBallPositionY = ball.y 
    currentFloorText.innerHTML 
    = `${floorDetails[totalFloor - currentFloor].name.toUpperCase()}&nbsp(${floorDetails[totalFloor - currentFloor].floor}F)`
    puttingChance = currentFloor == 101 ? 100 : 10
    totalChance = currentFloor == 101 ? 100 : 10 
    puttingChanceText.innerHTML = puttingChance 
    totalChanceText.innerHTML = totalChance 
    if(floorDetails[totalFloor - currentFloor].tip) { 
        tipText.classList.add('on')
        tipContentsText.innerHTML = floorDetails[totalFloor - currentFloor].tip
    }   else {
        tipText.classList.remove('on')
    }
}

const stopGauge = () => {
    gauge.style.animationPlayState = 'paused'
    clearInterval(gaugeNumbering)
    clearInterval(changeDirection)
    isGaugeStopped = true
}

window.addEventListener('keydown', e => {
    if (e.key === 32 || e.key === ' ') { 
        if(isGaugeStopped) {    // 리셋버튼과 동일한 효과 
            if(!resetBtn.disabled) {
                reset()
                resetBtn.disabled = true 
                ball.x = originalBallPositionX
            } else { return }  
         }  else {  // 퍼팅(stop)과 동일한 효과 
            stopGauge()
         }
     }
})

gaugeStopBtn.addEventListener('click', () => { 
    putting()
    stopGauge()
})

resetBtn.addEventListener('click', () => {
    reset()
    isBallStopped = false
    ball.x = originalBallPositionX
})
