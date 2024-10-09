import mapGenerator, { index } from "../mapGenerator"
import walk from './walk'
import getAvailableIndexes from './getAvailableIndexes'
import firstWalk from './firstWalk'

/**
 * Generates a path through the map 
 * using Wilson's algorithm : Wikipedia Link : https://en.wikipedia.org/wiki/Loop-erased_random_walk
 * @param map The current game map element
 * @param maxPathSize The maximum size for the path
 * @param startIndex The index that the path begins at
 * @param possiblePathValue A temporary value that denotes a part of the map that may be the next path
 */
const wilsonsGenerator = <T>(map: mapGenerator<T>, maxPathSize:number, startIndex:index, possiblePathValue: T): void => {
    //create the main path for the map
    firstWalk(map, maxPathSize, startIndex, possiblePathValue)

    //track the badIndexes that cannot be added to the main path so they can be ignored
    const badIndexes:index[] = []

    //Get the next indexes that can be moved on
    let nextIndexes = getAvailableIndexes(map, badIndexes)

    //While we can start a new path, start a new path and see if the indexes can be added to the main path
    while(nextIndexes.length > 0){
        //perform the next walk and grab the indexes that cannot be added to a path
        const foundBadIndexes = walk(map, maxPathSize, nextIndexes[0], possiblePathValue)

        //we have found some indexes that cannot be added to the main path, save them so we don't keep going there
        if(foundBadIndexes.length > 0) badIndexes.push(...foundBadIndexes)

        //get the next indexes that can be moved on
        nextIndexes = getAvailableIndexes(map, badIndexes)
    }
}

export default wilsonsGenerator