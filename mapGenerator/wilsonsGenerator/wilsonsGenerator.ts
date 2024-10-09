import mapGenerator, { equalityFunctionType, index } from "../mapGenerator"
import walk from './walk'
import getAvailableIndexes from './getAvailableIndexes'
import firstWalk from './firstWalk'

/**
 * Generates a path through the map 
 * using Wilson's algorithm : Wikipedia Link : https://en.wikipedia.org/wiki/Loop-erased_random_walk
 * @param map The current game map element
 * @param maxPathSize The maximum size for the path
 * @param startIndex The index that the path begins at
 * @param equalityFunction A function to determine if 2 elements are equal
 * @param unwalkableValue A value that denotes a part of the map that cannot be walked on
 * @param possiblePathValue A temporary value that denotes a part of the map that may be the next path
 */
const wilsonsGenerator = <T>(map: mapGenerator<T>, maxPathSize:number, startIndex:index, equalityFunction: equalityFunctionType<T>, unwalkableValue: T, possiblePathValue: T): void => {
    //create the main path for the map
    firstWalk(map, maxPathSize, startIndex, possiblePathValue, equalityFunction)

    //track the badIndexes that cannot be added to the main path so they can be ignored
    const badIndexes:index[] = []

    //Get the next indexes that can be moved on
    let nextIndexes = getAvailableIndexes(map, badIndexes, equalityFunction)

    //While we can start a new path, start a new path and see if the indexes can be added to the main path
    while(nextIndexes.length > 0){
        //perform the next walk and grab the indexes that cannot be added to a path
        const foundBadIndexes = walk(map, maxPathSize, nextIndexes[0], unwalkableValue, possiblePathValue, equalityFunction)

        //we have found some indexes that cannot be added to the main path, save them so we don't keep going there
        if(foundBadIndexes.length > 0) badIndexes.push(...foundBadIndexes)

        //get the next indexes that can be moved on
        nextIndexes = getAvailableIndexes(map, badIndexes, equalityFunction)
    }
}

export default wilsonsGenerator