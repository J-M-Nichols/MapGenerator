import mapGenerator from "../mapGenerator"
import crawlVertically from './crawlVertically'
import crawlHorizontally from './crawlHorizontally'

/**
 * Crawls along a maze based of the crawl counts
 * @param map The current game map element
 * @param verticalCrawlCount The number of times to crawl vertically
 * @param horizontalCrawlCount The number of times to crawl horizontally
 */
const crawlingGenerator = <T>(map: mapGenerator<T>, verticalCrawlCount: number, horizontalCrawlCount: number) => {
    const width: number = map.getWidth()
    const height: number = map.getHeight()

    while (verticalCrawlCount > 0 || horizontalCrawlCount > 0){
        if(verticalCrawlCount-- > 0) crawlVertically(map, width)
        if(horizontalCrawlCount-- > 0) crawlHorizontally(map, height)
    }
}

export default crawlingGenerator
