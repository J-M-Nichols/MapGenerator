import mapGenerator, {index, equalityFunctionType, generatedType, indexValue} from "./mapGenerator/mapGenerator";

const crawlingMap = new mapGenerator(10, 10, 0).generateCrawler(5, 4, 1).logMap()
export {mapGenerator, index, equalityFunctionType, generatedType, indexValue}