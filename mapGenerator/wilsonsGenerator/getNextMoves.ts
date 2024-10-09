import countNeighbors from "../helpers/countNeighbors"
import mapGenerator, { index } from "../mapGenerator"
import getConnectedIndexes from "../helpers/getConnectedIndexes"

/**
 * Gets a shuffled array of possible indexes that are filtered based on if the index is within the bounds of the map, 
 * if the index is not already part of the map,
 * and that the total number of neighbors that are base elements or possible path values is less than or equal to the max path size 
 * @param map The current game map element
 * @param maxPathSize The maximum size for the path
 * @param searchIndex The index to get moves at
 * @param possiblePathValue The value that denotes a path
 * @returns A shuffled and filtered array of indexes that this index can be moved at
 */
const getNextMoves = <T>(map: mapGenerator<T>, maxPathSize: number, searchIndex: index, possiblePathValue: T): index[] => {
    return getConnectedIndexes(map, searchIndex).filter(element =>
        !map.isValueAtIndexEqualToValue(element, possiblePathValue) && 
        (
            (
                countNeighbors(map, 1, element, possiblePathValue, false) 
                + countNeighbors(map, 1, element, map.getWalkableValue(), false)
            ) <= maxPathSize
        )
    )
}

export default getNextMoves