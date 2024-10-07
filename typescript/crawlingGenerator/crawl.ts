import gameMap, { index } from "../gameMap"
import getRandomRange from "./getRandomRange"
import coinFlip from '../coinFlip'

const crawl = <T>(map: gameMap<T>, index:index, minIndex: index, value: T):void =>{
    const width = map.getWidth()
    const height = map.getHeight()

    while(true){
        map.setValueAtIndex(index, value)

        if(coinFlip()) index[0] += getRandomRange(minIndex[0], 2)
        else index[1] += getRandomRange(minIndex[1], 2)

        if (index[0] < 0 || index[0] > width || index[1] < 0 || index[1] > height) break;
    }
}

export default crawl