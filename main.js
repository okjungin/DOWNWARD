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

    if(ball.classList.contains('rooftop')) {

    if(gaugeNum<243)      //101층 
    {
        ball.style.transform = `translateX(${gaugeNum*3}px)`
        ball.style.transition = '2s'

       let distanceNumbering = setInterval(() => {         //score-interface distance 계산 함수
            distanceNum += (gaugeNum*3)/20
            distance.textContent = `${Math.floor(distanceNum)}M`                               //curLocX면 curLocX 그대로 출력, 3*gaugeNum도 마찬가지
        }, 100)
        setTimeout(() => {
            distance.textContent = `${3*gaugeNum}M`    
            clearInterval(distanceNumbering)        //공이 멈춘 후 약 2초내로 resetbtn을 누를 시 문제 발생 -> 
        },2000)      

        if(gaugeNum>=210 && gaugeNum<=219 && gaugeNum!==213) {
            // let locGap = (gaugeNum - 213)*3
            setTimeout(() => {
                ball.style.transform = `translate(639px,0)`
                if(gaugeNum!==213){ball.style.transition = '.3s'}
                else {ball.style.transition = '0s'}
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
        }

        if(gaugeNum==213) {
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
                },1800)
        }

        if(gaugeNum<210 || gaugeNum>219) {
           setTimeout(() => {
               chanceLeftNum -- 
               puttingChance.textContent = `${chanceLeftNum}/100`
                   resetBtn.disabled = false
           },2000)
        }
    } 

    if(gaugeNum>=243) {
        ball.style.transform = `translateX(735px)`  //rooftop만 735(벽이 얇음)
        ball.style.transition = '1.5s' // 1.5s->2s
        setTimeout(() => {
            ball.style.transform = `translateX(${1470 - gaugeNum*3}px)`
            ball.style.transition = `${(gaugeNum-120)/100}s`  //gaugeNum/100->(3*gaugeNum-735)/50
        }, 1300)    //1300->1800

        let plus = setInterval(() => {
            distanceNum += 735/13
            distance.textContent = `${Math.floor(distanceNum)}M` 
        },100)

        setTimeout(() => {
            clearInterval(plus)
            distanceNum = 735
            let minus = setInterval(() => {
            distanceNum -= (3*gaugeNum-735)*10/(gaugeNum-120)
            distance.textContent = `${Math.floor(distanceNum)}M`
             }, 100)
             setTimeout(() => {
                clearInterval(minus)
                distance.textContent = `${Math.floor(1470 - 3*gaugeNum)}M`
            },(gaugeNum-120)*10) //10*gaugeNum -> (3*gaugeNum-729)*10
        },1300) //1300->1800

        if(gaugeNum>=270 && gaugeNum<=279) {

            // let locGap = (gaugeNum - 276)*3
            setTimeout(() => {
                ball.style.transform = `translate(639px,0)`
                ball.style.transition = '.3s'
            }, (gaugeNum-120)*10+500) //gaugeNum*10->(3*gaugeNum-729)*10
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
            }, (gaugeNum-120)*10+700) //gaugeNum*10+200->(3*gaugeNum-735)*20+200
        }

        // if(gaugeNum==276) {
        //     setTimeout(() => {
        //         tower.style.transform = 'translateY(-380px)'
        //         tower.style.transition = '1.5s'
        //         tower.style.transitionTimingFunction = 'ease-in'
        //         gaugeStopBtn.disabled = true
        //         setTimeout(() => {
        //             resetFunc()
        //             ball.classList.remove('rooftop')
        //             ball.classList.add('100f')
        //             document.querySelector('.user-interface .currentfloor').textContent = 'SKYLOUNGE (100F)'
        //             distance.textContent = '0M'
        //             chanceLeftNum = 10
        //             puttingChance.textContent = `10/10`
        //             gaugeStopBtn.disabled = false
        //             resetBtn.disabled = true
        //         }, 1500)
        //     }, gaugeNum*10) //gaugeNum*10+200->(3*gaugeNum-735)*20+200
        // }
    
        if(gaugeNum<270 || gaugeNum>279) {
            setTimeout(() => {
                chanceLeftNum -- 
                puttingChance.textContent = `${chanceLeftNum}/100`
                resetBtn.disabled = false
            },(gaugeNum-120)*10+1300) //10*gaugeNum+1300 -> 1800+(3*gaugeNum-735)*20
         }
    }
}


    if(ball.classList.contains('100f')) {           // 100층

        if(gaugeNum<255) {
            ball.style.transform = `translateX(${639 - gaugeNum*3}px)` //curLocX = 
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

            if(gaugeNum==204 || gaugeNum==207 || gaugeNum==213) {
                // let locGap = (gaugeNum - 210)*3
                setTimeout(() => {
                    ball.style.transform = `translateX(9px)`
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

            if(gaugeNum==210) {
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
                }, 1800)
            }
        }

        else if (gaugeNum>=255) {
            ball.style.transform = `translateX(-126px)`
            ball.style.transition = '1.5s'
            distanceNum = 0
            setTimeout(() => {
                ball.style.transform = `translateX(${639 + gaugeNum*3 - 1530}px)`
                ball.style.transition = `${(gaugeNum-120)/100}s`
            }, 1300)

            let plus = setInterval(() => {
                distanceNum += 765/13
                distance.textContent = `${Math.floor(distanceNum)}M` 
            },100)

            setTimeout(() => {
                clearInterval(plus)
                distanceNum = 765
                let minus = setInterval(() => {
                distanceNum -= (3*gaugeNum-765)*10/(gaugeNum-120)
                distance.textContent = `${Math.floor(distanceNum)}M`
                 }, 100)
                 setTimeout(() => {
                    clearInterval(minus)
                    distance.textContent = `${Math.floor(1530-3*gaugeNum)}M`
                },10*(gaugeNum-120))
            },1300)


        if(gaugeNum>=297 && gaugeNum<=303) {

            // let locGap = (gaugeNum - 297)*3
            setTimeout(() => {
                ball.style.transform = `translate(9px,0)`
                ball.style.transition = '.3s'
            }, 10*(gaugeNum-120)+500)
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
                    puttingChance.textContent = `10/10`
                    gaugeStopBtn.disabled = false
                    resetBtn.disabled = true
                }, 1500)
            }, 10*(gaugeNum-120)+700)
        }
        }

        if(gaugeNum<204 || (gaugeNum>213&&gaugeNum<297)) {
            setTimeout(() => {
                if(gaugeNum<255) {
                     resetBtn.disabled = false
                     chanceLeftNum -- 
                     puttingChance.textContent = `${chanceLeftNum}/10` }
                else {
                    setTimeout(() => { 
                        resetBtn.disabled = false
                        chanceLeftNum --
                        puttingChance.textContent = `${chanceLeftNum}/10` },-700+10*(gaugeNum-120))
                    }
                
                if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
                    resetBtn.disabled = true
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

            if(gaugeNum>=69 && gaugeNum<=78 && gaugeNum!==72) {      //골 들어가는 경우 69,72,75,78 -> 217,226,235,244
                // let locGap = 3*gaugeNum - 219
                setTimeout(() => {
                    ball.style.transform = `translateX(228px)`
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
                        document.querySelector('.user-interface .currentfloor').textContent = 'CAFETERIA (98F)'
                        distanceNum = 0
                        distance.textContent = `${distanceNum}M`
                        chanceLeftNum = 10
                        puttingChance.textContent = `10/10`
                        gaugeStopBtn.disabled = false
                        resetBtn.disabled = true
                    }, 1500)
                }, 2100)
            }

            if(gaugeNum==72) {
                setTimeout(() => {
                    tower.style.transform = 'translateY(-1010px)'
                    tower.style.transition = '1.5s'
                    tower.style.transitionTimingFunction = 'ease-in'
                    gaugeStopBtn.disabled = true
                    setTimeout(() => {
                        resetFunc()
                        ball.classList.remove('99f')
                        ball.classList.add('98f')
                        document.querySelector('.user-interface .currentfloor').textContent = 'CAFETERIA (98F)'
                        distanceNum = 0
                        distance.textContent = `${distanceNum}M`
                        chanceLeftNum = 10
                        puttingChance.textContent = `10/10`
                        gaugeStopBtn.disabled = false
                        resetBtn.disabled = true
                    }, 1500)
                }, 1800)
            }
       }

       if(gaugeNum>=240) {                  //골 안들어가는 경우 + 벽에 튕김
        ball.style.transform = `translateX(729px)`
        ball.style.transition = '1.5s'
        distanceNum = 0
        setTimeout(() => {
            ball.style.transform = `translateX(${729 - gaugeNum*3 + 720}px)`
            ball.style.transition = `${(gaugeNum-120)/100}s`
        }, 1300)

        let plus = setInterval(() => {
            distanceNum += 720/13
            distance.textContent = `${Math.floor(distanceNum)}M` 
        },100)

        setTimeout(() => {
            clearInterval(plus)
            distanceNum = 720
            let minus = setInterval(() => {
            distanceNum -= (3*gaugeNum-720)*10/(gaugeNum-120)
            distance.textContent = `${Math.floor(distanceNum)}M`
             }, 100)
             setTimeout(() => {
                clearInterval(minus)
                distance.textContent = `${Math.floor(1440-3*gaugeNum)}M`
            },10*(gaugeNum-120))
        },1300)
    }

    if(gaugeNum<69 || gaugeNum>77) {        //골 안들어가는 경우 + 벽에 안튕김
        setTimeout(() => {
            if(gaugeNum<240) {
                resetBtn.disabled = false
                chanceLeftNum -- 
                puttingChance.textContent = `${chanceLeftNum}/10`}
            else {
                setTimeout(() => {
                resetBtn.disabled = false
                chanceLeftNum -- 
                puttingChance.textContent = `${chanceLeftNum}/10`},-700+10*(gaugeNum-120))}
            if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
                resetBtn.disabled = true
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
                 distance.textContent = `${3*gaugeNum}M`
                 clearInterval(distanceNumbering)
             },2000)
 
             if(gaugeNum==144 || gaugeNum==150) {      //골 들어가는 경우 144,147,150
                //  let locGap = (gaugeNum - 147)*3
                 setTimeout(() => {
                     ball.style.transform = `translateX(669px)`
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

             if(gaugeNum==147) {
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
                }, 1800)
             }
        }
 
        if(gaugeNum>=168) {                  //골 안들어가는 경우 + 벽에 튕김
         ball.style.transform = 'translateX(729px)'
         ball.style.transition = '1.5s'
         distanceNum = 0
         setTimeout(() => {
             ball.style.transform = `translateX(${228 + 1002 - 3*gaugeNum}px)`
             ball.style.transition = `${(gaugeNum-40)/100}s`
         }, 1300)
 
        let plus = setInterval(() => {
                    distanceNum += 501/13
                    distance.textContent = `${Math.floor(distanceNum)}M`},100)

        setTimeout(() => {
            clearInterval(plus)
            distanceNum = 501
            let minus = setInterval(() => {
                distanceNum -= (3*gaugeNum-501)*10/(gaugeNum-40)        //1.2s부터 출발 (1.2s~2.6s)
                distance.textContent = `${Math.floor(distanceNum)}M`
            }, 100)
            setTimeout(() => {
                clearInterval(minus)
                distance.textContent = `${Math.floor(1002-3*gaugeNum)}M`
            },10*(gaugeNum-40))
            },1300)
        }

        if(gaugeNum>=183 && gaugeNum<=189) {       //골 들어가는 경우 + 벽에 튕김
            // let locGap = (186 - gaugeNum)*3
            setTimeout(() => {
                ball.style.transform = `translateX(669px)`
                ball.style.transition = '.3s'
                ball.style.transitionTimingFunction = 'ease-out'
            }, 10*(gaugeNum-40)+500)      
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
            }, 10*(gaugeNum-40)+700)
         }

        if(gaugeNum<144 || (gaugeNum>150&&gaugeNum<183) || gaugeNum>189) {        //골 안들어가는 경우
            setTimeout(() => {
                if(gaugeNum<168) {
                    resetBtn.disabled = false
                    chanceLeftNum -- 
                    puttingChance.textContent = `${chanceLeftNum}/10`
                
                    if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시

                        resetBtn.disabled = true
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
                }

                else {
                    setTimeout(() => {
                        resetBtn.disabled = false
                        chanceLeftNum -- 
                        puttingChance.textContent = `${chanceLeftNum}/10`
                                  
                        if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시

                        
                            resetBtn.disabled = true
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
                    },-700+10*(gaugeNum-40))
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
 
             if(gaugeNum==162 || gaugeNum == 165 || gaugeNum == 171) {      //골 들어가는 경우 162,165,(정중앙)168,171
                //  let locGap = (gaugeNum - 168)*3
                 setTimeout(() => {
                     ball.style.transform = `translateX(165px)`
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

             if(gaugeNum==168) {
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
                }, 1800)
             }
        }
 
        if(gaugeNum>=201) {                  //골 안들어가는 경우 + 유리벽에 튕김
         ball.style.transform = 'translateX(66px)'
         ball.style.transition = '1.5s'
         distanceNum = 0
         setTimeout(() => {
             ball.style.transform = `translateX(${66 + gaugeNum*3 - 603}px)`
             ball.style.transition = `${(gaugeNum-80)/100}s`
             ball.style.transitionTimingFunction = 'ease-out'
         }, 1300)
 
        let plus = setInterval(() => {
                    distanceNum += 603/13
                    distance.textContent = `${Math.floor(distanceNum)}M`},100)

        setTimeout(() => {
            clearInterval(plus)
            distanceNum = 603
            let minus = setInterval(() => {
                distanceNum -= (3*gaugeNum-603)*10/(gaugeNum-80)
                distance.textContent = `${Math.floor(distanceNum)}M`
            }, 100)
            setTimeout(() => {
                clearInterval(minus)
                distance.textContent = `${Math.floor(1206-3*gaugeNum)}M`
            },10*(gaugeNum-80))
            },1300)

            if(gaugeNum>=231 && gaugeNum<=240) {       //골 들어가는 경우 + 유리벽에 튕김
                // let locGap = (234 - gaugeNum)*3
                setTimeout(() => {
                    ball.style.transform = `translateX(165px)`
                    ball.style.transition = '.3s'
                }, 10*(gaugeNum-80)+500)      
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
                }, 10*(gaugeNum-80)+700)
             }
     }

     if(gaugeNum<162 || (gaugeNum>171&&gaugeNum<231) || gaugeNum>240) {        //골 안들어가는 경우 + 벽에 안튕김

        setTimeout(() => {
            if(gaugeNum<201) {
                resetBtn.disabled = false
                chanceLeftNum --
                puttingChance.textContent = `${chanceLeftNum}/10` 
            
                if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
                    resetBtn.disabled = true
                   setTimeout(() => {
                    ball.style.transform = 'translateX(228px)'
                    tower.style.transform = 'translateY(-1010px)'
                    tower.style.transition = '2.5s'
                    gaugeStopBtn.disabled = true
                    puttingChance.textContent = `10/10`
                    ball.classList.remove('97f')
                    ball.classList.add('98f')
                    chanceLeftNum = 10
                    distanceNum = 0
                    distance.textContent = `${distanceNum}M`
                    document.querySelector('.user-interface .currentfloor').textContent = 'CAFETERIA (98F)'
                    tipTip.style.visibility = 'hidden'
                    tipContent.textContent = ''
                    setTimeout(() => {
                        resetFunc()
                        gaugeStopBtn.disabled = false
                    },2500)
                   },1000)
                }
            }
            else {
                setTimeout(() => {
                    resetBtn.disabled = false
                    chanceLeftNum --
                    puttingChance.textContent = `${chanceLeftNum}/10`

                    if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
                        resetBtn.disabled = true
                       setTimeout(() => {
                        ball.style.transform = 'translateX(228px)'
                        tower.style.transform = 'translateY(-1010px)'
                        tower.style.transition = '2.5s'
                        gaugeStopBtn.disabled = true
                        puttingChance.textContent = `10/10`
                        ball.classList.remove('97f')
                        ball.classList.add('98f')
                        chanceLeftNum = 10
                        distanceNum = 0
                        distance.textContent = `${distanceNum}M`
                        document.querySelector('.user-interface .currentfloor').textContent = 'CAFETERIA (98F)'
                        tipTip.style.visibility = 'hidden'
                        tipContent.textContent = ''
                        setTimeout(() => {
                            resetFunc()
                            gaugeStopBtn.disabled = false
                        },2500)
                       },1000)
                    }
                }, -700+10*(gaugeNum-80))}
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
 
             if(gaugeNum==135 || gaugeNum==141) {      //골 들어가는 경우 162,165,(정중앙)168,171
                //  let locGap = (gaugeNum - 138)*3
                 setTimeout(() => {
                     ball.style.transform = `translateX(579px)`
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
                         tipTip.style.visibility = 'visible'
                         tipContent.textContent = 'A Punch Attack will sting.'
                     }, 1500)
                 }, 2100)
             }

             if(gaugeNum==138) {
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
                        tipTip.style.visibility = 'visible'
                        tipContent.textContent = 'A Punch Attack will sting.'
                    }, 1500)
                }, 1800)
             }
        }
 
        if(gaugeNum>=188) {                  //골 안들어가는 경우 + 벽에 튕김
         ball.style.transform = 'translateX(729px)'
         ball.style.transition = '1.5s'
         distanceNum = 0
         setTimeout(() => {
             ball.style.transform = `translateX(${729 - gaugeNum*3 + 564}px)`
             ball.style.transition = `${(gaugeNum-60)/100}s`
             ball.style.transitionTimingFunction = 'ease-out'
         }, 1300)
 
        let plus = setInterval(() => {
                    distanceNum += 564/13
                    distance.textContent = `${Math.floor(distanceNum)}M`},100)

        setTimeout(() => {
            clearInterval(plus)
            distanceNum = 564
            let minus = setInterval(() => {
                distanceNum -= (3*gaugeNum-564)*10/(gaugeNum-60)
                distance.textContent = `${Math.floor(distanceNum)}M`
            }, 100)
            setTimeout(() => {
                clearInterval(minus)
                distance.textContent = `${Math.floor(564*2-3*gaugeNum)}M`
            },10*(gaugeNum-60))
            },1300)

            if(gaugeNum>=234 && gaugeNum<=240) {       //골 들어가는 경우 + 벽에 튕김
                // let locGap = (237 - gaugeNum)*3
                setTimeout(() => {
                    ball.style.transform = `translateX(579px)`
                    ball.style.transition = '.3s'
                }, 10*(gaugeNum-60)+800)      
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
                        tipTip.style.visibility = 'visible'
                        tipContent.textContent = 'A Punch Attack will sting.'
                    }, 1500)
                }, 10*(gaugeNum-60)+1000)
             }
     }

     if(gaugeNum<135 || (gaugeNum>141&&gaugeNum<234) || gaugeNum>240) {        //골 안들어가는 경우 + 벽에 안튕김

        setTimeout(() => {
            if(gaugeNum<188) {
                resetBtn.disabled = false
                chanceLeftNum -- 
                puttingChance.textContent = `${chanceLeftNum}/10`
            
                if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
                    resetBtn.disabled = true
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
            }

            else {
                setTimeout(() => {
                    resetBtn.disabled = false
                    chanceLeftNum -- 
                    puttingChance.textContent = `${chanceLeftNum}/10`

                    if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
                        resetBtn.disabled = true
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
                }, -700 + 10*(gaugeNum-60))}
        },2000)
    }
}

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
 
             if(gaugeNum==138 || gaugeNum==144) {      //골 들어가는 경우 162,165,(정중앙)168,171
                //  let locGap = (gaugeNum - 141)*3
                 setTimeout(() => {
                     ball.style.transform = `translateX(-3px)`
                     ball.style.transition = '.3s'
                 }, 1900)           
                 setTimeout(() => {
                     tower.style.transform = 'translateY(-2390px)'
                     tower.style.transition = '1.5s'
                     tower.style.transitionTimingFunction = 'ease-in'
                     ball.style.transform = 'translateY(-88px)'
                     ball.style.transition = '2s'

                     gaugeStopBtn.disabled = true
                     document.querySelector('.ducktube').style.animationName = 'duckmove'
                     document.querySelector('.ducktube').style.animationTimingFunction = 'linear'
                     document.querySelector('.ducktube').style.animationDuration = '9s'
                     document.querySelector('.ducktube').style.animationFillMode = 'Forwards'

                     setTimeout(() => {
                        ball.style.transform = 'translate(620px,-88px)'
                        ball.style.transition = '9s'
                        ball.style.transitionTimingFunction = 'linear'
                        setTimeout(() => {
                            ball.style.transform = 'translate(522px,-60px)'
                            ball.style.transition = '.2s'
                            ball.style.transitionTimingFunction = 'ease-in'
                        },7500)

                         ball.classList.remove('95f')
                         ball.classList.add('94f')
                         document.querySelector('.user-interface .currentfloor').textContent = 'OCEAN PARK (94F)'
                         distanceNum = 0
                         distance.textContent = `${distanceNum}M`
                         chanceLeftNum = 10
                         puttingChance.textContent = `10/10`
                         resetBtn.disabled = true  
                         tipTip.style.visibility = 'hidden'
                         tipContent.textContent = ''
                         document.querySelector('.waterforopacity-oceanpark').classList.add('on')

                        setTimeout(() => {
                         resetFunc()
                         gaugeStopBtn.disabled = false
                        },8000)
                     }, 1500)
                 }, 2100)
             }

             if(gaugeNum==141) {
                setTimeout(() => {
                    tower.style.transform = 'translateY(-2390px)'
                    tower.style.transition = '1.5s'
                    tower.style.transitionTimingFunction = 'ease-in'
                    ball.style.transform = 'translateY(-88px)'
                    ball.style.transition = '2s'

                    gaugeStopBtn.disabled = true
                    document.querySelector('.ducktube').style.animationName = 'duckmove'
                    document.querySelector('.ducktube').style.animationTimingFunction = 'linear'
                    document.querySelector('.ducktube').style.animationDuration = '9s'
                    document.querySelector('.ducktube').style.animationFillMode = 'Forwards'

                    setTimeout(() => {
                        ball.style.transform = 'translate(620px,-88px)'
                        ball.style.transition = '9s'
                        ball.style.transitionTimingFunction = 'linear'
                        setTimeout(() => {
                            ball.style.transform = 'translate(522px,-60px)'
                            ball.style.transition = '.2s'
                            ball.style.transitionTimingFunction = 'ease-in'
                        },7500)

                            ball.classList.remove('95f')
                            ball.classList.add('94f')
                            document.querySelector('.user-interface .currentfloor').textContent = 'OCEAN PARK (94F)'
                            distanceNum = 0
                            distance.textContent = `${distanceNum}M`
                            chanceLeftNum = 10
                            puttingChance.textContent = `10/10`
                            resetBtn.disabled = true  
                            tipTip.style.visibility = 'hidden'
                            tipContent.textContent = ''
                            document.querySelector('.waterforopacity-oceanpark').classList.add('on')


                        setTimeout(() => {
                            resetFunc()
                            gaugeStopBtn.disabled = false
                           },8000)
                    }, 1500)
                }, 1800)
             }

        if(gaugeNum<138 || gaugeNum>144) {
        setTimeout(() => {
            resetBtn.disabled = false
            chanceLeftNum -- 
            puttingChance.textContent = `${chanceLeftNum}/10`
            if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
                resetBtn.disabled = true
               setTimeout(() => {
                ball.style.transform = 'translateX(165px)'
                tower.style.transform = 'translateY(-1670px)'
                tower.style.transition = '2.5s'
                gaugeStopBtn.disabled = true
                chanceLeftNum = 10
                puttingChance.textContent = `${chanceLeftNum}/10`
                ball.classList.remove('95f')
                ball.classList.add('96f')
                chanceLeftNum = 10
                distanceNum = 0
                distance.textContent = `${distanceNum}M`
                document.querySelector('.user-interface .currentfloor').textContent = 'SKY HOTEL (96F)'
                tipTip.style.visibility = 'hidden'
                tipContent.textContent = ''
                setTimeout(() => {
                    resetFunc()
                    gaugeStopBtn.disabled = false
                },2500)
               },1000)
            }
        },2000)
       }}
 
        if(gaugeNum>=147) {                  //골 안들어가는 경우 + 펀치에 튕김
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
                ball.style.transitionTimingFunction = 'linear'
                tower.style.transform = 'translateY(-1960px)'
                tower.style.transition = '.5s'
                tower.style.transitionTimingFunction = 'ease-in'
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

            // setTimeout(() => {

            // }, 3000)
 
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
                tipTip.style.visibility = 'hidden'
                tipContent.textContent = ''
                setTimeout(() => {
                    resetFunc()
                    gaugeStopBtn.disabled = false
                },2500)
        },3000)

        }
    }

    if(ball.classList.contains('94f')) {        //94층     

        if(gaugeNum<69) {
             ball.style.transform = `translate(${522 + gaugeNum*3}px,-60px)`
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
 
             if(gaugeNum==57 || gaugeNum==63) {      //골 들어가는 경우 162,165,(정중앙)168,171
                //  let locGap = (gaugeNum - 59)*3
                document.querySelector('.waterforopacity-oceanpark').classList.remove('on')
                 setTimeout(() => {
                     ball.style.transform = `translate(702px,-60px)`
                     ball.style.transition = '.3s'
                 }, 1900)           
                 setTimeout(() => {
                     tower.style.transform = 'translateY(-2735px)'
                     tower.style.transition = '1.5s'
                     tower.style.transitionTimingFunction = 'ease-in'
                     ball.style.transform = 'translate(699px,-15px)'
                     ball.style.transition = '2s'
                     gaugeStopBtn.disabled = true
                     setTimeout(() => {
                         resetFunc()
                         ball.classList.remove('94f')
                         ball.classList.add('93f')
                         document.querySelector('.user-interface .currentfloor').textContent = 'SPA (93F)'
                         document.querySelector('.waterforopacity-spa').classList.add('on')
                         document.querySelector('.tower .floor-93 .floor .water').classList.add('off')
                         distanceNum = 0
                         distance.textContent = `${distanceNum}M`
                         chanceLeftNum = 10
                         puttingChance.textContent = `10/10`
                         gaugeStopBtn.disabled = false
                         resetBtn.disabled = true  
                     }, 1500)
                 }, 2100)
             }

             if(gaugeNum==60) {
                document.querySelector('.waterforopacity-oceanpark').classList.remove('on')
                setTimeout(() => {
                    tower.style.transform = 'translateY(-2735px)'
                    tower.style.transition = '1.5s'
                    tower.style.transitionTimingFunction = 'ease-in'
                    ball.style.transform = 'translate(699px,-15px)'
                    ball.style.transition = '2s'
                    gaugeStopBtn.disabled = true
                    setTimeout(() => {
                        resetFunc()
                        ball.classList.remove('94f')
                        ball.classList.add('93f')
                        document.querySelector('.user-interface .currentfloor').textContent = 'SPA (93F)'
                        document.querySelector('.waterforopacity-spa').classList.add('on')
                        document.querySelector('.tower .floor-93 .floor .water').classList.add('off')
                        distanceNum = 0
                        distance.textContent = `${distanceNum}M`
                        chanceLeftNum = 10
                        puttingChance.textContent = `10/10`
                        gaugeStopBtn.disabled = false
                        resetBtn.disabled = true  
                    }, 1500)
                }, 1800)
             }
        }
 
        if(gaugeNum>=69) {                  //골 안들어가는 경우 + 벽에 튕김

         if(gaugeNum<=138) {

         ball.style.transform = 'translate(729px,-60px)'
         ball.style.transition = '1s'
         distanceNum = 0
         setTimeout(() => {
             ball.style.transform = `translate(${729 - gaugeNum*3 + 207}px,-60px)`
             ball.style.transition = `${(gaugeNum+60)/100}s`
             ball.style.transitionTimingFunction = 'ease-out'
         }, 800)
 
        let plus = setInterval(() => {
                    distanceNum += 207/13
                    distance.textContent = `${Math.floor(distanceNum)}M`},100)

        setTimeout(() => {
            clearInterval(plus)
            distanceNum = 207
            let minus = setInterval(() => {
                distanceNum -= (3*gaugeNum-207)*10/(gaugeNum+60)
                distance.textContent = `${Math.floor(distanceNum)}M`
            }, 100)
            setTimeout(() => {
                clearInterval(minus)
                distance.textContent = `${Math.floor(207*2-3*gaugeNum)}M`
            },10*(gaugeNum+60))
            },800)

            if(gaugeNum>=75 && gaugeNum<=84) {       //골 들어가는 경우 + 벽에 튕김
                // let locGap = (237 - gaugeNum)*3
                document.querySelector('.waterforopacity-oceanpark').classList.remove('on')
                setTimeout(() => {
                    ball.style.transform = `translate(699px,-60px)`
                    ball.style.transition = '.3s'
                }, 10*(gaugeNum+60))      
                setTimeout(() => {
                    tower.style.transform = 'translateY(-2735px)'
                    tower.style.transition = '1.5s'
                    tower.style.transitionTimingFunction = 'ease-in'
                    gaugeStopBtn.disabled = true
                    ball.style.transform = 'translate(699px,-15px)'
                    ball.style.transition = '2s'
                    setTimeout(() => {
                        resetFunc()
                        ball.classList.remove('94f')
                        ball.classList.add('93f')
                        document.querySelector('.user-interface .currentfloor').textContent = 'SPA (93F)'
                        document.querySelector('.waterforopacity-spa').classList.add('on')
                        document.querySelector('.tower .floor-93 .floor .water').classList.add('off')
                        distanceNum = 0
                        distance.textContent = `${distanceNum}M`
                        chanceLeftNum = 10
                        puttingChance.textContent = `${chanceLeftNum}/10`
                        gaugeStopBtn.disabled = false
                        resetBtn.disabled = true
                    }, 1500)
                }, 10*(gaugeNum+60)+200)
             }
         }

            if(gaugeNum>138) {          //벽에 튕긴 후 공 침수
                ball.style.transform = 'translate(729px,-60px)'
                ball.style.transition = '1s'
                distanceNum = 0
                // document.querySelector('.waterforopacity').classList.add('on')
         setTimeout(() => {
             ball.style.transform = `translate(490px,-60px)`
             ball.style.transition = `1.5s`
             ball.style.transitionTimingFunction = 'ease-out'
         }, 800)

         setTimeout(() => {
            ball.style.transform = 'translate(270px,15px)'
            ball.style.transition = '10s'
            ball.style.transitionTimingFunction = 'ease-out'
            // ball.style.opacity = '.5'
         },2000)
 
        let plus = setInterval(() => {
                    distanceNum += 207/13
                    distance.textContent = `${Math.floor(distanceNum)}M`},100)

        setTimeout(() => {
            clearInterval(plus)
            distanceNum = 207
            let minus = setInterval(() => {
                distanceNum -= (3*gaugeNum-207)/15
                distance.textContent = `${Math.floor(distanceNum)}M`
            }, 100)
            setTimeout(() => {
                clearInterval(minus)
                distance.textContent = `???`
            },1500)
            },800)
            }
     }

     if(gaugeNum<56 || (gaugeNum>62 && gaugeNum<75) || gaugeNum>84) {        //골 안들어가는 경우 + 벽에 안튕김

        setTimeout(() => {
            if(gaugeNum<69) {
                resetBtn.disabled = false
                chanceLeftNum -- 
                puttingChance.textContent = `${chanceLeftNum}/10`
            
                if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
                    resetBtn.disabled = true
                    document.querySelector('.waterforopacity-oceanpark').classList.remove('on')
    
                setTimeout(() => {
                    ball.style.transform = 'translate(420px,0)'
                    tower.style.transform = 'translateY(-2000px)'
                    tower.style.transition = '2.5s'
                    gaugeStopBtn.disabled = true
                    puttingChance.textContent = `10/10`
                    ball.classList.remove('94f')
                    ball.classList.add('95f')
                    chanceLeftNum = 10
                    distanceNum = 0
                    distance.textContent = `${distanceNum}M`
                    document.querySelector('.user-interface .currentfloor').textContent = 'PLAYGROUND (95F)'
                    tipTip.style.visibility = 'visible'
                    tipContent.textContent = 'A Punch Attack will sting.'
                    setTimeout(() => {
                        resetFunc()
                        gaugeStopBtn.disabled = false
                    },2500)
                   },1000)
                }
            }

            else if(gaugeNum>=69 && gaugeNum<138) {
                setTimeout(() => {
                    resetBtn.disabled = false
                    chanceLeftNum -- 
                    puttingChance.textContent = `${chanceLeftNum}/10`

                    if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
                        resetBtn.disabled = true
                        document.querySelector('.waterforopacity-oceanpark').classList.remove('on')
        
                    setTimeout(() => {
                        ball.style.transform = 'translate(420px,0)'
                        tower.style.transform = 'translateY(-2000px)'
                        tower.style.transition = '2.5s'
                        gaugeStopBtn.disabled = true
                        puttingChance.textContent = `10/10`
                        ball.classList.remove('94f')
                        ball.classList.add('95f')
                        chanceLeftNum = 10
                        distanceNum = 0
                        distance.textContent = `${distanceNum}M`
                        document.querySelector('.user-interface .currentfloor').textContent = 'PLAYGROUND (95F)'
                        tipTip.style.visibility = 'visible'
                        tipContent.textContent = 'A Punch Attack will sting.'
                        setTimeout(() => {
                            resetFunc()
                            gaugeStopBtn.disabled = false
                        },2500)
                       },1000)
                    }
                }, -700 + 10*(gaugeNum-60))}

            else {
                setTimeout(() => {
                    resetBtn.disabled = false
                    chanceLeftNum -- 
                    puttingChance.textContent = `${chanceLeftNum}/10`

                    if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
                        resetBtn.disabled = true
                        document.querySelector('.waterforopacity-oceanpark').classList.remove('on')
        
                    setTimeout(() => {
                        ball.style.transform = 'translate(420px,0)'
                        tower.style.transform = 'translateY(-2000px)'
                        tower.style.transition = '2.5s'
                        gaugeStopBtn.disabled = true
                        puttingChance.textContent = `10/10`
                        ball.classList.remove('94f')
                        ball.classList.add('95f')
                        chanceLeftNum = 10
                        distanceNum = 0
                        distance.textContent = `${distanceNum}M`
                        document.querySelector('.user-interface .currentfloor').textContent = 'PLAYGROUND (95F)'
                        tipTip.style.visibility = 'visible'
                        tipContent.textContent = 'A Punch Attack will sting.'
                        setTimeout(() => {
                            resetFunc()
                            gaugeStopBtn.disabled = false
                        },2500)
                       },1000)
                    }
                },2200)
            }
        },2000)
    }
}

if(ball.classList.contains('93f')) {           // 93층

    if(gaugeNum<60) {
        ball.style.transform = `translate(${699 - gaugeNum*3}px,-15px)` 
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

        if(gaugeNum==36 || gaugeNum==42) {

            document.querySelector('.waterforopacity-spa').classList.remove('on')
            document.querySelector('.tower .floor-93 .floor .water').classList.remove('off')

            setTimeout(() => {
                ball.style.transform = `translate(582px,-15px)`
                ball.style.transition = '.3s'
            }, 1900)
            setTimeout(() => {
                tower.style.transform = 'translateY(-3065px)'
                tower.style.transition = '1.5s'
                tower.style.transitionTimingFunction = 'ease-in'
                ball.style.transform = 'translate(582px,0)'
                ball.style.transition = '1.5s'
                gaugeStopBtn.disabled = true
                setTimeout(() => {
                    resetFunc()
                    ball.classList.remove('93f')
                    ball.classList.add('92f')
                    document.querySelector('.user-interface .currentfloor').textContent = 'WINE BAR (92F)'
                    distance.textContent = '0M'
                    chanceLeftNum = 10
                    puttingChance.textContent = `${chanceLeftNum}/10`
                    gaugeStopBtn.disabled = false
                    resetBtn.disabled = true
                }, 1500)
            }, 2100)
        }

        if(gaugeNum==39) {

            document.querySelector('.waterforopacity-spa').classList.remove('on')
            document.querySelector('.tower .floor-93 .floor .water').classList.remove('off')

            setTimeout(() => {
                tower.style.transform = 'translateY(-3065px)'
                tower.style.transition = '1.5s'
                tower.style.transitionTimingFunction = 'ease-in'
                ball.style.transform = 'translate(582px,0)'
                ball.style.transition = '1.5s'
                gaugeStopBtn.disabled = true
                setTimeout(() => {
                    resetFunc()
                    ball.classList.remove('93f')
                    ball.classList.add('92f')
                    document.querySelector('.user-interface .currentfloor').textContent = 'WINE BAR (92F)'
                    distance.textContent = '0M'
                    chanceLeftNum = 10
                    puttingChance.textContent = `${chanceLeftNum}/10`
                    gaugeStopBtn.disabled = false
                    resetBtn.disabled = true
                }, 1500)
            }, 1800)
        }
    }

    else if (gaugeNum>=60) {
        ball.style.transform = `translate(519px,-15px)`
        ball.style.transition = '1s'
        distanceNum = 0

            setTimeout(() => {
                ball.style.transform = 'translate(519px,16px)'
                ball.style.transition = '2s'
            },900)

        let plus = setInterval(() => {
            distanceNum += 180/13
            distance.textContent = `${Math.floor(distanceNum)}M` 
        },100)

        setTimeout(() => {
            clearInterval(plus)
            distance.textContent = `???`
        },900)
}

if(gaugeNum<36 || gaugeNum>42) {
    setTimeout(() => {
        if(gaugeNum<60) {
             resetBtn.disabled = false
             chanceLeftNum -- 
             puttingChance.textContent = `${chanceLeftNum}/10` 
            
             if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
                resetBtn.disabled = true
              setTimeout(() => {
                ball.style.transform = 'translate(522px,-60px)'
                tower.style.transform = 'translateY(-2390px)'
                tower.style.transition = '2.5s'
                gaugeStopBtn.disabled = true
                ball.classList.remove('93f')
                ball.classList.add('94f')
                chanceLeftNum = 10
                puttingChance.textContent = `${chanceLeftNum}/10`
                distanceNum = 0
                distance.textContent = `${distanceNum}M`
                document.querySelector('.user-interface .currentfloor').textContent = 'OCEAN PARK (94F)'
                document.querySelector('.waterforopacity-spa').classList.remove('on')
                document.querySelector('.tower .floor-93 .floor .water').classList.remove('off')
                document.querySelector('.waterforopacity-oceanpark').classList.add('on')
                setTimeout(() => {
                    resetFunc()
                    gaugeStopBtn.disabled = false
                },2500)
               },1000)
            }
            }

        else {
            setTimeout(() => { 
                resetBtn.disabled = false
                chanceLeftNum --
                puttingChance.textContent = `${chanceLeftNum}/10` 
            
                if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
                    resetBtn.disabled = true
                  setTimeout(() => {
                    ball.style.transform = 'translate(522px,-60px)'
                    tower.style.transform = 'translateY(-2390px)'
                    tower.style.transition = '2.5s'
                    gaugeStopBtn.disabled = true
                    ball.classList.remove('93f')
                    ball.classList.add('94f')
                    chanceLeftNum = 10
                    puttingChance.textContent = `${chanceLeftNum}/10`
                    distanceNum = 0
                    distance.textContent = `${distanceNum}M`
                    document.querySelector('.user-interface .currentfloor').textContent = 'OCEAN PARK (94F)'
                    document.querySelector('.waterforopacity-spa').classList.remove('on')
                    document.querySelector('.tower .floor-93 .floor .water').classList.remove('off')
                    setTimeout(() => {
                        resetFunc()
                        gaugeStopBtn.disabled = false
                        document.querySelector('.waterforopacity-oceanpark').classList.add('on')
                    },2500)
                   },1000)
                }
            },900)
            }
    },2000)
}
            }

            if(ball.classList.contains('92f')) {        //92층     

                if(gaugeNum<239) {
                     ball.style.transform = `translateX(${582 - gaugeNum*3}px)`
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
         
                     if(gaugeNum==159 || gaugeNum==165) {      

                         setTimeout(() => {
                             ball.style.transform = `translateX(96px)`
                             ball.style.transition = '.3s'
                         }, 1900)           
                         setTimeout(() => {
                             tower.style.transform = 'translateY(-3395px)'
                             tower.style.transition = '1.5s'
                             tower.style.transitionTimingFunction = 'ease-in'
                             gaugeStopBtn.disabled = true
                             setTimeout(() => {
                                 resetFunc()
                                 ball.classList.remove('92f')
                                 ball.classList.add('91f')
                                 document.querySelector('.user-interface .currentfloor').textContent = 'RESIDENCE (91F)'
                                 distanceNum = 0
                                 distance.textContent = `${distanceNum}M`
                                 chanceLeftNum = 10
                                 puttingChance.textContent = `${chanceLeftNum}/10`
                                 gaugeStopBtn.disabled = false
                                 resetBtn.disabled = true  
                             }, 1500)
                         }, 2100)
                     }
        
                     if(gaugeNum==162) {
                        setTimeout(() => {
                            tower.style.transform = 'translateY(-3395px)'
                            tower.style.transition = '1.5s'
                            tower.style.transitionTimingFunction = 'ease-in'
                            gaugeStopBtn.disabled = true
                            setTimeout(() => {
                                resetFunc()
                                ball.classList.remove('92f')
                                ball.classList.add('91f')
                                document.querySelector('.user-interface .currentfloor').textContent = 'RESIDENCE (91F)'
                                distanceNum = 0
                                distance.textContent = `${distanceNum}M`
                                chanceLeftNum = 10
                                puttingChance.textContent = `${chanceLeftNum}/10`
                                gaugeStopBtn.disabled = false
                                resetBtn.disabled = true  
                            }, 1500)
                        }, 1800)
                     }
                }
         
                if(gaugeNum>=239) {                  //골 안들어가는 경우 + 벽에 튕김
                 ball.style.transform = 'translateX(-126px)'
                 ball.style.transition = '1.5s'
                 distanceNum = 0
                 setTimeout(() => {
                     ball.style.transform = `translateX(${-126 + gaugeNum*3 - 708}px)`
                     ball.style.transition = `${(gaugeNum-120)/100}s`
                     ball.style.transitionTimingFunction = 'ease-out'
                 }, 1300)
         
                let plus = setInterval(() => {
                            distanceNum += 708/13
                            distance.textContent = `${Math.floor(distanceNum)}M`},100)
        
                setTimeout(() => {
                    clearInterval(plus)
                    distanceNum = 708
                    let minus = setInterval(() => {
                        distanceNum -= (3*gaugeNum-708)*10/(gaugeNum-120)
                        distance.textContent = `${Math.floor(distanceNum)}M`
                    }, 100)
                    setTimeout(() => {
                        clearInterval(minus)
                        distance.textContent = `${Math.floor(708*2-3*gaugeNum)}M`
                    },10*(gaugeNum-120))
                    },1300)
        }

        if(gaugeNum<159 || gaugeNum>165) {        //골 안들어가는 경우 + 벽에 안튕김
        
            setTimeout(() => {
                if(gaugeNum<239) {
                    resetBtn.disabled = false
                    chanceLeftNum -- 
                    puttingChance.textContent = `${chanceLeftNum}/10`
                
                    if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
                        resetBtn.disabled = true
                       setTimeout(() => {
                        ball.style.transform = 'translate(699px,-15px)'
                        tower.style.transform = 'translateY(-2735px)'
                        tower.style.transition = '2.5s'
                        gaugeStopBtn.disabled = true
                        ball.classList.remove('92f')
                        ball.classList.add('93f')
                        chanceLeftNum = 10
                        puttingChance.textContent = `${chanceLeftNum}/10`
                        distanceNum = 0
                        distance.textContent = `${distanceNum}M`
                        document.querySelector('.user-interface .currentfloor').textContent = 'SPA (93F)'
                        setTimeout(() => {
                            resetFunc()
                            gaugeStopBtn.disabled = false
                            document.querySelector('.waterforopacity-spa').classList.add('on')
                            document.querySelector('.tower .floor-93 .floor .water').classList.add('off')
                        },2500)
                       },1000)
                    }
                }
    
                else {
                    setTimeout(() => {
                        resetBtn.disabled = false
                        chanceLeftNum -- 
                        puttingChance.textContent = `${chanceLeftNum}/10`
    
                        if(chanceLeftNum<=0) {      //퍼팅 기회 모두 소진 시
                            resetBtn.disabled = true
                           setTimeout(() => {
                            ball.style.transform = 'translate(699px,-15px)'
                            tower.style.transform = 'translateY(-2735px)'
                            tower.style.transition = '2.5s'
                            gaugeStopBtn.disabled = true
                            ball.classList.remove('92f')
                            ball.classList.add('93f')
                            chanceLeftNum = 10
                            puttingChance.textContent = `${chanceLeftNum}/10`
                            distanceNum = 0
                            distance.textContent = `${distanceNum}M`
                            document.querySelector('.user-interface .currentfloor').textContent = 'SPA (93F)'
                            setTimeout(() => {
                                resetFunc()
                                gaugeStopBtn.disabled = false
                                document.querySelector('.waterforopacity-spa').classList.add('on')
                                document.querySelector('.tower .floor-93 .floor .water').classList.add('off')
                            },2500)
                           },1000)
                        }
                    }, -700 + 10*(gaugeNum-120))}
            },2000)
        }
    }

    
})

// ball.style.transform = 'translate(-126px,3065px)'       //420 - 3(3n) = 66 (-126px일때 왼쪽벽 충돌, 729px 오른쪽)
// tower.style.transform = 'translateY(-350px)'
// document.querySelector('.waterforopacity').style.transform = 'translateY(-400px)'
// ball.classList.add('95f')
document.querySelector('.tower .floor-94 .water').style.transform = 'translateY(300px)'

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

    if(ball.classList.contains('94f')) {
        ball.style.transform = `translate(522px,-60px)`
        ball.style.transition = '0s'
        // ball.style.opacity = '1'
        // document.querySelector('.waterforopacity').classList.remove('on')
    }

    if(ball.classList.contains('93f')) {
        ball.style.transform = 'translate(699px,-15px)'
        ball.style.transition = '0s'
    }

    if(ball.classList.contains('92f')) {
        ball.style.transform = 'translate(582px,0)'
        ball.style.transition = '0s'
    }

    gauge.classList.add('stop')
    resetFunc()

    distanceNum = 0
    distance.textContent = `${distanceNum}M`
})


