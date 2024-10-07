import gameMap from "../gameMap"
import crawl from "./crawl"
import getRandomRange from "./getRandomRange"

const crawlVertically = <T>(map: gameMap<T>, width: number, value: T) => {
    crawl(map, [getRandomRange(1, width) , 1], [-1, 0], value)
}

const crawlHorizontally = <T>(map: gameMap<T>, height: number, value: T) => {
    crawl(map, [1, getRandomRange(1, height)], [0, -1], value)
}

const crawlingGenerator = <T>(map: gameMap<T>, verticalCrawlCount: number, horizontalCrawlCount: number, value: T) => {
    const width: number = map.getWidth()
    const height: number = map.getHeight()

    while (verticalCrawlCount > 0 || horizontalCrawlCount > 0){
        if(verticalCrawlCount-- > 0) crawlVertically(map, width, value)
        if(horizontalCrawlCount-- > 0) crawlHorizontally(map, height, value)
    }
}

export default crawlingGenerator
