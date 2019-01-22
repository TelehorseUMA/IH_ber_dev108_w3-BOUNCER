var canvas = document.getElementById('canv')
ctx = canvas.getContext('2d')

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
      ctx.strokeRect(j*100, i*100, 100,100)
    }
  }
}

drawBoard(gameBoard)

//  2.  write create map function that will create maps according to pre-defined rules and inputs to generate different levels
//      =>  the gameBoard is always conceptualized in terms of a 2d array; indeces are mapped to the canvas by the drawBoard function
//      =>  player and NPC positions are also given as indeces and mapped onto the canvas by respective functions

class Map {
  constructor (tileSize, boardWidth, boardHeight) {
    this.tileSize = tileSize
    this.boardWidth = boardWidth
    this.boardHeigt = boardHeight
  }

}

/************************ CHARS *************************/

var bouncer = new Player(2, 1, "./imgs/190122_bouncer_chars_bouncer_left_test.png", 100, 100, "./imgs/190122_bouncer_chars_bouncer_right_test.png", 100, 100, "./imgs/190122_bouncer_chars_bouncer_front_test.png", 100, 100)

/*
bouncer.drawFront()
*/

var img = new Image()
img.src = './imgs/190122_bouncer_chars_bouncer_front_test.png'
ctx.drawImage(img, 200, 100, 100, 100)


/************************ DRAWING *************************/

/*
function drawPlayer(player) {
  ctx.drawImage
  player.
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


/************************ GAME CONTROL *************************/

//  * initialize the game
//  * trigger events: player winning / player losing 
