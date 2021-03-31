const fs = require("fs");

const text = fs.readFileSync("./input_0.txt", "utf-8");
const textByLine = text.split("\n");
const [width, length] = textByLine.shift().split(",");
const maparray = textByLine.map(line => line.split(""));

const result = [];

function checkSquare(i,j,size) {
    let result = true
    if (i + size > length || j + size > width) return false
    for (let k = 0; k < size; k++ ) {
        for (let l = 0; l < size; l++) {
            if (maparray[i+k][j+l] !== '#') result = false
        }
    }
    return result
}

function clearSquare(i,j,size) {
    for (let k = 0; k < size; k++ ) {
        for (let l = 0; l < size; l++) {
            maparray[i+k][j+l] = '*'
        }
    }
}

function treatPixel(i,j) {
    let size = 1
    while (checkSquare(i,j,size+1)) {
        if (i + size + 1 >= length || j + size + 1 >= width) break
        size++
    }
    clearSquare(i,j,size)
    return `FILL,${j},${i},${size}`
}

let fillResult = () => {
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < width; j++) {
        if (maparray[i][j] === '#') result.push(treatPixel(i,j))
    }
  }
}

fillResult()

console.log(result.length)
console.log(result)

