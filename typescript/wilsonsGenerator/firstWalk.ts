import gameMap, { equalityFunctionType, index } from "../gameMap"
import getNextMoves from "./getNextMoves"

/**
 * Generates the main path for the map that will end once it cannot move forward anymore
 * @param map The current game map element
 * @param maxPathSize The maximum size for the path
 * @param startIndex The index that the path begins at
 * @param possiblePathValue A temporary value that denotes a part of the map that may be the next path
 * @param equalityFunction A function to determine if 2 elements are equal
 */
const firstWalk = <T>(map: gameMap<T>, maxPathSize: number, startIndex: index, possiblePathValue: T, equalityFunction: equalityFunctionType<T>): void => {
    //initiates the possible path at the starting index
    map.setValueAtIndex(startIndex, possiblePathValue)
    
    //get the next moves for the walk
    let nextIndexes = getNextMoves(map, maxPathSize, startIndex, possiblePathValue, equalityFunction)
    //start tracking the current path with the start index
    const currentPath: index[] = [startIndex]

    //This should always be greater than 0 when we can take the next step
    if(nextIndexes.length > 0){
        //get the next move for the path from the shuffled next moves
        let currentIndex = nextIndexes.splice(0, 1)[0]

        //while we can keep moving, continue moving
        while(true){
            //set this index as a path
            map.setValueAtIndex(currentIndex, possiblePathValue)

            //add the current move to the path
            currentPath.push(currentIndex)
            //get the next moves for the current index
            nextIndexes = getNextMoves(map, maxPathSize, currentIndex, possiblePathValue, equalityFunction)
            
            //we have a move that we can make, continue moving
            if(nextIndexes.length > 0){
                currentIndex = nextIndexes.splice(0, 1)[0]
            }
            //we do not have any more moves to make, set the main path 
            else break
        }
    }

    //now that we have finished the path, go through currentPath to assign it to base value
    currentPath.forEach(move=>{
        map.setBaseValueAtIndex(move)
    })
}

export default firstWalk