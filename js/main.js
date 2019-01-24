var canvas = document.getElementById('canv')
ctx = canvas.getContext('2d')
var tileSize = 100

/************************ GAME BOARD *************************/
//  1.  simple map for test purposese

gameBoard = [
  [ , , , , ],
  [ , , , , ],
  [ , , , , ],
  [ , , , , ],
  [ , , , , ],
  [ , , , , ],
  [ , , , , ],
]

function drawBoard(twoDimArray) {
  for (i = 0; i < twoDimArray.length; i++) {
    for (j = 0; j <= twoDimArray[0].length; j++) {
      ctx.strokeRect(j*tileSize, i*tileSize, tileSize, tileSize)
    }
  }
}

drawBoard(gameBoard)

//  2.  write create map function that will create maps according to pre-defined rules and inputs to generate different levels
//      =>  the gameBoard is always conceptualized in terms of a 2d array; indeces are mapped to the canvas by the drawBoard function
//      =>  player and NPC positions are also given as indeces and mapped onto the canvas by respective functions

/************************ CHARS *************************/

//  PLAYER

var player = new Bouncer(2, 1, {
  front:  '../imgs/bouncer_front.png',
  left:   '../imgs/bouncer_left.png',
  right: '../imgs/bouncer_right.png',
},tileSize)

//  NPCs  
var guestArray = []

var punkgirl = new Guest(0, 0, '../imgs/guest_punkgirl.png', true, 50, 20)
guestArray.push(punkgirl)
var gayguy = new Guest(0, 0, '../imgs/guest_gayguy.png', true, 50, 20)
guestArray.push(gayguy)
var businessman = new Guest(0, 0, '../imgs/guest_businessman.png',false, -200, 150)
guestArray.push(businessman)

//  EMPTY LINE ELEMENT
var empty = ''
guestArray.push(empty)

/************************ LINES *************************/
var lineArray = []

var regLine = new Line(5, 1000, 3, 3000, 20, 6000, 1, [], 1, 'reg', true)
lineArray.push(regLine)

regLine.update()

/************************ DRAWING *************************/

/*
drawPlayer(player) {

}
*/

/*
drawNPCs() {

}
*/


/************************ STATS *************************/

//  * rep < 0 => you lose; rep below a certain treshhold => more undesirables turn up 
//  * initial rep val lowered to increase difficulty in higher levels
//  * rep and cash objectives will be set per level; if you don't reach them by the end of the            night you lose
//  * length of the night can be varied to increase difficulty
//  * create function to set stats so different levels can be created quicker

var stats = {
  score: 0,
  reputation: 100,
  cash: 0,
  time: 0, // 0 = 11pm; end of party might vary to increase difficulty
}

/************************ MOVEMENT & ACTIONS *************************/

document.onkeydown = function(e) {
  e.preventDefault()
  switch(e.keyCode) {
    case 37:  //  keydown keycode left cursor
    player.moveLeft()
    /*player.updateStats()*/
    map.drawEverything(ctx)
    break
    case 39:  // keydown keycode right cursor
    player.moveRight()
    map.drawEverything(ctx)
    break
    case 38: // keydown keycode up cursor
    // let guest in
    for (var i = 0; i < lineArray.length; i++) {
      if (lineArray[i].lineIndex === player.x && lineArray[i].folEmpty === false) {
        var dequeuedGuest = lineArray[i].dequeue()
        player.reputation += dequeuedGuest.reputation
        player.cash += dequeuedGuest.cash
        if (dequeuedGuest.desirable == true) {
          switch(lineArray[i].lineType) {
            case 'reg':
            player.score += 100
            break
            case 'gll':
            player.score += 250
            break
            case 'vip':
            player.score += 500
            break
          }
        }
      }
    }
    break
    case 40: // keydown keycode down cursor
    // turn guest away
    for (var i = 0; i < lineArray.length; i++) {
      if (lineArray[i].lineIndex === player.x && lineArray[i].folEmpty === false) {
        var dequeuedGuest = lineArray[i].dequeue()
        switch(dequeuedGuest.desirable) {
          case true: 
          player.reputation -= dequeuedGuest.reputation
          break
          case false:
          player.reputation += -1*(dequeuedGuest.reputation)
          player.score += 100
          break
        } 
      }
    }


    // given availability of sprite trigger an animation or if possible trigger sound (one of several sounds might be triggered randomly)
    // might be nice to also trigger an animation of NPC moving into club + some kind of happy sound 
    // guest rep and cash values added to player's score
    // score system: let desirables in => score++; turn desirables away => score++; no penalties otherwise   
  }
}

document.onkeyup = function(e) {
  e.preventDefault()
  switch(e.keyCode) {
    case 37:
    player.view = 'front'  // switch back to img bouncer front
    map.drawEverything(ctx)
    break
    case 39:
    player.view = 'front'  // switch back to img bouncer front
    map.drawEverything(ctx)
    break
  }
}

/************************ ACTIONS *************************/

/*
document.onkeydown = function(e) {
  e.preventDefault()
  switch(e.keycode) {
    
    case 40: // keydown keycode down cursor
    //  turn NPC away
    // given availability of sprite trigger an animation or if possible trigger sound (one of several sounds might be triggered randomly)
    // might be nice to also trigger an animation of NPC moving away + some kind of unhappy sound 
    break
    }

}
*/

/************************ GAME CONTROL *************************/

//  * initialize the game
//  * trigger events: player winning / player losing 


/************************ ANIMATION *************************/

var map = new Map(100, 5, 7)

function animation() {
  map.update()
  map.drawEverything(ctx)
  window.requestAnimationFrame(animation)
}
animation()