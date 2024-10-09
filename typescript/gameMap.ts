import recursiveGenerator from './recursiveGenerator/recursiveGenerator'
import crawlingGenerator from './crawlingGenerator/crawlingGenerator'
import coinFlip from './helpers/coinFlip'
import wilsonsGenerator from './wilsonsGenerator/wilsonsGenerator'
import primsGenerator from './primsGenerator/primsGenerator'
import fillHoles from './helpers/fillHoles/fillHoles'

/**
 * An index is a [number, number] tuple
 */
type index = [number, number]

/**
 * A function to determine if 2 values are equal
 */
type equalityFunctionType<T> = (
    valueA: T,
    ValueB: T
)=>boolean

/**
 * A generated type displays the type used to generate a path in the map
 * none = 'NONE',    
 * random = 'RANDOM',
 * crawl = 'CRAWL',
 * recursive = 'RECURSIVE',
 * wilsons = 'WILSONS',
 * prims = 'PRIMS'
 */
enum generatedType{
    none = 'NONE',
    random = 'RANDOM',
    crawl = 'CRAWL',
    recursive = 'RECURSIVE',
    wilsons = 'WILSONS',
    prims = 'PRIMS'
}

/**
 * A type object used to pass a value and index to the game map
 */
type indexValue<T> = {
    value: T,
    index: index
}

/**
 * A typical game map creates and manages a multidimensional array
 */
class gameMap<T>{
    private multArray: T[][]
    private width: number
    private height: number
    private baseValue: T
    private generatedType: generatedType = generatedType.none

    constructor(width: number, height: number, baseElement: T){
        this.multArray = [...Array(height)].map(_=>[...Array(width)].map(():T=>baseElement))

        this.baseValue = baseElement

        //get multArray dimensions
        this.width = width
        this.height = height
    }

    /**
     * Gets the current multArray for this gameMap
     * @returns This multArray
     */
    public getMultArray = ():T[][] => this.multArray

    /**
     * Gets the width for this game map 
     * @returns this.width
     */
    public getWidth = ():number => this.width
    
    /**
     * Gets the height for this game map 
     * @returns this.height
     */
    public getHeight = ():number => this.height

    /**
     * Gets the base element used to construct this gameMap
     * @returns the value used in the constructor for this gameMap
     */
    public getBaseValue = ():T => this.baseValue

    /**
     * Changes the base value for this game map
     * @param newBaseValue The new value for the path
     */
    public setBaseValue = (newBaseValue: T):gameMap<T> => {
        this.baseValue = newBaseValue

        return this
    }

    /**
     * logs this multArray to the console with table
     */
    public logMap = (): gameMap<T> => {
        console.log(this.generatedType)
        console.table(this.multArray)

        return this
    }

    /**
     * Determines if the given index is within the bounds of this map
     * @param index The index to search at
     * @returns If this index is within the bounds of this map or not
     */
    public isValidIndex = (index: index):boolean => {
        return index[0] >= 0 && index[0] < this.height && index[1] >= 0 && index[1] < this.width
    }

    /**
     * Gets a value at the index.
     * Will throw an error if the index is not valid
     * @param index The index to get a value at
     * @returns The value at the index
     */
    public getValueAtIndex = (index: index):T => {
        return this.multArray[index[0]][index[1]]
    }

    /**
     * Sets the value at the index. 
     * Will throw an error if the index is not valid
     * @param index The index to set the value at
     * @param value The value to set at the index
     */
    public setValueAtIndex = (index: index, value: T):gameMap<T> => {
        if(this.isValidIndex(index)) this.multArray[index[0]][index[1]] = value

        return this
    }

    /**
     * Sets the value to all valid indexes
     * @param value The value to set
     * @param indexes The indexes to set the value at
     */
    public setValueAtIndexes = (value: T, ...indexes: index[]): gameMap<T> => {
        indexes.forEach(el=>this.setValueAtIndex(el, value))

        return this
    }

    /**
     * Sets the value and index for each object
     * @param indexValues An array of {value, index} 
     */
    public setValuesAtIndexes = (...indexValues: indexValue<T>[]): gameMap<T> => {
        indexValues.forEach(({index, value})=>{
            this.setValueAtIndex(index, value)
        })

        return this
    }

    /**
     * If the index is valid, set the value at the index to the baseValue used to create the map with
     * @param index The index to set the value at
     */
    public setBaseValueAtIndex = (index: index) : gameMap<T> => {
        if(this.isValidIndex(index)) this.setValueAtIndex(index, this.baseValue)

        return this
    }

    /**
     * Fills the multArray with the given value
     * @param value The value to fill this multArray with
     */
    public fillWithValue = (value: T): gameMap<T> => {
        this.multArray = [...Array(this.height)].map(_=>[...Array(this.width)].map(():T=>value))

        return this
    }

    /**
     * Places a value randomly across the map
     * @param unwalkableValue The value to randomly place on the map
     * @param randomChance The chance from 0 to 0.9999 that a value will be unwalkable
     */
    public generateRandomly = (unwalkableValue: T, randomChance: number):gameMap<T> => {
        //reset this map
        this.fillWithValue(this.baseValue)
        
        //set the generated type
        this.generatedType = generatedType.random

        //give each element a randomChance chance to be set
        for(let i = 0; i < this.height; i++){
            for(let j = 0; j < this.width; j++){
                if(Math.random() < randomChance) this.setValueAtIndex([i, j], unwalkableValue)
            }
        }

        return this
    }

    /**
     * Crawls around the map creating a path. 
     * @param verticalCrawlCount The number of top to bottom crawls
     * @param horizontalCrawlCount The number of left to right crawls
     * @param unwalkableValue The value for the path
     */
    public generateCrawler = (verticalCrawlCount:number, horizontalCrawlCount:number, unwalkableValue: T):gameMap<T> => {
        //fill array with unwalkable value
        this.fillWithValue(this.baseValue)

        //set the generated type
        this.generatedType = generatedType.crawl

        //run the crawler
        crawlingGenerator(this, verticalCrawlCount, horizontalCrawlCount, unwalkableValue)

        return this
    }

    /**
     * Recursively generates a path
     * @param startIndex The index to begin at
     * @param unwalkableValue The value that cannot be walked at
     * @param equalityFunction A function to determine if 2 values are equal
     */
    public generateRecursively = (startIndex: index, maxPathSize: number, unwalkableValue: T, equalityFunction: equalityFunctionType<T>, shouldFillHoles: boolean):gameMap<T> => {
        //don't even search for a path if either of our path values are equal
        if(equalityFunction(unwalkableValue, this.getBaseValue())){
            throw new Error(`Neither the unwalkableValue nor the map base element can be equal.`)
        }
        
        //fill array with unwalkable value
        this.fillWithValue(unwalkableValue)

        //set the generated type
        this.generatedType = generatedType.recursive
        
        //run the generator
        recursiveGenerator(this, maxPathSize, startIndex, this.baseValue, equalityFunction)

        //try to fill more holes in the map
        if(shouldFillHoles) fillHoles(this, maxPathSize, unwalkableValue, equalityFunction)

        return this
    }

    /**
     * Generates a path following the Wilson's algorithm
     * @param startIndex The index to begin the path at
     * @param maxPathSize The maximum size for a path (not length)
     * @param unwalkableValue The value that cannot be walked at
     * @param possiblePathValue A third value used to hold the place of a possible path
     * @param equalityFunction A function to determine if 2 values are equal
     */
    public generateWilsons = (startIndex: index, maxPathSize:number, unwalkableValue: T, possiblePathValue: T, equalityFunction: equalityFunctionType<T>, shouldFillHoles: boolean): gameMap<T> => {
        //don't even search for a path if either of our path values are equal
        if(equalityFunction(unwalkableValue, possiblePathValue) || equalityFunction(unwalkableValue, this.getBaseValue()) || equalityFunction(possiblePathValue, this.getBaseValue())){
            throw new Error(`Neither the unwalkableValue, possiblePathValue nor the map base element can be equal.`)
        }
        
        //fill array with unwalkable value
        this.fillWithValue(unwalkableValue)

        //set the generated type
        this.generatedType = generatedType.wilsons
        
        //run the generator
        wilsonsGenerator(this, maxPathSize, startIndex, equalityFunction, unwalkableValue, possiblePathValue)

        //try to fill more holes in the map
        if(shouldFillHoles) fillHoles(this, maxPathSize, unwalkableValue, equalityFunction)
        
        return this
    }

    /**
     * Generates a path following the Prim's algorithm
     * @param startIndex The index to begin the path at
     * @param maxPathSize The maximum size for a path (not length)
     * @param unwalkableValue The value that cannot be walked at
     * @param equalityFunction A function to determine if 2 values are equal
     */
    public generatePrims = (startIndex: index, maxPathSize:number, unwalkableValue: T, equalityFunction: equalityFunctionType<T>, shouldFillHoles: boolean): gameMap<T> => {
        //don't even search for a path if either of our path values are equal
        if(equalityFunction(unwalkableValue, this.getBaseValue())){
            throw new Error(`Neither the unwalkableValue nor the map base element can be equal.`)
        }
        
        //fill array with unwalkable value
        this.fillWithValue(unwalkableValue)

        //set the generated type
        this.generatedType = generatedType.prims

        //run the generator
        primsGenerator(this, maxPathSize, unwalkableValue, startIndex, equalityFunction)

        //try to fill more holes in the map
        if(shouldFillHoles) fillHoles(this, maxPathSize, unwalkableValue, equalityFunction)

        return this
    }
}

export default gameMap
export {index, equalityFunctionType}