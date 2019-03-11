class Guest {
  constructor(initialX, initialY, imgPath, bool, rep, cash) {
    this.x = initialX 
    this.y = initialY
    this.xOnC = this.x * tileSize
    this.yOnC = this.y * tileSize
    this.img = new Image()
    this.img.src = imgPath
    this.desirable = bool
    this.reputation = rep
    this.cash = cash
  }
}