const fs = require("fs");

const text = fs.readFileSync("./input_0.txt", "utf-8");
const textByLine = text.split("\n");
const [drawingWidth, drawingLength] = textByLine.shift().split(",");
const maparray = textByLine.map(line => line.split(""));

const doneArray = [];
for (let i = 0; i < drawingLength; i++) {
  const line = [];
  for (let j = 0; j < drawingWidth; j++) {
    line.push(false);
  }
  doneArray.push(line);
}

const result = [];

function checkSquare(i, j, size) {
  let result = true;
  if (i + size > drawingLength || j + size > drawingWidth) return false;
  for (let k = 0; k < size; k++) {
    for (let l = 0; l < size; l++) {
      if (maparray[i + k][j + l] !== "#") result = false;
    }
  }
  return result;
}

function clearSquare(i, j, size) {
  for (let k = 0; k < size; k++) {
    for (let l = 0; l < size; l++) {
      doneArray[i + k][j + l] = true;
    }
  }
}

function treatPixel(i, j) {
  let size = 1;
  while (checkSquare(i, j, size + 1)) {
    size++;
  }
  clearSquare(i, j, size);
  return `FILL,${j},${i},${size}`;
}

let fillResult = () => {
  for (let i = 0; i < drawingLength; i++) {
    for (let j = 0; j < drawingWidth; j++) {
      if (maparray[i][j] === "#" && doneArray[i][j] === false)
        result.push(treatPixel(i, j));
    }
  }
};

fillResult()

console.log(result.length);
console.log(result);

fs.writeFileSync("output.txt", result.join("\n"));
