function setup() {
	createCanvas(500, 500);
	if (width%cellSize === 0) {
		cellSize = width/cellSize
	}
}

var segments = [{x: 20, y: 20}, {x: 19, y: 20}, {x: 18, y: 20}]
var direction = "right"
var alive = true
var score = 0

var move = true

var berries = []
var drawBerry = true
var eatingBerry = false

var moveMode = false
var startMouseX = 0
var startMouseY = 0

var cellSize = 20
var speed = 130

setInterval(() => {
	if (width%cellSize !== 0) {
		console.error("the width is not divisible by cellSize\nplease correct this problem");
		return
	}
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
	for (let y = 0; y < height / cellSize; y++) {
			line(0, y * cellSize, width, y * cellSize)
	}

	for (let x = 0; x < width / cellSize; x++) {
			line(x * cellSize, 0, x * cellSize, height)
	}

	fill(255)
	textSize(15)
	text("Score: " + score, 10, 20)

	if (drawBerry) {
		berries.push({x: round(random(0, width / cellSize - 1)), y: round(random(2, height / cellSize - 1))})
		drawBerry = false
	}

	noStroke()

	fill("red")
	rect(berries[0].x * cellSize, berries[0].y * cellSize, cellSize, cellSize)

	for (let i = 0; i < segments.length; i++) {
		fill("lime")
		rect(segments[i].x * cellSize, segments[i].y * cellSize, cellSize, cellSize)
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

	if (newSegment.x >= width / cellSize) {
		newSegment.x = 0
	} else if (newSegment.x < 0) {
		newSegment.x = width / cellSize - 1
	} else if (newSegment.y >= height / cellSize) {
		newSegment.y = 0
	} else if (newSegment.y < 0) {
		newSegment.y = height / cellSize - 1
	}

	for (let i = 0; i < segments.length; i++) {
		if (newSegment.x === segments[i].x && newSegment.y === segments[i].y) {
			alive = false
		}
	}

	segments.unshift(newSegment)
	for (let i = 0; i < berries.length; i++) {
		if (newSegment.x === berries[i].x && newSegment.y === berries[i].y) {
			score++
			berries.splice(0, 1)
			eatingBerry = true
			drawBerry = true
		}
	}
	if (!eatingBerry) {
		segments.pop()
	} else {
		eatingBerry = false
	}
}, speed)

function mouseDragged() {
	if (move) {
		let maxDiff = 5
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
		}, 100)
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
