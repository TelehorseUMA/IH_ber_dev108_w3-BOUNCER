class Bouncer {
  constructor(initialX, initialY, imgPaths, tileSize) {
    this.x = initialX 
    this.y = initialY
    this.xOnC = this.x*tileSize
    this.yOnC = this.y*tileSize
    this.view = 'front'
    this.score = 0
    this.reputation = 0
    this.cash = 0
    this.imgW = tileSize
    this.imgH = tileSize
    this.imgs = {}  
    for (var view in imgPaths) {
      this.imgs[view] = new Image()
      this.imgs[view].src = imgPaths[view]
    }
    this.isGo = false
    /*this.whichLine =*/ 
  }

/*  This should be moved into a createGame() function, which creates a newMap, sets initial stats and initializes the player + NPCs

  initializePlayer(x,y) {
    this.x = x
    this.y = y
  }
*/

  moveLeft() {
    this.view = 'left'
    if (this.x > 0) {
      this.x--
      this.xOnC -= 100 
    }
  }

  moveRight() {
    this.view = 'right'
    if (this.x < gameBoard[0].length) {
    this.x++
    this.xOnC += 100
    }
  }

  draw() {
    ctx.drawImage(this.imgs[this.view], this.xOnC, this.yOnC, this.imgW, this.imgH)
  }

  updatePosition() {
    this.xOnC = this.x*tileSize
    this.yOnC = this.y*tileSize
  }


/*
removeNPC(line, NPC) {  //  This is used to let the NPC in as well as send it away. Difference between both actions is only marked by the animation triggered.
  line.dequeue(NPC)
}

identifyLine() {  // Method has to identify line the player is currently interacting with. Front of line property of respective line should be used for this. If (player.x === line.x && player.y === line.y-1) => player can interact with the respective line.


}

/* This is probably not necessary. Qeueue logic implemented in line ascertains that only line[0] can be dequeued.
identifyNPC() { // Method has to identify NPC the player is interacting with.

}
*/

}