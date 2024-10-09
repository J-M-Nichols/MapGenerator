import gameMap from "../gameMap"
import crawl from "./crawl"
import getRandomRange from "./getRandomRange"

/**
 * Crawls mostly horizontally through the map
 * @param map The current game map element
 * @param height The maximum range for moving vertically
 * @param unwalkableValue A value that denotes a part of the map that cannot be walked on
 */
const crawlHorizontally = <T>(map: gameMap<T>, height: number, unwalkableValue: T) => {
    crawl(map, [1, getRandomRange(1, height)], [0, -1], unwalkableValue)
}

export default crawlHorizontally