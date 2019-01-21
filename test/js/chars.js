class NPC {
  constructor(x, y, img) {
    this.x = x 
    this.y = y
    this.img = img
  }

  moveNPC() {
    //  only moves on y-axis
    //  decide on interval --> this might better be defined inside the line class
    setInterval()
  }

  pushNPC() {
    //  pushes an NPC into the bottom of the queue
  }
}

var bouncer = new Character()
//  there needs to be only one instance of this character; should it have its own class?

var guest = new Character()
//  needs to have property desirable: true/false
//  needs to have property queue: number, to determine which queue the character appears in
//  extends class 
//  create several types of guests


//  Where to put the mechnics of the queues? New class?


