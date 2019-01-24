/*
TYPES OF LINES 
----------------------
1. regular 
2. guestlist line
3. VIP line
----------------------

1. regular line = 'reg' [number increases in higher levels]
    * slower refresh rate (guests move slower)
    * higher probability of NPCs appearing
    * undesirables only appear in this type of line
    * higher acceptable wait time (guests will wait longer bf. your reputation suffers)
    * higher repLossTresh: you can have a bigger amount of guests in line before your rep. suffers * high maxLen: you only lose if there's a lot of guests in line
    * lowest repLossRate
    * lowest repLossVal

2. guestlist line 'gll' [only one per level]
    * higher refresh rate (guests move quicker)
    * lower probability of guests appearing
    * no undesirables appear in this line; gl always get in
    * lower acceptable wait time (you start losing rep sooner, when guests wait in this line)
    * lower repLossTresh: already a few guests waiting in this line will make your rep suffer 
    * lower maxLen: if the visible portion of this line is completely filled up you lose the game)
    * higher repLossRate
    * higher repLossVal

3. VIP line 'vip' [not graphically marked as a line but invisibly exists between the other lines so VIP               NPCs can appear in unepexpected positions and surprise the player]
    * highest refresh rate: VIPs move very quickly
    * lowest probability of appearing; there's only a few per night
    * no undesirables appear in this line; VIPs always get in
    * no acceptable wait time: you start losing reputation as soon as VIP has reached the top of      the line 
    * no rep loss tresh: as soon as there's one VIP waiting, you lose reputation
    * no maxLen: as soon as a 2nd VIP reaches the 2nd position in an already occupied VIP line or     2nd VIP reaches first position in an empty VIP line you lose the game
    * maximum repLossRate
    * maximum repLossVal  
    
----------------------

LOGIC
----------------------
implement queue logic for the lines
=>  NPCs get pushed to bottom of the line, then move up
=>  is it possible to insert empty fields over which NPCs can later move or is a different movement logic neccesary?
----------------------
*/

class Line {
  constructor(maxLen, updateRate, repLossNr, repLossRate, repLossVal, maxWait, genNpcRate, queueControl = [], lineIndex, lineType, folEmpty = true) {
    this.maxLen = maxLen  //  max number of NPCs in line; otherwise queue overflow => player loses
    this.queueControl = queueControl // stores NPCs in line; default is empty, but can be initialized with NPCs already in line
    this.updateRate = updateRate  // interval after which NPCs move up one position in the line; random function triggered to determine whether a new NPC will be pushed into bottom of the line; raise to increase difficulty (higher levels: higher initial update rate, update rate might rise during level)
    this.repLossNr = repLossNr // treshold of number of guests in the line; if crossed player loses reputation
    this.repLossRate = repLossRate // interval of reputation loss  once conditions are met (repLossTr reached; etc.)
    this.repLossVal = repLossVal // amount of reputation player loses at repLossRate once conditions are met
    this.maxWait = maxWait // wait time of NPCs in line after which player loses rep
    this.genNpcRate = genNpcRate // probability of new NPCs appearing in line
    this.lineIndex = lineIndex // lines should be automatically numbered depending on how many lines there are on the map
    this.xOnC = lineIndex * tileSize
    this.lineType = lineType // line type determines some of the other properties
    /*
    this.folY =  // must be moved to main.js, bc. tileSize is only defined there
    this.frontOfLine.x = tileSize * (colNum - 2)
    */
    this.folEmpty = folEmpty
    this.canEnqueue = true
  }
  
  isEmpty() {
    if (this.queueControl.length === 0) {
      return true
    } else {
      return false
    }
  }

  setCanEnqueue() {
    if (this.queueControl.length < this.maxLen) {
      this.canEnqueue = true
      return true
    } else {
      this.canEnqueue = false
      return false
    }
  }

  setFolEmpty() {
    if (this.queueControl[this.maxLen-1] != undefined) {
      this.folEmpty = false
      return this.folEmpty = false
    } else {
      this.folEmpty = true
      return this.folEmpty = true
    }
  }

  enqueue(e) {  
    if (this.canEnqueue === false) {
      return 'Queue Overflow' //  this must be used in a game control function to end the game and display 'you lose' info
    } else {
    this.queueControl.unshift(e)
    return this.queueControl
    }
  }

  enqueueGuest() {
    var guestToEnqueue = this.rndGuest(guestArray)
    // guestToEnqueue.xOnC = this.xOnC
    // => possible with an if condition to take care of the  strings, but not necessary 
    this.enqueue(guestToEnqueue)
    console.log('new guest in line')
  }

  dequeue(e) {  //  =>  is triggered in two instances: 1. player lets guest in / 2. player turns guest away
    if (this.isEmpty() === true) {
      return 'Queue Underflow'  
      //  might be triggered when player moves to an empty line and hits let in/turn away button; does however not trigger any event ingame
    } else {
      return this.queueControl.pop(e) 
      //  NPC in line position one is removed from line; depending on button press either turn away or let in animation triggered 
    }
  }

  shiftEmpty() {
    for (i = this.maxLen-1; i > -1; i--) {
      if (this.queueControl[i] == '') {
        this.queueControl.unshift(this.queueControl.splice(i, 1).join())
        break
      }
    }
  }

  update() {
    //  use setInterval to retrigger according to line's updateRate
    //  use rndGuest to randomly select guest or empty string from guest array
    //  use enqueue to unshift guest into line
    //  if enqueue returns Queue overflow => GAME OVER (clear             interval; halt movements; display GAME OVER Screen)
    //  else enqueue and drawEverything
    
    var id = setInterval(() => {
      this.setCanEnqueue()
      console.log('1. canEnqueue: '+this.canEnqueue)
      this.setFolEmpty()
      console.log('2. folEmpty: '+this.folEmpty)
      if (this.canEnqueue == false && this.queueControl[0] == '') {
        console.log("# bottom position is empty")
        var newGuest = this.rndGuest(guestArray)
        this.queueControl[0] = newGuest
        console.log('New guest added to end of line')
        this.setCanEnqueue()
        console.log('3. canEnqueue: '+this.canEnqueue)
        map.drawEverything(ctx)}
      else if (this.canEnqueue == false && this.queueControl.includes('') == true) {
        console.log("# some position is empty")
        this.shiftEmpty()
        console.log('EMPTY Shifted')
        this.setFolEmpty()
        console.log('4. folEmpty: '+this.folEmpty)
        this.setCanEnqueue()
        console.log('5. canEnqueue: '+this.canEnqueue)
        map.drawEverything(ctx)
      } else if (this.canEnqueue == false && this.queueControl.includes('') == false) {
        console.log("# all queued up")       
        clearInterval(id)
        this.folEmpty = true // stop player from interacting with line
        console.log('6. folEmpty: '+this.folEmpty)
        console.log('GAME OVER')
      } else {
        this.enqueueGuest()
        this.setFolEmpty()
        console.log('7. folEmpty: '+this.folEmpty)
        this.setCanEnqueue()
        console.log('8. canEnqueue: '+this.canEnqueue)
        map.drawEverything(ctx)
      }
    }, this.updateRate)
  } 

  //  select random guest to unshift into queue
  rndGuest(guestArray) {
    let newGuest = guestArray[Math.floor(Math.random() * (guestArray.length))]
    return newGuest
  }

  //  draw the queue 
  draw() {
    for (i = 0; i < this.queueControl.length; i++) {
      if (this.queueControl[i] != '') {
        switch(i) {
          case 0:
          ctx.drawImage(this.queueControl[i].img, this.xOnC, (gameBoard.length*100)-(tileSize*(i+1)), tileSize, tileSize)
          break
          case 1:
          ctx.drawImage(this.queueControl[i].img, this.xOnC, (gameBoard.length*100)-(tileSize*(i+1)), tileSize, tileSize)
          break
          case 2:
          ctx.drawImage(this.queueControl[i].img, this.xOnC, (gameBoard.length*100)-(tileSize*(i+1)), tileSize, tileSize)
          break
          case 3:
          ctx.drawImage(this.queueControl[i].img, this.xOnC, (gameBoard.length*100)-(tileSize*(i+1)), tileSize, tileSize)
          break
          case 4:
          ctx.drawImage(this.queueControl[i].img, this.xOnC, (gameBoard.length*100)-(tileSize*(i+1)), tileSize, tileSize)
          break
        }
      }
    }
  }
}

  /*
  drawRndNPRnr() {
    //  method to draw a random number of NPCs to push into queue; this must be skewed such as to increase the possibility of drawing 0 or 1 > 2 > 3
    //  this can be achieved using might be a function of genNpcRate; higher genNpcRate => probability of several NPCs appearing in a row increases
    //  might however be fun to implement this; several guests being inserted at one will increase difficulty in higher levels 
  }
  */