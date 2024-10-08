import gameMap, { equalityFunctionType, index } from "../gameMap"
import walk from './walk'
import getAvailableIndexes from './getAvailableIndexes'
import firstWalk from './firstWalk'
import countNeighbors from "../countNeighbors"

/**
 * Generates a path through the map using Wilson's algorithm : https://en.wikipedia.org/wiki/Maze_generation_algorithm 
 * @param map  The current game map element
 * @param maxPathSize The maximum size for the path
 * @param startIndex The index that the path begins at
 * @param equalityFunction A function to determine if 2 elements are equal
 * @param unwalkableValue A value that denotes a part of the map that cannot be walked on
 * @param possiblePathValue A temporary value that denotes a part of the map that may be the next path
 */
const wilsonsGenerator = <T>(map: gameMap<T>, maxPathSize:number, startIndex:index, equalityFunction: equalityFunctionType<T>, unwalkableValue: T, possiblePathValue: T): void => {
    //don't even search for a path if either of our path values are equal
    if(equalityFunction(unwalkableValue, possiblePathValue) || equalityFunction(unwalkableValue, map.getBaseElement()) || equalityFunction(possiblePathValue, map.getBaseElement())){
        throw new Error(`Neither the unwalkableValue, possiblePathValue nor the map base element can be equal.`)
    }
    
    //get the dimensions of the map
    const width = map.getWidth()
    const height = map.getHeight()

    //fill array with unwalkable value
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            map.setValueAtIndex([i, j], unwalkableValue)
        }
    }

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

    //fill the holes left in the map where there is an unwalkable value with a neighbor count that is greater than 0 and less than or equal to the maxPathSize
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            const index:index = [i, j]
            const neighborCount = countNeighbors(map, 1, index, equalityFunction, map.getBaseElement(), false)
            if(equalityFunction(map.getValueAtIndex(index), unwalkableValue) && neighborCount > 0 && neighborCount <= maxPathSize){
                map.setBaseValueAtIndex(index)
            }
        }
    }
}

export default wilsonsGenerator