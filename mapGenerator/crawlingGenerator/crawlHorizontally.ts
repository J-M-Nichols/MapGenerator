import mapGenerator from "../mapGenerator"
import crawl from "./crawl"
import getRandomRange from "../helpers/getRandomRange"

/**
 * Crawls mostly horizontally through the map
 * @param map The current game map element
 * @param height The maximum range for moving vertically
 */
const crawlHorizontally = <T>(map: mapGenerator<T>, height: number): void => {
    crawl(map, [1, getRandomRange(1, height)], [0, -1])
}

export default crawlHorizontally