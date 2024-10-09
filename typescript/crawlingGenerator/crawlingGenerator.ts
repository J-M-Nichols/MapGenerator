import gameMap from "../gameMap"
import crawlVertically from './crawlVertically'
import crawlHorizontally from './crawlHorizontally'

/**
 * Crawls along a maze based of the crawl counts
 * @param map The current game map element
 * @param verticalCrawlCount The number of times to crawl vertically
 * @param horizontalCrawlCount The number of times to crawl horizontally
 * @param unwalkableValue A value that denotes a part of the map that cannot be walked on
 */
const crawlingGenerator = <T>(map: gameMap<T>, verticalCrawlCount: number, horizontalCrawlCount: number, unwalkableValue: T) => {
    const width: number = map.getWidth()
    const height: number = map.getHeight()

    while (verticalCrawlCount > 0 || horizontalCrawlCount > 0){
        if(verticalCrawlCount-- > 0) crawlVertically(map, width, unwalkableValue)
        if(horizontalCrawlCount-- > 0) crawlHorizontally(map, height, unwalkableValue)
    }
}

export default crawlingGenerator
