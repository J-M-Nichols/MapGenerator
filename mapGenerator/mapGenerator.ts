import recursiveGenerator from './recursiveGenerator/recursiveGenerator'
import crawlingGenerator from './crawlingGenerator/crawlingGenerator'
import wilsonsGenerator from './wilsonsGenerator/wilsonsGenerator'
import primsGenerator from './primsGenerator/primsGenerator'
import fillHoles from './helpers/fillHoles/fillHoles'
import getPath from './AStarPath/getPath'
import shuffle from './helpers/shuffle'

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
 * A type object used to pass a value and index to the mapGenerator
 */
type indexValue<T> = {
    value: T,
    index: index
}

/**
 * A typical mapGenerator creates and manages a multidimensional array
 */
class mapGenerator<T>{
    private multArray: T[][]
    private width: number
    private height: number
    private walkableValue: T
    private unwalkableValue: T
    private generatedType: generatedType = generatedType.none
    private equalityFunction: equalityFunctionType<T>

    constructor(width: number, height: number, walkableValue: T, unwalkableValue: T, equalityFunction: equalityFunctionType<T>){
        this.multArray = [...Array(height)].map(_=>[...Array(width)].map(():T=>walkableValue))

        if(equalityFunction(walkableValue, unwalkableValue)) throw new Error('The walkable and unwalkable values cannot be equal. Either change the values or the equalityFunction')

        this.walkableValue = walkableValue
        this.unwalkableValue = unwalkableValue

        this.equalityFunction = equalityFunction

        //get multArray dimensions
        this.width = width
        this.height = height
    }

    //#region Getters
    /**
     * Determines whether or not the values at the given indexes are equal using the provided equalityFunction
     * @param indexA The first index
     * @param indexB The second index
     * @returns Whether or not the 2 values are equal
     */
    public areValuesAtIndexesEqual = (indexA: index, indexB: index): boolean => {
        const valueA = this.getValueAtIndex(indexA)
        const valueB = this.getValueAtIndex(indexB)

        return this.areValuesEqual(valueA, valueB)
    }

    /**
     * Determines whether or not the value at the given index and value are equal using the provided equalityFunction
     * @param index The index to get a value at
     * @param value The value to compare with
     * @returns Whether or not the 2 values are equal
     */
    public isValueAtIndexEqualToValue = (index: index, value: T): boolean => {
        const foundValue = this.getValueAtIndex(index)

        return this.areValuesEqual(foundValue, value)
    }

    /**
     * Determines whether or not valueA and valueB are equal using the provided equalityFunction
     * @param valueA The first value to compare
     * @param valueB The second value to compare
     * @returns Whether or not the 2 values are equal
     */
    public areValuesEqual = (valueA: T, valueB: T): boolean => {
        return this.equalityFunction(valueA, valueB)
    }

    /**
     * Determines if the value at the given index is equal to the unwalkableValue
     * @param index The index to compare with
     * @returns Whether or not the value at the given index is unwalkable
     */
    public isIndexUnwalkable = (index: index): boolean => {
        return this.isValueAtIndexEqualToValue(index, this.unwalkableValue)
    }

    /**
     * Determines if a value is equal to the unwalkableValue
     * @param value The value to compare with unwalkableValue
     * @returns If the given value is the same as the unwalkableValue
     */
    public isValueUnwalkable = (value: T): boolean => {
        return this.areValuesEqual(value, this.unwalkableValue)
    }

    /**
     * Determines if the value at the given index is equal to the walkableValue
     * @param index The index to compare with
     * @returns Whether or not the value at the given index is walkable
     */
    public isIndexWalkable = (index: index): boolean => {
        return this.isValueAtIndexEqualToValue(index, this.walkableValue)
    } 

    /**
     * Determines if a value is equal to the walkableValue
     * @param value The value to compare with walkableValue
     * @returns If the given value is the same as the walkableValue
     */
    public isValueWalkable = (value: T): boolean => {
        return this.areValuesEqual(value, this.walkableValue)
    }

    /**
     * Gets the current multArray for this mapGenerator
     * @returns This multArray
     */
    public getMultArray = ():T[][] => this.multArray

    /**
     * Gets the width for this mapGenerator
     * @returns this.width
     */
    public getWidth = ():number => this.width
    
    /**
     * Gets the height for this mapGenerator
     * @returns this.height
     */
    public getHeight = ():number => this.height

    /**
     * Gets the walkableValue used to construct this mapGenerator
     * @returns the value used in the constructor for this mapGenerator
     */
    public getWalkableValue = ():T => this.walkableValue

    /**
     * Gets the unwalkableValue used to generate paths 
     * @returns the value used for unwalkable paths
     */
    public getUnwalkableValue = (): T => this.unwalkableValue
    
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
     * Gets and array of the indexes with the given value
     * @param value The value to search for
     * @returns An array of indexes with the given value
     */
    public getAllIndexesForValue = (value: T): index[] => {
        const indexes: index[] = []

        for(let i = 0; i < this.height; i++){
            for(let j = 0; j < this.width; j++){
                const index: index = [i, j] 
                if(this.equalityFunction(this.getValueAtIndex(index), value)) indexes.push(index)
            }
        }

        return indexes
    }

    /**
     * Gets an array of the indexes with the walkableValue
     * @returns An array of indexes
     */
    public getWalkableIndexes = ():index[] => {
        return this.getAllIndexesForValue(this.walkableValue)
    }

    /**
     * Gets an array of the indexes with the unwalkableValue
     * @returns An array of indexes
     */
    public getUnwalkableIndexes = ():index[] => {
        return this.getAllIndexesForValue(this.unwalkableValue)
    }

    /**
     * Finds a path between 2 indexes
     * @param startingIndex The index to start the search at
     * @param endingIndex The index to end the search at
     * @returns the path between the 2 indexes or null if a path is not available
     */
    public getPath = (startingIndex: index, endingIndex: index) : index[] | null => {
        return getPath(this, startingIndex, endingIndex)
    }
    //#endregion

    //#region Setters
    /**
     * Changes the current generatedType
     * @param generatedType The type used for the generation
     * @returns this mapGenerator
     */
    public changeGeneratedType = (generatedType: generatedType):mapGenerator<T> => {
        this.generatedType = generatedType

        return this
    }

    /**
     * Changes the current equality function
     * @param equalityFunction The function used to determine the equality of 2 values
     * @returns this mapGenerator
     */
    public changeEqualityFunction = (equalityFunction: equalityFunctionType<T>): mapGenerator<T> => {
        this.equalityFunction = equalityFunction

        return this
    }

    /**
     * Changes the walkableValue for this mapGenerator
     * @param newBaseValue The new value for the path
     * @returns this mapGenerator
     */
    public setWalkableValue = (newWalkableValue: T):mapGenerator<T> => {
        this.walkableValue = newWalkableValue

        return this
    }

    /**
     * Changes the unwalkableValue for this mapGenerator
     * @param newUnwalkableValue The new value for unwalkable values
     * @returns this mapGenerator
     */
    public setUnwalkableValue = (newUnwalkableValue: T):mapGenerator<T> => {
        this.unwalkableValue = newUnwalkableValue

        return this
    }

    /**
     * Sets the value at the index. 
     * Will throw an error if the index is not valid
     * @param index The index to set the value at
     * @param value The value to set at the index
     * @returns this mapGenerator
     */
    public setValueAtIndex = (index: index, value: T):mapGenerator<T> => {
        if(this.isValidIndex(index)) this.multArray[index[0]][index[1]] = value

        return this
    }

    /**
     * Sets the value to all valid indexes
     * @param value The value to set
     * @param indexes The indexes to set the value at
     * @returns this mapGenerator
     */
    public setValueAtIndexes = (value: T, ...indexes: index[]): mapGenerator<T> => {
        indexes.forEach(el=>this.setValueAtIndex(el, value))

        return this
    }

    /**
     * Sets the value and index for each object
     * @param indexValues An array of {value, index} 
     * @returns this mapGenerator
     */
    public setValuesAtIndexes = (...indexValues: indexValue<T>[]): mapGenerator<T> => {
        indexValues.forEach(({index, value})=>{
            this.setValueAtIndex(index, value)
        })

        return this
    }

    /**
     * If the index is valid, set the value at the index to the walkableValue used to create the map with
     * @param index The index to set the value at
     * @returns this mapGenerator
     */
    public setWalkableValueAtIndex = (index: index) : mapGenerator<T> => {
        if(this.isValidIndex(index)) this.setValueAtIndex(index, this.walkableValue)

        return this
    }

    /**
     * Sets the walkableValue to all valid indexes
     * @param indexes The indexes to set as walkable
     * @returns this mapGenerator
     */
    public setWalkableValueAtIndexes = (...indexes: index[]): mapGenerator<T> => {
        this.setValueAtIndexes(this.walkableValue, ...indexes)

        return this
    }

    /**
     * If the index is valid, set the value at the index to the unwalkableValue used to create the map with
     * @param index The index to set the value at
     * @returns this mapGenerator
     */
    public setUnwalkableValueAtIndex = (index: index) : mapGenerator<T> => {
        if(this.isValidIndex(index)) this.setValueAtIndex(index, this.unwalkableValue)

        return this
    }
    
    /**
     * Sets the unwalkableValue to all valid indexes
     * @param indexes The indexes to set as unwalkable
     * @returns this mapGenerator
     */
    public setUnwalkableValueAtIndexes = (...indexes: index[]): mapGenerator<T> => {
        this.setValueAtIndexes(this.unwalkableValue, ...indexes)

        return this
    }

    /**
     * Fills the multArray with the given value
     * @param value The value to fill this multArray with
     * @returns this mapGenerator
     */
    public fillWithValue = (value: T): mapGenerator<T> => {
        this.multArray = [...Array(this.height)].map(_=>[...Array(this.width)].map(():T=>value))

        return this
    }
    //#endregion

    //#region Helpers
    /**
     * logs this multArray to the console with table
     * @returns this mapGenerator
     */
    public logMap = (): mapGenerator<T> => {
        console.log(this.generatedType)
        console.table(this.multArray)

        return this
    }

    /**
     * Shuffles the given array
     * @param array The array to shuffle
     * @returns The array with elements in random locations
     */
    public static shuffleArray = <U>(array: U[]):U[] => {
        return shuffle(array)
    }
    //#endregion

    //#region generators
    /**
     * Places a value randomly across the map
     * @param randomChance The chance from 0 to 0.9999 that a value will be unwalkable
     * @returns this mapGenerator
     */
    public generateRandomly = (randomChance: number):mapGenerator<T> => {
        //reset this map
        this.fillWithValue(this.walkableValue)
        
        //set the generated type
        this.generatedType = generatedType.random

        //give each element a randomChance chance to be set
        for(let i = 0; i < this.height; i++){
            for(let j = 0; j < this.width; j++){
                if(Math.random() < randomChance) this.setValueAtIndex([i, j], this.unwalkableValue)
            }
        }

        return this
    }

    /**
     * Crawls around the map creating a path. 
     * @param verticalCrawlCount The number of top to bottom crawls
     * @param horizontalCrawlCount The number of left to right crawls
     * @returns this mapGenerator
     */
    public generateCrawler = (verticalCrawlCount:number, horizontalCrawlCount:number):mapGenerator<T> => {
        //fill array with unwalkable value
        this.fillWithValue(this.walkableValue)

        //set the generated type
        this.generatedType = generatedType.crawl

        //run the crawler
        crawlingGenerator(this, verticalCrawlCount, horizontalCrawlCount)

        return this
    }

    /**
     * Recursively generates a path
     * @param startIndex The index to begin at
     * @param maxPathSize The maximum size for the path
     * @param shouldFillHoles If the generator should attempt to fill holes at the end
     * @returns this mapGenerator
     */
    public generateRecursively = (startIndex: index, maxPathSize: number, shouldFillHoles: boolean):mapGenerator<T> => {        
        //fill array with unwalkable value
        this.fillWithValue(this.unwalkableValue)

        //set the generated type
        this.generatedType = generatedType.recursive
        
        //run the generator
        recursiveGenerator(this, maxPathSize, startIndex)

        //try to fill more holes in the map
        if(shouldFillHoles) fillHoles(this, maxPathSize)

        return this
    }

    /**
     * Generates a path following the Wilson's algorithm
     * @param startIndex The index to begin the path at
     * @param maxPathSize The maximum size for a path (not length)
     * @param possiblePathValue A third value used to hold the place of a possible path
     */
    public generateWilsons = (startIndex: index, maxPathSize:number, possiblePathValue: T, shouldFillHoles: boolean): mapGenerator<T> => {
        //don't even search for a path if either of our path values are equal
        if(this.isValueWalkable(possiblePathValue) || this.isValueUnwalkable(possiblePathValue)){
            throw new Error(`Neither the unwalkableValue, possiblePathValue nor the map walkableValue can be equal.`)
        }
        
        //fill array with unwalkable value
        this.fillWithValue(this.unwalkableValue)

        //set the generated type
        this.generatedType = generatedType.wilsons
        
        //run the generator
        wilsonsGenerator(this, maxPathSize, startIndex, possiblePathValue)

        //try to fill more holes in the map
        if(shouldFillHoles) fillHoles(this, maxPathSize)
        
        return this
    }

    /**
     * Generates a path following the Prim's algorithm
     * @param startIndex The index to begin the path at
     * @param maxPathSize The maximum size for a path (not length)
     */
    public generatePrims = (startIndex: index, maxPathSize:number, shouldFillHoles: boolean): mapGenerator<T> => {
        //fill array with unwalkable value
        this.fillWithValue(this.unwalkableValue)

        //set the generated type
        this.generatedType = generatedType.prims

        //run the generator
        primsGenerator(this, maxPathSize, startIndex)

        //try to fill more holes in the map
        if(shouldFillHoles) fillHoles(this, maxPathSize)

        return this
    }
    //#endregion
}

export default mapGenerator
export {index, equalityFunctionType, generatedType, indexValue}