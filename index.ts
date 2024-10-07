import gameMap from "./typescript/gameMap";

const map = new gameMap(10, 10, 0)
// map.generateRecursively([0, 0], 1, (el)=>el===1)
map.generateWilsons([0, 0], 1, 2, el=>el===2, 5000)
console.table(map.getMultArray())