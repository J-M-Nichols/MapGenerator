import mapGenerator from "../mapGenerator"
import crawl from "./crawl"
import getRandomRange from "../helpers/getRandomRange"

/**
 * Crawls mostly vertically through the map
 * @param map The current game map element
 * @param width The maximum range for moving horizontally
 */
const crawlVertically = <T>(map: mapGenerator<T>, width: number) => {
    crawl(map, [getRandomRange(1, width) , 1], [-1, 0])
}

export default crawlVertically