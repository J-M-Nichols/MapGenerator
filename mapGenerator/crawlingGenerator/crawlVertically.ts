import mapGenerator from "../mapGenerator"
import crawl from "./crawl"
import getRandomRange from "./getRandomRange"

/**
 * Crawls mostly vertically through the map
 * @param map The current game map element
 * @param width The maximum range for moving horizontally
 * @param unwalkableValue A value that denotes a part of the map that cannot be walked on
 */
const crawlVertically = <T>(map: mapGenerator<T>, width: number, unwalkableValue: T) => {
    crawl(map, [getRandomRange(1, width) , 1], [-1, 0], unwalkableValue)
}

export default crawlVertically