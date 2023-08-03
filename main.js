const ball = document.querySelector('.ball')
const gauge = document.querySelector('.gaugebar .gauge')
const gaugeStopBtn = document.querySelector('button.gaugestopbtn')
const resetBtn = document.querySelector('button.resetbtn')
const tower = document.querySelector('.tower')
const puttingChance = document.querySelector('.score-interface .puttingchance .chancenumber')
const distance = document.querySelector('.score-interface .balldistance .distancenumber')

let gaugeNum = 15;      //게이지 위치 수치 변수 선언
let curLocX = 0;
// let preLocX = 0;
// let curLocY = 0;
let puttingChanceLeft = 100
let puttingChanceTotal = 100
let distanceNum = 0
let chanceLeftNum = 100

 let gaugeNumbering = setInterval(() => {               //게이지 위치 수치화
    if(!gauge.classList.contains('changedirection')) {
        gaugeNum += 3
    }                                         
    else {
        gaugeNum -= 3
    }
    // console.log(gaugeNum)
 }, 20)

let initialChangeDirection = setTimeout(() => {         // 처음 게이지 방향 변경 임의적 추가
    gauge.classList.add('changedirection')
}, 2000)

let changeDirection = setInterval(() => {               //게이지 방향 변경 
    gauge.classList.remove('changedirection')
    setTimeout(() => {
    gauge.classList.add('changedirection')
        }, 2000)
}, 4000)

resetBtn.disabled = true            //처음 리셋버튼 클릭불가

let resetFunc = () => {
    if(gauge.classList.contains('changedirection')) {
        gauge.classList.remove('changedirection')
    }
    gauge.classList.add('stop')
    setTimeout(() => {
        void gauge.offsetWidth;
        gauge.classList.remove('stop')
        gauge.style.animationPlayState = 'running'
        gaugeNum = 15
        gaugeNumbering = setInterval(() => {
        if(!gauge.classList.contains('changedirection')) {
            gaugeNum += 3
        }                                         
        else {
            gaugeNum -= 3
        }
     }, 20)
     initialChangeDirection = setTimeout(() => {
        gauge.classList.add('changedirection')
    }, 2000)
     changeDirection = setInterval(() => {
        gauge.classList.remove('changedirection')
        setTimeout(() => {
        gauge.classList.add('changedirection')
            }, 2000)
    }, 4000)
    }, 100)
}

ball.classList.add('rooftop')

gaugeStopBtn.addEventListener('click', () => {          //게이지 스탑 버튼 클릭시(101층)
    gauge.style.animationPlayState = 'paused'
    clearInterval(gaugeNumbering)
    clearInterval(changeDirection)
    clearTimeout(initialChangeDirection)

    if(gauge.classList.contains('changedirection')) {
        gauge.classList.remove('changedirection')
    }

    if(gaugeNum<252 && ball.classList.contains('rooftop'))      //101층 
    {
        ball.style.transform = `translateX(${gaugeNum*3}px)`
        curLocX = gaugeNum*3
        ball.style.transition = '2s'

       let distanceNumbering = setInterval(() => {         //score-interface distance 계산 함수
            distanceNum += (gaugeNum*3)/20
            distance.textContent = `${Math.floor(distanceNum)}M`                               //curLocX면 curLocX 그대로 출력, 3*gaugeNum도 마찬가지
        }, 100)
        setTimeout(() => {
            // distance.textContent = `${Math.floor(gaugeNum*3)}M`
            distance.textContent = `${3*gaugeNum}M`    
            clearInterval(distanceNumbering)        //공이 멈춘 후 약 2초내로 resetbtn을 누를 시 문제 발생 -> 
        },2000)      
    } 


    if(gaugeNum==210 && ball.classList.contains('rooftop')) {
        setTimeout(() => {
            ball.style.transform = `translate(${gaugeNum*3 + 9}px,0)`
            ball.style.transition = '.3s'
        }, 1900)
        setTimeout(() => {
            tower.style.transform = 'translateY(-380px)'
            setTimeout(() => {
                resetFunc()
                ball.classList.remove('rooftop')
                ball.classList.add('100f')
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                distance.textContent = '0M'
                chanceLeftNum = 10
                puttingChance.textContent = `10/10`
            }, 1500)
        }, 2100)
        curLocX = gaugeNum*3 + 9
    }
    if(gaugeNum==213 && ball.classList.contains('rooftop')) {
        setTimeout(() => {
            ball.style.transform = `translate(${gaugeNum*3}px,0)`
            ball.style.transition = '.3s'
        }, 1900)
        setTimeout(() => {
            tower.style.transform = 'translateY(-380px)'
            setTimeout(() => {
                resetFunc()
                ball.classList.remove('rooftop')
                ball.classList.add('100f')
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                distance.textContent = '0M'
                chanceLeftNum = 10
                puttingChance.textContent = `10/10`
            }, 1500)
        }, 2100)
        curLocX = gaugeNum*3
    }
    if(gaugeNum==216 && ball.classList.contains('rooftop')) {
        setTimeout(() => {
            ball.style.transform = `translate(${gaugeNum*3 - 9}px,0)`
            ball.style.transition = '.3s'
        }, 1900)
        setTimeout(() => {
            tower.style.transform = 'translateY(-380px)'
            setTimeout(() => {
                resetFunc()
                ball.classList.remove('rooftop')
                ball.classList.add('100f')
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                distance.textContent = '0M'
                chanceLeftNum = 10
                puttingChance.textContent = `10/10`
            }, 1500)
        }, 2100)
        curLocX = gaugeNum*3 - 9
    }
    if(gaugeNum==219 && ball.classList.contains('rooftop')) {
       setTimeout(() => {
            ball.style.transform = `translate(${gaugeNum*3 - 18}px,0)`
            ball.style.transition = '.3s'
        }, 1900)
        setTimeout(() => {
            tower.style.transform = 'translateY(-380px)'
            setTimeout(() => {
                resetFunc()
                ball.classList.remove('rooftop')
                ball.classList.add('100f')
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                distance.textContent = '0M'
                chanceLeftNum = 10
                puttingChance.textContent = `10/10`
            }, 1500)
        }, 2100)            
        curLocX = gaugeNum*3 - 18
    }

    if(gaugeNum>=246 && ball.classList.contains('rooftop')) {
        ball.style.transform = `translateX(747px)`  //gaugeNum*3 - 747
        ball.style.transition = '1.5s'
        setTimeout(() => {
            ball.style.transform = `translateX(${1494 - gaugeNum*3}px)`
        }, 1300)
        curLocX = 1494 - gaugeNum*3

       let distanceNumbering = setInterval(() => {
            distanceNum += 747/13          // gaugeNum이
            distance.textContent = `${Math.floor(distanceNum)}M` 
                setTimeout(() => {
                        distanceNum -= (3*gaugeNum - 747)/8      //200ms 동안 2번 출력
                        distance.textContent = `${Math.floor(distanceNum)}M`
                    }, 1300)
        }, 100)
        setTimeout(() => {
            distance.textContent = `${curLocX}M`
            clearInterval(distanceNumbering)
        }, 1500)
    }

    if(gaugeNum==279 && ball.classList.contains('rooftop')) {
        setTimeout(() => {
            ball.style.transform = `translate(${1494 - 18 - gaugeNum*3}px,0)`
            ball.style.transition = '.3s'
        }, 1900)
        setTimeout(() => {
            tower.style.transform = 'translateY(-380px)'
            setTimeout(() => {
                resetFunc()
                ball.classList.remove('rooftop')
                ball.classList.add('100f')
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                distance.textContent = '0M'
                chanceLeftNum = 10
                puttingChance.textContent = `10/10`
            }, 1500)
        }, 2100)
        curLocX = 1494 - 18 - gaugeNum*3
    }
    if(gaugeNum==282 && ball.classList.contains('rooftop')) {
        setTimeout(() => {
            ball.style.transform = `translate(${1494 - 9 - gaugeNum*3}px,0)`
            ball.style.transition = '.3s'
        }, 1900)
        setTimeout(() => {
            tower.style.transform = 'translateY(-380px)'
            setTimeout(() => {
                resetFunc()
                ball.classList.remove('rooftop')
                ball.classList.add('100f')
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                distance.textContent = '0M'
                chanceLeftNum = 10
                puttingChance.textContent = `10/10`
            }, 1500)
        }, 2100)
        curLocX = 1494 - 9 -gaugeNum*3
    }
    if(gaugeNum==285 && ball.classList.contains('rooftop')) {
        setTimeout(() => {
            ball.style.transform = `translate(${1494 - gaugeNum*3}px,0)`
            ball.style.transition = '.3s'
        }, 1900)
        setTimeout(() => {
            tower.style.transform = 'translateY(-380px)'
            setTimeout(() => {
                resetFunc()
                ball.classList.remove('rooftop')
                ball.classList.add('100f')
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                distance.textContent = '0M'
                chanceLeftNum = 10
                puttingChance.textContent = `10/10`
            }, 1500)
        }, 2100)
        curLocX = 1494 - gaugeNum*3
    }
    if(gaugeNum==288 && ball.classList.contains('rooftop')) {
        setTimeout(() => {
            ball.style.transform = `translate(${1494 + 9 - gaugeNum*3}px,0)`
            ball.style.transition = '.3s'
        }, 1900)
        setTimeout(() => {
            tower.style.transform = 'translateY(-380px)'
            setTimeout(() => {
                resetFunc()
                ball.classList.remove('rooftop')
                ball.classList.add('100f')
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                distance.textContent = '0M'
                chanceLeftNum = 10
                puttingChance.textContent = `10/10`
            }, 1500)
        }, 2100)
        curLocX = 1494 + 9 - gaugeNum*3 
    }

    if(gaugeNum!==210 && gaugeNum!==213 && gaugeNum!==216 && gaugeNum!==219     //골이 안들어간 경우
        && gaugeNum!==279 && gaugeNum!==282 && gaugeNum!==285 && ball.classList.contains('rooftop')) {
        setTimeout(() => {
            resetBtn.disabled = false
            chanceLeftNum -- 
            puttingChance.textContent = `${chanceLeftNum}/100`
        },2000)
    }


    if(ball.classList.contains('100f')) {           // 100층
         //curLocX = 639
        if(gaugeNum<258) {
            ball.style.transform = `translateX(${curLocX - gaugeNum*3}px)` //curLocX = 
            ball.style.transition = '2s'
            // console.log(gaugeNum)
            distanceNum = 0
            let distanceNumbering = setInterval(() => {
                distanceNum += (gaugeNum*3)/20
                distance.textContent = `${Math.floor(distanceNum)}M`
            }, 100)
            setTimeout(() => {
                // distance.textContent = `${Math.floor(gaugeNum*3)}M`
                distance.textContent = `${3*gaugeNum}M`
                clearInterval(distanceNumbering)
            },2000)

            if(gaugeNum>=204 && gaugeNum<=213) {
                let locGap = (gaugeNum - 210)*3
                setTimeout(() => {
                    ball.style.transform = `translateX(${curLocX - gaugeNum*3 + locGap}px)`
                    ball.style.transition = '.3s'
                }, 1900)
                setTimeout(() => {
                    tower.style.transform = 'translateY(-680px)'
                    setTimeout(() => {
                        resetFunc()
                        ball.classList.remove('100f')
                        ball.classList.add('99f')
                        document.querySelector('.user-interface .currentfloor').textContent = '(99F)'
                        distance.textContent = '0M'
                        puttingChance.textContent = `10/10`
                    }, 1500)
                }, 2100)
            }
        }
        else if (gaugeNum>=258) {
            console.log(gaugeNum)
            if(gaugeNum<282 || gaugeNum>288) {
            ball.style.transform = `translateX(${curLocX - 774}px)`
            ball.style.transition = '1.5s'
            setTimeout(() => {
                ball.style.transform = `translateX(${-1548 + curLocX + gaugeNum*3}px)`
            }, 1300)

            let distanceNumbering = setInterval(() => {
                distanceNum += 774/13          // gaugeNum이
                distance.textContent = `${Math.floor(distanceNum)}M` 
                    setTimeout(() => {
                            distanceNum -= (3*gaugeNum - 774)/8      //200ms 동안 2번 출력
                            distance.textContent = `${Math.floor(distanceNum)}M`
                        }, 1300)
            }, 100)
            setTimeout(() => {
                distance.textContent = `${774 - 3*gaugeNum}M`
                clearInterval(distanceNumbering)
            }, 1500)
            // setTimeout(() => {curLocX = -1548 + curLocX + gaugeNum*3},1550)
            // setTimeout(() => {console.log(curLocX)}, 2000)
        }
            // if(gaugeNum>=303 && gaugeNum<=309) {     //gauge>300은 존재하지 않는 경우
            //     let locGap = (gaugeNum - 306)*3
            //     console.log(locGap)
            //     ball.style.transform = `translateX(${curLocX - 774}px)`
            //     ball.style.transition = '1.5s'
            //     setTimeout(() => {
            //         ball.style.transform = `translateX(${-1548 + curLocX + gaugeNum*3}px)`
            //     }, 1300)
            //     setTimeout(() => {
            //         ball.style.transform = `translate(${-1548 + curLocX + gaugeNum*3 + locGap}px,0)`
            //         ball.style.transition = '.3s'
            //     }, 1900)
            //     setTimeout(() => {
            //         tower.style.transform = 'translateY(-660px)'
            //         setTimeout(() => {
            //             resetFunc()
            //             ball.classList.remove('100f')
            //             ball.classList.add('99f')
            //         }, 1500)
            //     }, 2100)
            //     setTimeout(() => {curLocX = -1548 + curLocX + gaugeNum*3 + locGap}, 1980)
            //     setTimeout(() => {console.log(curLocX)}, 2000)
            // }
        }
        if(gaugeNum!==207 && gaugeNum!==210 && gaugeNum!==213) {
            setTimeout(() => {
                resetBtn.disabled = false
                chanceLeftNum -- 
                puttingChance.textContent = `${chanceLeftNum}/10`
                if(chanceLeftNum<=0) {
                   setTimeout(() => {
                    ball.style.transform = 'translateX(0)'
                    tower.style.transform = 'translateY(0)'
                    tower.style.transition = '2.5s'
                    puttingChance.textContent = `100/100`
                    ball.classList.remove('100f')
                    ball.classList.add('rooftop')
                    chanceLeftNum = 100
                    resetFunc()
                   },1000)
                }
            },2000)
        }
    }
})

// ball.style.transform = 'translate(0,0)'       //gaugeNum = 15,18,21,24,...,294,297,300



resetBtn.addEventListener('click', () => {          //리셋버튼 클릭시(101층)
    resetBtn.disabled = true

    if(ball.classList.contains('rooftop')) {
        ball.style.transform = `translate(0,0)`
        ball.style.transition = '0s'
    }

    if(ball.classList.contains('100f')) {
        ball.style.transform = `translate(639px,0)`
        ball.style.transition = '0s'
    }

    gauge.classList.add('stop')
    resetFunc()

    distanceNum = 0
    distance.textContent = `${distanceNum}M`
})


