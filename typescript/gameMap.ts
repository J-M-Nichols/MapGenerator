import recursiveGenerator from './recursiveGenerator'
import crawlingGenerator from './crawlingGenerator/crawlingGenerator'
import coinFlip from './coinFlip'
import wilsonsGenerator from './wilsonsGenerator/wilsonsGenerator'

type index = [number, number]

type equalityFunctionType<T> = (
    element: T,
)=>boolean

class gameMap<T>{
    private multArray: T[][]
    private width: number
    private height: number
    private baseElement: T

    constructor(width: number, height: number, baseElement: T){
        this.multArray = [...Array(height)].map(_=>[...Array(width)].map(():T=>baseElement))

        this.baseElement = baseElement

        //get multArray dimensions
        this.width = width
        this.height = height
    }

    public getMultArray = ():T[][] => this.multArray
    public getWidth = ():number => this.width
    public getHeight = ():number => this.height
    public getBaseElement = ():T => this.baseElement

    public logMap = (): void => {console.table(this.multArray)}

    public isValidIndex = (index: index):boolean => {
        return index[0] >= 0 && index[0] < this.height && index[1] >= 0 && index[1] < this.width
    }

    public getValueAtIndex = (index: index):T => {
        return this.multArray[index[0]][index[1]]
    }

    public setValueAtIndex = (index: index, value: T):void => {
        if(this.isValidIndex(index)) this.multArray[index[0]][index[1]] = value
    }

    public generateRandomly = (value: T):void => {
        for(let i = 0; i < this.height; i++){
            for(let j = 0; j < this.width; j++){
                if(coinFlip()) this.setValueAtIndex([i, j], value)
            }
        }
    }

    public generateCrawler = (verticalCrawlCount:number, horizontalCrawlCount:number, value: T):void => {
        crawlingGenerator(this, verticalCrawlCount, horizontalCrawlCount, value)
    }

    public generateRecursively = (startIndex: index, value: T, equalityFunction: equalityFunctionType<T>):void => {
        recursiveGenerator(this, startIndex, value, equalityFunction)
    }

    public generateWilsons = (startIndex: index, value: T, validValue: T, equalityFunction: equalityFunctionType<T>, loopLimit: number): void => {
        wilsonsGenerator(this, startIndex, loopLimit, equalityFunction, value, validValue)
    }
}

export default gameMap
export {index, equalityFunctionType}