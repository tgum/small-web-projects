function setup() {
  createCanvas(800, 500);
}

var segments = [{x: 20, y: 20}, {x: 19, y: 20}, {x: 18, y: 20}]
var direction = "right"
var alive = true
var score = 0

var berries = []
var drawBerry = true

function draw() {}

setInterval(() => {
  background(0);
  if (!alive) {
    fill(255)
    textSize(30)
    text("GAME OVER. score: " + score, 100, 200)
    textSize(15)
    text("click to play again", 200, 250)
    return null;
  }
  
  if (keyIsPressed) {
    if (keyCode === UP_ARROW && direction !== "down") {
      direction = "up"
    } else if (keyCode === DOWN_ARROW && direction !== "up") {
      direction = "down"
    } else if (keyCode === LEFT_ARROW && direction !== "right") {
      direction = "left"
    } else if (keyCode === RIGHT_ARROW && direction !== "left") {
      direction = "right"
    }
  }
  
  stroke(50, 50, 50, 255)
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
    berries.push({x: round(random(0, width / 10 - 1)), y: round(random(0, height / 10 - 1))})
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
}, 50)

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