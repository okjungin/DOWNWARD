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
    // setTimeout(() => {
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
    // }, 100)
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
    this.load.image('floor_unit', 'images/floor_unit.png')
    this.load.image('hole', '/images/hole.png')
    this.load.image('wall', '/images/wall.png')
    this.load.image('background', '/images/background.jpg')
}

let group, 
wallLeft, 
wallRight, 
originalBallPositionX, 
originalBallPositionY, 
holePositionX, 
distanceWillMove,
isBouncedByWall, 
isGaugeStopped, 
ballStopPositionX, 
putting
let holePositions = [
    231.25,
    -262.5, 
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5,
    231.25,
    -262.5
]
let isBallStopped = false 
let isBallUpward = false 
let direction = 0
let currentFloor = 101 
let puttingChance = currentFloor == 101 ? 100 : 10
let totalChance = currentFloor == 101 ? 100 : 10 
const totalFloor = 100 + 1
const oneFloorHeight = 185
const floorDetails = [
    {
        floor : 101,
        name : 'ROOFTOP',
        tip : '',
        special : false 
    },
    {
        floor : 100,
        name : 'SKYLOUNGE',
        tip : '',
        special : false 
    },
    {
        floor : 99,
        name : 'SKYCAFE',
        tip : '',
        special : false 
    },
    {
        floor : 98,
        name : 'SKY CAFETERIA',
        tip : '',
        special : false 
    },
    {
        floor : 97,
        name : 'SKY GARDEN',
        tip : 'You can\'t access to the Cannibalism.',
        special : false 
    },
    {
        floor : 96,
        name : 'SKY HOTEL',
        tip : '',
        special : false 
    },
    {
        floor : 95,
        name : 'PLAYGROUND',
        tip : 'A Punch Attack will sting.',
        special : false
    },
    {
        floor : 94,
        name : 'OCEAN PARK',
        tip : '',
        special : false 
    },
    {
        floor : 93,
        name : 'SPA',
        tip : '',
        special : false 
    },
    {
        floor : 92,
        name : 'WINE BAR',
        tip : '',
        special : false 
    },
]
const puttingChanceText = document.querySelector('.putting_chance .chance_number')
const totalChanceText = document.querySelector('.putting_chance .total_chance')
const ballDistanceText = document.querySelector('.ball_distance .distance_number')
const tipContentsText = document.querySelector('.tip_contents')

function create()
{
    const background = this.add.image(game.config.width/2, game.config.height/2, 'background')
    background.setScale(1.5)

    // group = this.add.group()

    ball = this.physics.add.sprite(this.cameras.main.centerX - 300, this.cameras.main.centerY - 25, 'ball')
    ball.setScale(0.4)
    ball.setMass(1)
    ball.body.gravity.y = 1000
    this.cameras.main.setSize(window.innerWidth, window.innerHeight)
    this.cameras.main.setZoom(1);
    this.cameras.main.startFollow(ball, false, 0, 1)
    originalBallPositionX = ball.x
    originalBallPositionY = ball.y + 2.5

    const offsetX = this.cameras.main.width / 2 - ball.x
    this.cameras.main.scrollX += offsetX

    const screenHeight = this.sys.game.config.height
    const floor = []

    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.centerY 

    holePositions = holePositions.map(el => { el += centerX; return el } )
    console.log(holePositions)

    for(let i=0; i<=holePositions.length; i++) {
        for(let j=-487.5 + centerX; j<=holePositions[i]; j+=6.25) {
            const floorUnit = this.physics.add.sprite(j, centerY + 185 * i, 'floor_unit')
            floor.push(floorUnit)
        }
        for(let j=holePositions[i]+31.25; j<=487.5 + centerX; j+=6.25) {
            const floorUnit = this.physics.add.sprite(j, centerY + 185 * i, 'floor_unit')
            floor.push(floorUnit)
        }
    }
    // for(let j=-487.5; j<=231.25; j+=6.25) { // 홀의 너비 31.25
    //     const floorUnit = this.physics.add.sprite(this.cameras.main.centerX + j, this.cameras.main.centerY, 'floor_unit')
    //     floor.push(floorUnit)
    // }
    // for(let j=262.5; j<=487.5; j+=6.25) {
    //     const floorUnit = this.physics.add.sprite(this.cameras.main.centerX + j, this.cameras.main.centerY, 'floor_unit')
    //     floor.push(floorUnit)
    // }
    floor.forEach(el => {
        el.body.immovable = true
        el.body.allowGravity = false 
        el.setScale(0.125)
    })

    const walls = []
    for(let i=0; i<=100; i++) {
        const wallLeft = this.physics.add.sprite(centerX - 481.25, centerY - 92.5 + 185 * i, 'wall')
        const wallRight = this.physics.add.sprite(centerX + 481.25, centerY - 92.5 + 185 * i, 'wall')
        walls.push(wallLeft, wallRight)
    }
    walls.forEach(el => {
        el.setImmovable(true)
        el.setBounce(0.5)
        el.setMass(10)
        el.setScale(0.4)
    })

    currentFloor = 101

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
                        currentFloor += 1
                        isBallUpward = true
                        this.tweens.add({
                            targets: ball,
                            x: currentFloor == 101 ? 340 : holePositions[totalFloor - currentFloor],
                            y: ball.y - oneFloorHeight,
                            duration: 2000,
                            ease: 'Linear', 
                            onComplete: chanceOver()
                        })
                    }
                    resetBtn.disabled = false 
                    return 
                }
            }, 75)
        }, 100)
    }
    this.physics.add.collider(ball, walls, bouncedByWall, null, this)

    console.log(originalBallPositionX, holePositions[0])

    putting = () => {
        if (isGaugeStopped) { return }
        ball.setVelocityX(gaugeNum * 4 * ballTowardsCheck())
        ball.setAccelerationX(gaugeNum * (-2) * ballTowardsCheck())
    }

    this.input.keyboard.on('keydown-SPACE', () => { putting() }, this)   
}

function update()
{
    if (!isBouncedByWall) { // 벽에 안튕긴 상황
        if((ballTowardsCheck() > 0 && ball.body.velocity.x < 0) 
        || (ballTowardsCheck() < 0 && ball.body.velocity.x > 0)) {
            ball.body.stop()
            puttingChance--
            puttingChanceText.innerHTML = puttingChance 
            if(puttingChance <= 0 && ball.y == originalBallPositionY) {    // 퍼팅 기회 모두 소진
                currentFloor += 1
                isBallUpward = true 
                this.tweens.add({
                    targets: ball,
                    x: currentFloor == 101 ? 340 : holePositions[totalFloor - currentFloor - 1],
                    y: ball.y - oneFloorHeight,
                    duration: 1000,
                    ease: 'Linear', // 이동에 사용되는 easing 함수 (옵션)
                    onComplete: chanceOver()
                })
            }
            resetBtn.disabled = false  
        }
    }

    ballDistanceText.innerHTML = `${Math.abs(Math.floor(ball.x - originalBallPositionX))}`

    if (ball.y == originalBallPositionY + oneFloorHeight) { goalIn() }
    if (isBallUpward) { 
        ball.body.setEnable(false)
        ballDistanceText.innerHTML = 0
    }   else {
        ball.body.setEnable(true)
    }
}

const ballTowardsCheck = () => {
    originalBallPositionX < holePositions[totalFloor - currentFloor] ? direction = 1 : direction = -1
    return direction 
}

const currentFloorText = document.querySelector('.current_floor .text') 

const goalIn = () => {
    reset()
    originalBallPositionY = ball.y
    originalBallPositionX = ball.x 
    currentFloor -= 1
    currentFloorText.innerHTML 
    = `${floorDetails[totalFloor - currentFloor].name}&nbsp(${floorDetails[totalFloor - currentFloor].floor}F)`
    puttingChance = currentFloor == 101 ? 100 : 10
    totalChance = currentFloor == 101 ? 100 : 10 
    puttingChanceText.innerHTML = puttingChance 
    totalChanceText.innerHTML = totalChance 
}

const chanceOver = () => {
    reset()
    originalBallPositionX = ball.x 
    originalBallPositionY = ball.y 
    currentFloorText.innerHTML 
    = `${floorDetails[totalFloor - currentFloor].name}&nbsp(${floorDetails[totalFloor - currentFloor].floor}F)`
    puttingChance = currentFloor == 101 ? 100 : 10
    totalChance = currentFloor == 101 ? 100 : 10 
    puttingChanceText.innerHTML = puttingChance 
    totalChanceText.innerHTML = totalChance 
    isBallUpward = false 
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
