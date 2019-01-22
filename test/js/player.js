class Player {
  constructor(x, y, imgLeft, imgRight, imgFront) {
    this.x = x 
    this.y = y
    // this.img = new Image()
    // this.img.src = img
    //  can I integrate all the necessary pictures in the class? how?
    this.imgLeft = new Image()
    this.imgLeft.src = imgLeft
    this.imgRight = new Image()
    this.imgRight.src = imgRight
    this.imgFront = new Image()
    this.imgFront.src = imgFront
  }

/*  This should be moved into a createGame() function, which creates a newMap, sets initial stats and initializes the player + NPCs

  initializePlayer(x,y) {
    this.x = x
    this.y = y
  }
*/

  movePlayer() {
    //  only moves on x-axis
    document.onkeydown = function(e) {
      e.preventDefault()
      switch(e.keyCode) {
        case 37:  //  keydown keycode right cursor
        this.moveLeft()
        this.drawLeft() //  draw img bouncer left
        break
        case 39:  // keydown keycode left cursor
        this.moveRight()
        this.drawRight()  //  draw img bouncer right
        break 
      }
    }
    document.onkeyup = function(e) {
      e.preventDefault()
      switch(e.keyCode) {
        case 37:
        this.drawFront()  // switch back to img bouncer front
        break
        case 39:
        this.drawFront()  // switch back to img bouncer front
        break
      }
    }
  }

moveLeft() {
  this.x -= gridWidth
}

moveRight() {
  this.x += gridWidth
}

drawRight(img) {
  ctx.drawImage(this.imgRight, this.x, this.y, imgRightW, imgRightH)
}
//  * does ctx have to be defined in this file or can it be stored in another file?
//  * should draw method instead be stored in main.js (where ctx is stored)? 

drawLeft(img) {
  ctx.drawImage(this.imgLeft, this.x, this.y, imgLeftW, imgLeftH)
}

drawFront(img) {
  ctx.drawImage(this.imgFront, this.x, this.y, imgFrontW, imgFrontH)
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