const fs = require("fs");

const text = fs.readFileSync("./input_0.txt", "utf-8");
const textByLine = text.split("\n");
const [width, length] = textByLine.shift().split(",");
const maparray = textByLine.map(line => line.split(""));

const result = [];

function checkSquare(i, j, size) {
  let result = true;
  if (i + size > length || j + size > width) return false;
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
      maparray[i + k][j + l] = "*";
    }
  }
}

function getMaxSizeByIndex(i, j) {
    if (maparray[i][j] !== "#") return 0;
    let size = 1;
    while (checkSquare(i, j, size + 1)) {
        size++;
    }
    return size;
}

function getMaxSquare() {
    let sizeMap = new Map();
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < width; j++) {
            sizeMap.set([i, j], getMaxSizeByIndex(i, j));
        }
    }
    const [index, size] = [...sizeMap.entries()].reduce((a, e) => e[1] > a[1] ? e : a);
    return { index, size };
}

const fillResult = () => {
    while(getMaxSquare().size > 0) {
        const i = getMaxSquare().index[0]
        const j = getMaxSquare().index[1]
        const size = getMaxSquare().size
        console.log(`FILL,${j},${i},${size}`)
        result.push(`FILL,${j},${i},${size}`)
        clearSquare(i,j,size)
    }
}

fillResult()

console.log(result.length)
console.log(result)

fs.writeFileSync("output.txt", result.join("\n"));