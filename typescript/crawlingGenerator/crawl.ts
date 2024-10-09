import gameMap, { index } from "../gameMap"
import getRandomRange from "./getRandomRange"
import coinFlip from '../helpers/coinFlip'

/**
 * Crawls along the map randomly
 * @param map The current game map element
 * @param startIndex The index to start crawling at
 * @param minIndex The minimum crawling index, either -1 or 0
 * @param unwalkableValue A value that denotes a part of the map that cannot be walked on
 */
const crawl = <T>(map: gameMap<T>, startIndex:index, minIndex: index, unwalkableValue: T):void =>{
    const width = map.getWidth()
    const height = map.getHeight()

    while(true){
        map.setValueAtIndex(startIndex, unwalkableValue)

        if(coinFlip()) startIndex[0] += getRandomRange(minIndex[0], 2)
        else startIndex[1] += getRandomRange(minIndex[1], 2)

        if (startIndex[0] < 0 || startIndex[0] > width || startIndex[1] < 0 || startIndex[1] > height) break;
    }
}

export default crawl