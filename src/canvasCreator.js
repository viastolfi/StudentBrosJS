const { createCanvas } = require('canvas')

function createFirstCanvas() {
	const width = 1200
	const height = 600

	const canvas = createCanvas(width, height)
	const context = canvas.getContext('2d')

	context.fillStyle = '#000000'
	context.fillRect(0, 0, width, height)

	return canvas;
}

module.exports = {
	createFirstCanvas,
}
