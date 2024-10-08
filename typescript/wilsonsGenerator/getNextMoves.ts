import countNeighbors from "../countNeighbors"
import gameMap, { equalityFunctionType, index } from "../gameMap"
import shuffle from "../shuffle"

/**
 * Gets a shuffled array of possible indexes that are filtered based on if the index is within the bounds of the map, 
 * if the index is not already part of the map,
 * and that the total number of neighbors that are base elements or possible path values is less than or equal to the max path size 
 * @param map The current game map element
 * @param maxPathSize The maximum size for the path
 * @param index The index to get moves at
 * @param possiblePathValue The value that denotes a path
 * @param equalityFunction A function to determine if 2 elements are equal
 * @returns A shuffled and filtered array of indexes that this index can be moved at
 */
const getNextMoves = <T>(map: gameMap<T>, maxPathSize: number, index: index, possiblePathValue: T, equalityFunction: equalityFunctionType<T>): index[] => {
    const shuffled: index[] = shuffle<index>([
        [1 +  index[0], 0 +  index[1]],
        [0 +  index[0], 1 +  index[1]],
        [-1 + index[0], 0 +  index[1]],
        [0 +  index[0], -1 + index[1]]
    ])

    return shuffled.filter(element => 
        map.isValidIndex(element) && 
        !equalityFunction(map.getValueAtIndex(element), possiblePathValue) && 
        (
            (
                countNeighbors(map, 1, element, equalityFunction, possiblePathValue, false) 
                + countNeighbors(map, 1, element, equalityFunction, map.getBaseElement(), false)
            ) <= maxPathSize
        )
    )
}

export default getNextMoves