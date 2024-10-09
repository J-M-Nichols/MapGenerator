import mapGenerator, { index } from "../mapGenerator"
import getRandomRange from "../helpers/getRandomRange"
import coinFlip from '../helpers/coinFlip'

/**
 * Crawls along the map randomly
 * @param map The current game map element
 * @param startIndex The index to start crawling at
 * @param minIndex The minimum crawling index, either -1 or 0
 */
const crawl = <T>(map: mapGenerator<T>, startIndex:index, minIndex: index):void =>{
    const width = map.getWidth()
    const height = map.getHeight()

    while(true){
        map.setUnwalkableValueAtIndex(startIndex)

        if(coinFlip()) startIndex[0] += getRandomRange(minIndex[0], 2)
        else startIndex[1] += getRandomRange(minIndex[1], 2)

        if (startIndex[0] < 0 || startIndex[0] > width || startIndex[1] < 0 || startIndex[1] > height) break;
    }
}

export default crawl