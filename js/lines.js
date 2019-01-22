/*
TYPES OF LINES 
----------------------
1. regular 
2. guestlist line
3. VIP line
----------------------

1. regular line  [number increases in higher levels]
    * slower refresh rate (guests move slower)
    * higher probability of NPCs appearing
    * undesirables only appear in this type of line
    * higher acceptable wait time (guests will wait longer bf. your reputation suffers)
    * higher repLossTresh: you can have a bigger amount of guests in line before your rep. suffers * high maxLen: you only lose if there's a lot of guests in line
    * lowest repLossRate
    * lowest repLossVal

2. guestlist line [only one per level]
    * higher refresh rate (guests move quicker)
    * lower probability of guests appearing
    * no undesirables appear in this line; gl always get in
    * lower acceptable wait time (you start losing rep sooner, when guests wait in this line)
    * lower repLossTresh: already a few guests waiting in this line will make your rep suffer 
    * lower maxLen: if the visible portion of this line is completely filled up you lose the game)
    * higher repLossRate
    * higher repLossVal

3. VIP line [not graphically marked as a line but invisibly exists between the other lines so VIP               NPCs can appear in unepexpected positions and surprise the player]
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
  constructor(maxLen, rfRate, repLossTr, repLossRate, repLossVal, maxWait, genNpcRate, queueControl = [], lineIndex, lineType, folEmpty = false) {
    this.maxLen = maxLen  //  max number of NPCs in line; otherwise queue overflow => player loses
    this.rfRate = rfRate  //  interval after which NPCs move up one position in the line; random function triggered to determine whether a new NPC will be pushed into bottom of the line; raise to increase difficulty (higher levels: higher initial refresh rate, refresh rate might rise during level)
    this.repLossTr = repLossTr // treshold of number of guests in the line; if crossed player loses reputation
    this.repLossRate = repLossRate // rate at which player's reputation is decreased if certain conditions are met (repLossTr reached; etc.)
    this.repLossVal = repLossVal // amount of reputation player loses at repLossRate if certain conditions are met
    this.maxWait = maxWait // wait time of NPCs in line after which player loses rep
    this.genNpcRate = genNpcRate // probability of new NPCs appearing in line
    this.queueControl = queueControl // stores NPCs in line; default is empty, but can be initialized with NPCs already in line
    this.lineIndex = lineIndex // lines should be automatically numbered depending on how many lines there are on the map
    this.lineType = lineType // line type determines some of the other properties
    this.frontOfLine.y = tileSize * 3 // must be moved to main.js, bc. tileSize is only defined there
    this.frontOfLine.x = tileSize * (colNum - 2)
    this.folEmpty = folEmpty
  }
  
  isEmpty() {
    if (this.queueControl.length === 0) {
      return true
    } else {
      return false
    }
  }

  canEnqueue() {
    if (this.queueControl.length < this.maxLen) {
      return true
    } else {
      return false
    }
  }

  folChecker() {
    if (this.queueControl[this.queueControl.length-1] !== '') {
      return this.folEmpty = false
    } else {
      return this.folEmpty = true
    }
  }

  enqueue(NPC) {  
    if (this.canEnqueue() === false) {
      return 'Queue Overflow' //  this must be used in a game control function to end the game and display 'you lose' info
    } else {
    this.queueControl.unshift(NPC)
    return this.queueControl
    }
  }

  dequeue(NPC) {  //  =>  is triggered in two instances: 1. player lets guest in / 2. player turns guest away
    if (this.isEmpty() === true) {
      return 'Queue Underflow'  //  might be triggered when player moves to an empty line and hits let in/turn away button; does however not trigger any event ingame
    } else if (this.folEmpty === false && this.lineIndex === player.x) {
      return this.queueControl.pop(NPC) //  NPC in line position one is removed from line; depending on button press either turn away or let in animation triggered 
    }
  }

  drawRndNPC() {
    //  method to draw a random NPC to push into queue
  }

  drawRndNPRnr() {
    //  method to draw a random number of NPCs to push into queue; this must be skewed such as to increase the possibility of drawing 0 or 1 > 2 > 3
    //  might not be neccessary; this might be a function of genNpcRate; higher genNpcRate => probability of several NPCs appearing in a row increases 
  }



}


