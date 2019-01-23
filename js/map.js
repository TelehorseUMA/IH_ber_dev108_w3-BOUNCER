class Map {
  constructor (tileSize, nrOfTilesX, nrOfTilesY) {
    this.tileSize = tileSize
    this.boardWidth = tileSize * nrOfTilesX
    this.boardHeight = tileSize * nrOfTilesY
    // this.player = new Bouncer(2, 1, {
    //   front:  '../imgs/bouncer_front.png',
    //   left:   '../imgs/bouncer_left.png',
    //   right: '../imgs/bouncer_right.png',
    //   }, this.tileSize)
  }

  /************FUNCTION INOPERABLE - WHY?!*************/
  // drawGrid(tileSize, nrOfTilesX, nrOfTilesY) {
  //   for (i = 0; i < nrOfTilesY; i++) {
  //     for (j = 0; j < nrOfTilesX; j++) {
  //       ctx.strokeRect(j*tileSize, i*tileSize, tileSize, tileSize)
  //     }
  //   }
  // }


  drawEverything(ctx) {
    ctx.clearRect(0, 0, this.boardWidth, this.boardHeight)
    /*
    this.drawGrid(this.tileSize, this.nrOfTilesX, this.nrOfTilesY)
    */
    drawBoard(gameBoard)  
    player.draw()
    // TODO: for each queue, draw the queue
  }

  update() {
    // TODO: for each queue, update the queue
  }
}