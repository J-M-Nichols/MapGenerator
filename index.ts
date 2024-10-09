import gameMap from "./typescript/gameMap";

const recursiveMap = new gameMap(10, 10, 0).generateRecursively([0, 0], 1, 1, (a, b)=>a===b, true).logMap()
const wilsonsMap = new gameMap(10, 10, 0).generateWilsons([0, 0], 1, 1, 2, (a, b)=>a===b, true).logMap()
const primsMap = new gameMap(10, 10, 0).generatePrims([0, 0], 1, 1, (a, b)=>a===b, true).logMap()