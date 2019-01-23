class Guest {
  constructor(initialX, initialY, imgPath, bool) {
    this.x = initialX 
    this.y = initialY
    this.xOnC = this.x * tileSize
    this.yOnC = this.y * tileSize
    this.img = new Image()
    this.img.src = imgPath
    this.desirable = bool
  }
}

/*
var guest = new NPC ()
//  needs to have property desirable: true/false
//  needs to have property queue: number, to determine which queue the character appears in
//  extends class 
//  create several types of guests


//  Where to put the mechnics of the queues? New class?
*/
