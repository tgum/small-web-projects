function setup() {
  createCanvas(400, 400);
}

var segments = [{x: 20, y: 20}, {x: 19, y: 20}, {x: 18, y: 20}]
var direction = "right"
var alive = true
var score = 0

var move = true

var berries = []
var drawBerry = true

var moveMode = false
var startMouseX = 0
var startMouseY = 0

function draw() {}

setInterval(() => {
  background(0);
  if (!alive) {
    fill(255)
    textSize(30)
    text("GAME OVER. score: " + score, 50, 200)
    textSize(15)
    text("tap to play again", 100, 230)
    return null;
  }
  
  stroke(50, 50, 50)
  for (let y = 0; y < height / 10; y++) {
      line(0, y * 10, width, y * 10)
  }
  
  for (let x = 0; x < width / 10; x++) {
      line(x * 10, 0, x * 10, height)
  }
  
  fill(255)
  textSize(15)
  text("Score: " + score, 10, 20)
  
  if (drawBerry) {
    berries.push({x: round(random(0, width / 10 - 1)), y: round(random(2, height / 10 - 1))})
    drawBerry = false
  }
  
  noStroke()
  
  fill("red")
  rect(berries[0].x * 10, berries[0].y * 10, 10, 10)
  
  for (let i = 0; i < segments.length; i++) {
    fill("lime")
    rect(segments[i].x * 10, segments[i].y * 10, 10, 10)
  }
  
  var newSegment
  if (direction === "right") {
    newSegment = {x: segments[0].x + 1, y: segments[0].y}
  } else if (direction === "left") {
    newSegment = {x: segments[0].x - 1, y: segments[0].y}
  } else if (direction === "down") {
    newSegment = {x: segments[0].x, y: segments[0].y + 1}
  } else if (direction === "up") {
    newSegment = {x: segments[0].x, y: segments[0].y -1}
  }
  
  if (newSegment.x >= width / 10) {
    newSegment.x = 0
  } else if (newSegment.x < 0) {
    newSegment.x = width / 10 - 1
  } else if (newSegment.y >= height / 10) {
    newSegment.y = 0
  } else if (newSegment.y < 0) {
    newSegment.y = height / 10 - 1
  }

  for (let i = 0; i < segments.length; i++) {
    if (newSegment.x === segments[i].x && newSegment.y === segments[i].y) {
      alive = false
    }
  }
  
  segments.unshift(newSegment)
  if (newSegment.x === berries[0].x && newSegment.y === berries[0].y) {
    score++
    berries.splice(0, 1)
    drawBerry = true
  } else {
    segments.pop()
  }
}, 100)

function mouseDragged() {
  if (move) {
    let maxDiff = 4
    let diffX = max(mouseX, pmouseX) - min(mouseX, pmouseX)
    let diffY = max(mouseY, pmouseY) - min(mouseY, pmouseY)
    if (diffX < diffY && diffY > maxDiff) {
      if (mouseY < pmouseY && direction !== "down") {
        direction = "up"
      } else if (direction !== "up") {
        direction = "down"
      }
    } else if (diffX > maxDiff) {
      if (mouseX < pmouseX && direction !== "right") {
        direction = "left"
      } else if (direction !== "left") {
        direction = "right"
      }
    }
    move = false
    setTimeout(() => {
      move = true
    }, 80)
  }
  return false
}

function mouseClicked() {
  if (alive === false) {
    segments = [{x: 20, y: 20}, {x: 19, y: 20}, {x: 18, y: 20}]
    direction = "right"
    alive = true
    score = 0

    berries = []
    drawBerry = true
  }
}