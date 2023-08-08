const ball = document.querySelector('.ball')
const gauge = document.querySelector('.gaugebar .gauge')
const gaugeStopBtn = document.querySelector('button.gaugestopbtn')
const resetBtn = document.querySelector('button.resetbtn')
const tower = document.querySelector('.tower')
const puttingChance = document.querySelector('.score-interface .puttingchance .chancenumber')
const distance = document.querySelector('.score-interface .balldistance .distancenumber')
const tipTip = document.querySelector('.score-interface .tip .text span:first-child')
const tipContent = document.querySelector('.score-interface .tip .text span:last-child')

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
 }, 20)

 let ex = 0

// setInterval(() => {
//     let exPlus = () => {ex++}
//     let exMinus = () => {ex--}
//         ex.classList.add('plus')
//     if(ex.classList.contains('plus')) {
//         exPlus()
//     }
//     setTimeout(() => {
//         ex.classList.remove('plus')
//         ex.classList.add('minus')}, 5000)
//     if(ex.classList.contains('minus')) {
//         exMinus()
//     }
//     console.log(ex)
// },1000)
 

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
    gaugeStopBtn.disabled = true

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
            tower.style.transition = '1.5s'
            tower.style.transitionTimingFunction = 'ease-in'
            gaugeStopBtn.disabled = true
            setTimeout(() => {
                resetFunc()
                ball.classList.remove('rooftop')
                ball.classList.add('100f')
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                distance.textContent = '0M'
                chanceLeftNum = 10
                puttingChance.textContent = `10/10`
                gaugeStopBtn.disabled = false
                resetBtn.disabled = true
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
            tower.style.transition = '1.5s'
            tower.style.transitionTimingFunction = 'ease-in'
            gaugeStopBtn.disabled = true
            setTimeout(() => {
                resetFunc()
                ball.classList.remove('rooftop')
                ball.classList.add('100f')
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                distance.textContent = '0M'
                chanceLeftNum = 10
                puttingChance.textContent = `10/10`
                gaugeStopBtn.disabled = false
                resetBtn.disabled = true
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
            tower.style.transition = '1.5s'
            tower.style.transitionTimingFunction = 'ease-in'
            gaugeStopBtn.disabled = true
            setTimeout(() => {
                resetFunc()
                ball.classList.remove('rooftop')
                ball.classList.add('100f')
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                distance.textContent = '0M'
                chanceLeftNum = 10
                puttingChance.textContent = `10/10`
                gaugeStopBtn.disabled = false
                resetBtn.disabled = true
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
            tower.style.transition = '1.5s'
            tower.style.transitionTimingFunction = 'ease-in'
            gaugeStopBtn.disabled = true
            setTimeout(() => {
                resetFunc()
                ball.classList.remove('rooftop')
                ball.classList.add('100f')
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                distance.textContent = '0M'
                chanceLeftNum = 10
                puttingChance.textContent = `10/10`
                gaugeStopBtn.disabled = false
                resetBtn.disabled = true
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

        let plus = setInterval(() => {
            distanceNum += 747/13
            distance.textContent = `${Math.floor(distanceNum)}M` 
        },100)

        setTimeout(() => {
            clearInterval(plus)
            distanceNum = 747
            let minus = setInterval(() => {
            distanceNum -= (3*gaugeNum-747)/13
            distance.textContent = `${Math.floor(distanceNum)}M`
             }, 100)
             setTimeout(() => {
                clearInterval(minus)
                distance.textContent = `${Math.floor(curLocX)}M`
            },1300)
        },1300)
    }

    if(gaugeNum==279 && ball.classList.contains('rooftop')) {
        setTimeout(() => {
            ball.style.transform = `translate(${1494 - 18 - gaugeNum*3}px,0)`
            ball.style.transition = '.3s'
        }, 1900)
        setTimeout(() => {
            tower.style.transform = 'translateY(-380px)'
            tower.style.transition = '1.5s'
            tower.style.transitionTimingFunction = 'ease-in'
            gaugeStopBtn.disabled = true
            setTimeout(() => {
                resetFunc()
                ball.classList.remove('rooftop')
                ball.classList.add('100f')
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                distance.textContent = '0M'
                chanceLeftNum = 10
                puttingChance.textContent = `10/10`
                gaugeStopBtn.disabled = false
                resetBtn.disabled = true
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
            tower.style.transition = '1.5s'
            tower.style.transitionTimingFunction = 'ease-in'
            gaugeStopBtn.disabled = true
            setTimeout(() => {
                resetFunc()
                ball.classList.remove('rooftop')
                ball.classList.add('100f')
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                distance.textContent = '0M'
                chanceLeftNum = 10
                puttingChance.textContent = `10/10`
                gaugeStopBtn.disabled = false
                resetBtn.disabled = true
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
            tower.style.transition = '1.5s'
            tower.style.transitionTimingFunction = 'ease-in'
            gaugeStopBtn.disabled = true
            setTimeout(() => {
                resetFunc()
                ball.classList.remove('rooftop')
                ball.classList.add('100f')
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                distance.textContent = '0M'
                chanceLeftNum = 10
                puttingChance.textContent = `10/10`
                gaugeStopBtn.disabled = false
                resetBtn.disabled = true
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
            tower.style.transition = '1.5s'
            tower.style.transitionTimingFunction = 'ease-in'
            gaugeStopBtn.disabled = true
            setTimeout(() => {
                resetFunc()
                ball.classList.remove('rooftop')
                ball.classList.add('100f')
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                distance.textContent = '0M'
                chanceLeftNum = 10
                puttingChance.textContent = `10/10`
                gaugeStopBtn.disabled = false
                resetBtn.disabled = true
            }, 1500)
        }, 2100)
        curLocX = 1494 + 9 - gaugeNum*3 
    }

    if(gaugeNum!==210 && gaugeNum!==213 && gaugeNum!==216 && gaugeNum!==219     //골이 안들어간 경우
        && gaugeNum!==279 && gaugeNum!==282 && gaugeNum!==285 && gaugeNum!==288
        && ball.classList.contains('rooftop')) {
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
                    tower.style.transition = '1.5s'
                    tower.style.transitionTimingFunction = 'ease-in'
                    gaugeStopBtn.disabled = true
                    setTimeout(() => {
                        resetFunc()
                        ball.classList.remove('100f')
                        ball.classList.add('99f')
                        document.querySelector('.user-interface .currentfloor').textContent = 'SKY CAFE (99F)'
                        distance.textContent = '0M'
                        chanceLeftNum = 10
                        puttingChance.textContent = `${chanceLeftNum}/10`
                        gaugeStopBtn.disabled = false
                        resetBtn.disabled = true
                    }, 1500)
                }, 2100)
            }
        }
        else if (gaugeNum>=258) {
            // if(gaugeNum<282 || gaugeNum>288) {
            ball.style.transform = `translateX(${curLocX - 774}px)`
            ball.style.transition = '1.5s'
            distanceNum = 0
            setTimeout(() => {
                ball.style.transform = `translateX(${-1548 + curLocX + gaugeNum*3}px)`
            }, 1300)

            let plus = setInterval(() => {
                distanceNum += 774/13
                distance.textContent = `${Math.floor(distanceNum)}M` 
            },100)

            setTimeout(() => {
                clearInterval(plus)
                distanceNum = 774
                let minus = setInterval(() => {
                distanceNum -= (3*gaugeNum-774)/13
                distance.textContent = `${Math.floor(distanceNum)}M`
                 }, 100)
                 setTimeout(() => {
                    clearInterval(minus)
                    distance.textContent = `${Math.floor(1548-3*gaugeNum)}M`
                },1300)
            },1300)
        }

        if(gaugeNum!==204 && gaugeNum!==207 && gaugeNum!==210 && gaugeNum!==213) {
            setTimeout(() => {
                resetBtn.disabled = false
                chanceLeftNum -- 
                puttingChance.textContent = `${chanceLeftNum}/10`
                if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
                   setTimeout(() => {
                    ball.style.transform = 'translateX(0)'
                    tower.style.transform = 'translateY(0)'
                    tower.style.transition = '2.5s'
                    gaugeStopBtn.disabled = true
                    puttingChance.textContent = `100/100`
                    ball.classList.remove('100f')
                    ball.classList.add('rooftop')
                    chanceLeftNum = 100
                    distanceNum = 0
                    distance.textContent = `${distanceNum}M`
                    document.querySelector('.user-interface .currentfloor').textContent = 'ROOFTOP (101F)'
                    setTimeout(() => {
                        resetFunc()
                        gaugeStopBtn.disabled = false
                    },2500)
                   },1000)
                }
            },2000)
        }
    }

    if(ball.classList.contains('99f')) {        //99층      gaugeNum=69~77골인  240부터는 벽에 튕겨야됨
       if(gaugeNum<240) {
            ball.style.transform = `translateX(${9 + gaugeNum*3}px)`
            ball.style.transition = '2s'
            distanceNum = 0
            let distanceNumbering = setInterval(() => {
                distanceNum += (gaugeNum*3)/20
                distance.textContent = `${Math.floor(distanceNum)}M`
            }, 100)
            setTimeout(() => {
                distance.textContent = `${3*gaugeNum}M`
                clearInterval(distanceNumbering)
            },2000)

            if(gaugeNum>=69 && gaugeNum<=78) {      //골 들어가는 경우 69,72,75,78 -> 217,226,235,244
                let locGap = 3*gaugeNum - 219
                setTimeout(() => {
                    ball.style.transform = `translateX(${9 + gaugeNum*3 - locGap}px)`
                    ball.style.transition = '.3s'
                }, 1900)           
                setTimeout(() => {
                    tower.style.transform = 'translateY(-1010px)'
                    tower.style.transition = '1.5s'
                    tower.style.transitionTimingFunction = 'ease-in'
                    gaugeStopBtn.disabled = true
                    setTimeout(() => {
                        resetFunc()
                        ball.classList.remove('99f')
                        ball.classList.add('98f')
                        document.querySelector('.user-interface .currentfloor').textContent = 'SKY CAFETERIA (98F)'
                        distanceNum = 0
                        distance.textContent = `${distanceNum}M`
                        chanceLeftNum = 10
                        puttingChance.textContent = `10/10`
                        gaugeStopBtn.disabled = false
                        resetBtn.disabled = true
                    }, 1500)
                }, 2100)
            }
       }

       if(gaugeNum>=240) {                  //골 안들어가는 경우 + 벽에 튕김
        ball.style.transform = `translateX(729px)`
        ball.style.transition = '1.5s'
        distanceNum = 0
        setTimeout(() => {
            ball.style.transform = `translateX(${1440 + 9 - gaugeNum*3}px)`
        }, 1300)

        let plus = setInterval(() => {
            distanceNum += 720/13
            distance.textContent = `${Math.floor(distanceNum)}M` 
        },100)

        setTimeout(() => {
            clearInterval(plus)
            distanceNum = 720
            let minus = setInterval(() => {
            distanceNum -= (3*gaugeNum-720)/13
            distance.textContent = `${Math.floor(distanceNum)}M`
             }, 100)
             setTimeout(() => {
                clearInterval(minus)
                distance.textContent = `${Math.floor(1440-3*gaugeNum)}M`
            },1300)
        },1300)
    }

       if(gaugeNum<69 || gaugeNum>77) {        //골 안들어가는 경우 + 벽에 안튕김
        setTimeout(() => {
            resetBtn.disabled = false
            chanceLeftNum -- 
            puttingChance.textContent = `${chanceLeftNum}/10`
            if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
               setTimeout(() => {
                ball.style.transform = 'translateX(639px)'
                tower.style.transform = 'translateY(-380px)'
                tower.style.transition = '2.5s'
                gaugeStopBtn.disabled = true
                puttingChance.textContent = `10/10`
                ball.classList.remove('99f')
                ball.classList.add('100f')
                chanceLeftNum = 10
                distanceNum = 0
                distance.textContent = `${distanceNum}M`
                document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
                setTimeout(() => {
                    resetFunc()
                    gaugeStopBtn.disabled = false
                },2500)
               },1000)
            }
        },2000)
    }
    }

    if(ball.classList.contains('98f')) {        //98층      gaugeNum=144~150골인  168부터는 벽에 튕겨야됨
        if(gaugeNum<168) {
             ball.style.transform = `translateX(${228 + gaugeNum*3}px)`
             ball.style.transition = '2s'
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
 
             if(gaugeNum>=144 && gaugeNum<=150) {      //골 들어가는 경우 144,147,150
                 let locGap = (gaugeNum - 147)*3
                 setTimeout(() => {
                     ball.style.transform = `translateX(${228 + gaugeNum*3 - locGap}px)`
                     ball.style.transition = '.3s'
                 }, 1900)           
                 setTimeout(() => {
                     tower.style.transform = 'translateY(-1340px)'
                     tower.style.transition = '1.5s'
                     tower.style.transitionTimingFunction = 'ease-in'
                     gaugeStopBtn.disabled = true
                     setTimeout(() => {
                         resetFunc()
                         ball.classList.remove('98f')
                         ball.classList.add('97f')
                         document.querySelector('.user-interface .currentfloor').textContent = 'SKY GARDEN (97F)'
                         distanceNum = 0
                         distance.textContent = `${distanceNum}M`
                         chanceLeftNum = 10
                         puttingChance.textContent = `10/10`
                         gaugeStopBtn.disabled = false
                         resetBtn.disabled = true
                         tipTip.style.visibility = 'visible'
                         tipContent.textContent = 'You can\'t access to the Cannibalism.'
                     }, 1500)
                 }, 2100)
             }
        }
 
        if(gaugeNum>=168) {                  //골 안들어가는 경우 + 벽에 튕김
         ball.style.transform = 'translateX(729px)'
         ball.style.transition = '1.5s'
         distanceNum = 0
         setTimeout(() => {
             ball.style.transform = `translateX(${1002 + 228 - gaugeNum*3}px)`
             ball.style.transition = `${gaugeNum/100}s`
             ball.style.transitionTimingFunction = 'ease-out'
         }, 1300)
 
        let plus = setInterval(() => {
                    distanceNum += 501/13
                    distance.textContent = `${Math.floor(distanceNum)}M`},100)

        setTimeout(() => {
            clearInterval(plus)
            distanceNum = 501
            let minus = setInterval(() => {
                distanceNum -= (3*gaugeNum-501)*10/gaugeNum
                distance.textContent = `${Math.floor(distanceNum)}M`
            }, 100)
            setTimeout(() => {
                clearInterval(minus)
                distance.textContent = `${Math.floor(1002-3*gaugeNum)}M`
            },10*gaugeNum)
            },1300)


         if(gaugeNum>=183 && gaugeNum<=192) {       //골 들어가는 경우 + 벽에 튕김
            let locGap = (186 - gaugeNum)*3
            setTimeout(() => {
                ball.style.transform = `translateX(${1002 + 228 - gaugeNum*3 - locGap}px)`
                ball.style.transition = '.3s'
            }, 1900)      //     
            setTimeout(() => {
                tower.style.transform = 'translateY(-1340px)'
                tower.style.transition = '1.5s'
                tower.style.transitionTimingFunction = 'ease-in'
                gaugeStopBtn.disabled = true
                setTimeout(() => {
                    resetFunc()
                    ball.classList.remove('98f')
                    ball.classList.add('97f')
                    document.querySelector('.user-interface .currentfloor').textContent = 'SKY GARDEN (97F)'
                    distanceNum = 0
                    distance.textContent = `${distanceNum}M`
                    chanceLeftNum = 10
                    puttingChance.textContent = `${chanceLeftNum}/10`
                    gaugeStopBtn.disabled = false
                    resetBtn.disabled = true
                    tipTip.style.visibility = 'visible'
                    tipContent.textContent = 'You can\'t access to the Cannibalism.'
                }, 1500)
            }, 2100)
         }
        }

        if(gaugeNum<144 || gaugeNum>150) {        //골 안들어가는 경우 + 벽에 안튕김
            setTimeout(() => {
                resetBtn.disabled = false
                chanceLeftNum -- 
                puttingChance.textContent = `${chanceLeftNum}/10`
                if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
                   setTimeout(() => {
                    ball.style.transform = 'translateX(9px)'
                    tower.style.transform = 'translateY(-680px)'
                    tower.style.transition = '2.5s'
                    gaugeStopBtn.disabled = true
                    puttingChance.textContent = `10/10`
                    ball.classList.remove('98f')
                    ball.classList.add('99f')
                    chanceLeftNum = 10
                    distanceNum = 0
                    distance.textContent = `${distanceNum}M`
                    document.querySelector('.user-interface .currentfloor').textContent = 'SKY CAFE (99F)'
                    setTimeout(() => {
                        resetFunc()
                        gaugeStopBtn.disabled = false
                    },2500)
                   },1000)
                }
            },2000)
        }
     }

     if(ball.classList.contains('97f')) {        //97층     
        if(gaugeNum<201) {
             ball.style.transform = `translateX(${669 - gaugeNum*3}px)`
             ball.style.transition = '2s'
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
 
             if(gaugeNum>=162 && gaugeNum<=171) {      //골 들어가는 경우 162,165,(정중앙)168,171
                 let locGap = (gaugeNum - 168)*3
                 setTimeout(() => {
                     ball.style.transform = `translateX(${669 - gaugeNum*3 + locGap}px)`
                     ball.style.transition = '.3s'
                 }, 1900)           
                 setTimeout(() => {
                     tower.style.transform = 'translateY(-1670px)'
                     tower.style.transition = '1.5s'
                     tower.style.transitionTimingFunction = 'ease-in'
                     gaugeStopBtn.disabled = true
                     setTimeout(() => {
                         resetFunc()
                         ball.classList.remove('97f')
                         ball.classList.add('96f')
                         document.querySelector('.user-interface .currentfloor').textContent = 'SKY HOTEL (96F)'
                         distanceNum = 0
                         distance.textContent = `${distanceNum}M`
                         chanceLeftNum = 10
                         puttingChance.textContent = `10/10`
                         gaugeStopBtn.disabled = false
                         resetBtn.disabled = true
                         tipTip.style.visibility = 'hidden'
                         tipContent.textContent = ''
                     }, 1500)
                 }, 2100)
             }
        }
 
        if(gaugeNum>=201) {                  //골 안들어가는 경우 + 유리벽에 튕김
         ball.style.transform = 'translateX(66px)'
         ball.style.transition = '1.5s'
         distanceNum = 0
         setTimeout(() => {
             ball.style.transform = `translateX(${66 + gaugeNum*3 - 603}px)`
             ball.style.transition = `${gaugeNum/100}s`
             ball.style.transitionTimingFunction = 'ease-out'
         }, 1300)
 
        let plus = setInterval(() => {
                    distanceNum += 603/13
                    distance.textContent = `${Math.floor(distanceNum)}M`},100)

        setTimeout(() => {
            clearInterval(plus)
            distanceNum = 603
            let minus = setInterval(() => {
                distanceNum -= (3*gaugeNum-603)*10/gaugeNum
                distance.textContent = `${Math.floor(distanceNum)}M`
            }, 100)
            setTimeout(() => {
                clearInterval(minus)
                distance.textContent = `${Math.floor(1206-3*gaugeNum)}M`
            },10*gaugeNum)
            },1250)

            if(gaugeNum>=231 && gaugeNum<=240) {       //골 들어가는 경우 + 유리벽에 튕김
                let locGap = (234 - gaugeNum)*3
                setTimeout(() => {
                    ball.style.transform = `translateX(${66 + 3*gaugeNum - 603 + locGap}px)`
                    ball.style.transition = '.3s'
                }, 2000)      
                setTimeout(() => {
                    tower.style.transform = 'translateY(-1670px)'
                    tower.style.transition = '1.5s'
                    tower.style.transitionTimingFunction = 'ease-in'
                    gaugeStopBtn.disabled = true
                    setTimeout(() => {
                        resetFunc()
                        ball.classList.remove('97f')
                        ball.classList.add('96f')
                        document.querySelector('.user-interface .currentfloor').textContent = 'SKY HOTEL (96F)'
                        distanceNum = 0
                        distance.textContent = `${distanceNum}M`
                        chanceLeftNum = 10
                        puttingChance.textContent = `${chanceLeftNum}/10`
                        gaugeStopBtn.disabled = false
                        resetBtn.disabled = true
                        tipTip.style.visibility = 'hidden'
                        tipContent.textContent = ''
                    }, 1500)
                }, 2200)
             }
     }

     if(gaugeNum<162 || gaugeNum>171) {        //골 안들어가는 경우 + 벽에 안튕김
        setTimeout(() => {
            resetBtn.disabled = false
            chanceLeftNum -- 
            puttingChance.textContent = `${chanceLeftNum}/10`
            if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
               setTimeout(() => {
                ball.style.transform = 'translateX(228px)'
                tower.style.transform = 'translateY(-1340px)'
                tower.style.transition = '2.5s'
                gaugeStopBtn.disabled = true
                puttingChance.textContent = `10/10`
                ball.classList.remove('97f')
                ball.classList.add('98f')
                chanceLeftNum = 10
                distanceNum = 0
                distance.textContent = `${distanceNum}M`
                document.querySelector('.user-interface .currentfloor').textContent = 'SKY CAFETERIA (98F)'
                tipTip.style.visibility = 'hidden'
                tipContent.textContent = ''
                setTimeout(() => {
                    resetFunc()
                    gaugeStopBtn.disabled = false
                },2500)
               },1000)
            }
        },2000)
    }
}


    if(ball.classList.contains('96f')) {        //96층     

        if(gaugeNum<188) {
             ball.style.transform = `translateX(${165 + gaugeNum*3}px)`
             ball.style.transition = '2s'
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
 
             if(gaugeNum>=135 && gaugeNum<=141) {      //골 들어가는 경우 162,165,(정중앙)168,171
                 let locGap = (gaugeNum - 138)*3
                 setTimeout(() => {
                     ball.style.transform = `translateX(${165 + gaugeNum*3 - locGap}px)`
                     ball.style.transition = '.3s'
                 }, 1900)           
                 setTimeout(() => {
                     tower.style.transform = 'translateY(-2000px)'
                     setTimeout(() => {
                        ball.style.transform = 'translateX(420px)'
                        ball.style.transition = '.5s'
                        ball.style.transitionTimingFunction = 'ease-out'
                    }, 1000)
                     tower.style.transition = '1.5s'
                     tower.style.transitionTimingFunction = 'ease-in'
                     gaugeStopBtn.disabled = true
                     setTimeout(() => {
                         resetFunc()
                         ball.classList.remove('96f')
                         ball.classList.add('95f')
                         document.querySelector('.user-interface .currentfloor').textContent = 'PLAYGROUND (95F)'
                         distanceNum = 0
                         distance.textContent = `${distanceNum}M`
                         chanceLeftNum = 10
                         puttingChance.textContent = `10/10`
                         gaugeStopBtn.disabled = false
                         resetBtn.disabled = true  
                     }, 1500)
                 }, 2100)
             }
        }
 
        if(gaugeNum>=188) {                  //골 안들어가는 경우 + 벽에 튕김
         ball.style.transform = 'translateX(729px)'
         ball.style.transition = '1.5s'
         distanceNum = 0
         setTimeout(() => {
             ball.style.transform = `translateX(${729 - gaugeNum*3 + 564}px)`
             ball.style.transition = `${gaugeNum/100}s`
             ball.style.transitionTimingFunction = 'ease-out'
         }, 1300)
 
        let plus = setInterval(() => {
                    distanceNum += 564/13
                    distance.textContent = `${Math.floor(distanceNum)}M`},100)

        setTimeout(() => {
            clearInterval(plus)
            distanceNum = 564
            let minus = setInterval(() => {
                distanceNum -= (3*gaugeNum-564)*10/gaugeNum
                distance.textContent = `${Math.floor(distanceNum)}M`
            }, 100)
            setTimeout(() => {
                clearInterval(minus)
                distance.textContent = `${Math.floor(564*2-3*gaugeNum)}M`
            },10*gaugeNum)
            },1250)

            if(gaugeNum>=235 && gaugeNum<=241) {       //골 들어가는 경우 + 벽에 튕김
                let locGap = (238 - gaugeNum)*3
                setTimeout(() => {
                    ball.style.transform = `translateX(${165 - 3*gaugeNum +1128 - locGap}px)`
                    ball.style.transition = '.3s'
                }, 2000)      
                setTimeout(() => {
                    tower.style.transform = 'translateY(-2000px)'
                    setTimeout(() => {
                        ball.style.transform = 'translateX(420px)'
                        ball.style.transition = '.5s'
                    }, 1000)
                    tower.style.transition = '1.5s'
                    tower.style.transitionTimingFunction = 'ease-in'
                    gaugeStopBtn.disabled = true
                    setTimeout(() => {
                        resetFunc()
                        ball.classList.remove('96f')
                        ball.classList.add('95f')
                        document.querySelector('.user-interface .currentfloor').textContent = 'PLAYGROUND (95F)'
                        distanceNum = 0
                        distance.textContent = `${distanceNum}M`
                        chanceLeftNum = 10
                        puttingChance.textContent = `${chanceLeftNum}/10`
                        gaugeStopBtn.disabled = false
                        resetBtn.disabled = true
                    }, 1500)
                }, 2200)
             }
     }

     if(gaugeNum<135 || gaugeNum>141) {        //골 안들어가는 경우 + 벽에 안튕김
        setTimeout(() => {
            resetBtn.disabled = false
            chanceLeftNum -- 
            puttingChance.textContent = `${chanceLeftNum}/10`
            if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
               setTimeout(() => {
                ball.style.transform = 'translateX(669px)'
                tower.style.transform = 'translateY(-1340px)'
                tower.style.transition = '2.5s'
                gaugeStopBtn.disabled = true
                puttingChance.textContent = `10/10`
                ball.classList.remove('96f')
                ball.classList.add('97f')
                chanceLeftNum = 10
                distanceNum = 0
                distance.textContent = `${distanceNum}M`
                document.querySelector('.user-interface .currentfloor').textContent = 'SKY GARDEN (97F)'
                tipTip.style.visibility = 'visible'
                tipContent.textContent = 'You can\'t access to the Cannibalism.'
                setTimeout(() => {
                    resetFunc()
                    gaugeStopBtn.disabled = false
                },2500)
               },1000)
            }
        },2000)
    }}

    if(ball.classList.contains('95f')) {        //95층     

        if(gaugeNum<147) {
             ball.style.transform = `translateX(${420 - gaugeNum*3}px)`
             ball.style.transition = '2s'
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
 
             if(gaugeNum>=138 && gaugeNum<=144) {      //골 들어가는 경우 162,165,(정중앙)168,171
                 let locGap = (gaugeNum - 141)*3
                 setTimeout(() => {
                     ball.style.transform = `translateX(${420 - gaugeNum*3 + locGap}px)`
                     ball.style.transition = '.3s'
                 }, 1900)           
                 setTimeout(() => {
                     tower.style.transform = 'translateY(-2330px)'
                     tower.style.transition = '1.5s'
                     tower.style.transitionTimingFunction = 'ease-in'
                     gaugeStopBtn.disabled = true
                     setTimeout(() => {
                         resetFunc()
                         ball.classList.remove('95f')
                         ball.classList.add('94f')
                         document.querySelector('.user-interface .currentfloor').textContent = 'SWIMMING POOL (94F)'
                         distanceNum = 0
                         distance.textContent = `${distanceNum}M`
                         chanceLeftNum = 10
                         puttingChance.textContent = `10/10`
                         gaugeStopBtn.disabled = false
                         resetBtn.disabled = true  
                     }, 1500)
                 }, 2100)
             }

        if(gaugeNum<138 || gaugeNum>141) {
        setTimeout(() => {
            resetBtn.disabled = false
            chanceLeftNum -- 
            puttingChance.textContent = `${chanceLeftNum}/10`
            if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
               setTimeout(() => {
                ball.style.transform = 'translateX(669px)'
                tower.style.transform = 'translateY(-1340px)'
                tower.style.transition = '2.5s'
                gaugeStopBtn.disabled = true
                puttingChance.textContent = `10/10`
                ball.classList.remove('96f')
                ball.classList.add('97f')
                chanceLeftNum = 10
                distanceNum = 0
                distance.textContent = `${distanceNum}M`
                document.querySelector('.user-interface .currentfloor').textContent = 'SKY GARDEN (97F)'
                tipTip.style.visibility = 'visible'
                tipContent.textContent = 'You can\'t access to the Cannibalism.'
                setTimeout(() => {
                    resetFunc()
                    gaugeStopBtn.disabled = false
                },2500)
               },1000)
            }
        },2000)
       }}
 
        if(gaugeNum>=147) {                  //골 안들어가는 경우 + 벽에 튕김
         ball.style.transform = 'translateX(-18px)'
         ball.style.transition = '1.5s'
         distanceNum = 0
         setTimeout(() => {
             ball.style.transform = `translateX(50px)`
             ball.style.transition = `.5s`
             ball.style.transitionTimingFunction = 'linear'
         }, 1300)

            setTimeout(() => {
                ball.style.transform = 'translateX(212px)'
                ball.style.transition = '.5s'
                ball.style.transitionTimingFunction = 'ease-out'
                tower.style.transform = 'translateY(-1916px)'
                tower.style.transition = '.5s'
                tower.style.transitionTimingFunction = 'ease-out'
            },1700)

            setTimeout(() => {
                ball.style.transform = 'translateX(303px)'
                ball.style.transition = '.5s'
                ball.style.transitionTimingFunction = 'ease-out'
                tower.style.transform = 'translateY(-1960px)'
                tower.style.transition = '.5s'
                tower.style.transitionTimingFunction = 'ease-out'
            },2100)

            setTimeout(() => {
                ball.style.transform = 'translateX(0px)'
                ball.style.transition = '3s'
                ball.style.transitionTimingFunction = 'ease-out'
                tower.style.transform = 'translateY(600px)'
                tower.style.transition = '3s'
                tower.style.transitionTimingFunction = 'ease-out'
            },2500)

            setTimeout(() => {
                tower.style.transform = 'translateY(0px)'
                tower.style.transition = '.3s'
                tower.style.transitionTimingFunction = 'ease-in'
            },5000)

            setTimeout(() => {

            }, 3000)
 
        let plus = setInterval(() => {
                    distanceNum += 441/13
                    distance.textContent = `${Math.floor(distanceNum)}M`},100)

        setTimeout(() => {
            clearInterval(plus)
            distance.textContent = '???'
            },1250)

        setTimeout(() => {
                gaugeStopBtn.disabled = true
                puttingChance.textContent = `100/100`
                ball.classList.remove('95f')
                ball.classList.add('rooftop')
                chanceLeftNum = 100
                distanceNum = 0
                distance.textContent = `${distanceNum}M`
                document.querySelector('.user-interface .currentfloor').textContent = 'ROOFTOP (101F)'
                setTimeout(() => {
                    resetFunc()
                    gaugeStopBtn.disabled = false
                },2500)
        },3000)

        }
    }
    
})

// ball.style.transform = 'translate(303px,1960px)'       //420 - 3(3n) = 66 (-126px일때 왼쪽벽 충돌, 729px 오른쪽)



resetBtn.addEventListener('click', () => {          //리셋버튼 클릭시(101층)
    resetBtn.disabled = true
    gaugeStopBtn.disabled = false

    if(ball.classList.contains('rooftop')) {
        ball.style.transform = `translate(0,0)`
        ball.style.transition = '0s'
    }

    if(ball.classList.contains('100f')) {
        ball.style.transform = `translate(639px,0)`
        ball.style.transition = '0s'
    }

    if(ball.classList.contains('99f')) {
        ball.style.transform = `translate(10px,0)`
        ball.style.transition = '0s'
    }

    if(ball.classList.contains('98f')) {
        ball.style.transform = `translate(228px,0)`
        ball.style.transition = '0s'
    }

    if(ball.classList.contains('97f')) {
        ball.style.transform = `translate(669px,0)`
        ball.style.transition = '0s'
    }

    if(ball.classList.contains('96f')) {
        ball.style.transform = `translate(165px,0)`
        ball.style.transition = '0s'
    }

    if(ball.classList.contains('95f')) {
        ball.style.transform = `translate(420px,0)`
        ball.style.transition = '0s'
    }    

    gauge.classList.add('stop')
    resetFunc()

    distanceNum = 0
    distance.textContent = `${distanceNum}M`
})


