class Bouncer {
  constructor(initialX, initialY, imgPaths, tileSize) {
    this.x = initialX 
    this.y = initialY
    this.view = 'front'
    this.score = 0
    this.reputation = 0
    this.cash = 0
    this.imgW = tileSize-10
    this.imgH = tileSize-10
    this.imgs = {}  
    for (var view in imgPaths) {
      this.imgs[view] = new Image()
      this.imgs[view].src = imgPaths[view]
    }
    this.xOnC = this.x*tileSize
    this.yOnC = this.y*tileSize
    this.ctx = ctx
  }
    /*
    this.imgLeft = new Image()
    this.imgLeft.src = imgLeft
    this.imgLeftW = imgLeftW
    this.imgLeftH = imgLeftH
    this.imgRight = new Image()
    this.imgRight.src = imgRight
    this.imgRightW = imgRightW
    this.imgRightH = imgRightH
    this.imgFront = new Image()
    this.imgFront.src = imgFront
    this.imgFrontW = imgFrontW
    this.imgFrontH = imgFrontH
    */

/*  This should be moved into a createGame() function, which creates a newMap, sets initial stats and initializes the player + NPCs

  initializePlayer(x,y) {
    this.x = x
    this.y = y
  }
*/

  moveLeft() {
    this.x-- 
    this.view = 'left'
  }

  moveRight() {
    this.x++
    this.view = 'right'
  }

  draw(){
    ctx.drawImage(this.imgs[this.view], this.xOnC, this.yOnC, this.imgW, this.imgH)
  }

/*
playerActions() {
document.onkeydown = function(e) {
  e.preventDefault()
  switch(e.keycode) {
    case 38: // keydown keycode up cursor
    // let NPC in
    removeNPC(line, NPC)
    // given availability of sprite trigger an animation or if possible trigger sound (one of several sounds might be triggered randomly)
    // might be nice to also trigger an animation of NPC moving into club + some kind of happy sound 
    break
    case 40: // keydown keycode down cursor
    //  turn NPC away
    // given availability of sprite trigger an animation or if possible trigger sound (one of several sounds might be triggered randomly)
    // might be nice to also trigger an animation of NPC moving away + some kind of unhappy sound 
    break
    }

}
*/

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