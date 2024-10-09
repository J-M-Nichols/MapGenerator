import countNeighbors from "../helpers/countNeighbors"
import gameMap, { equalityFunctionType, index } from "../gameMap"
import compareIndexes from "./compareIndexes"
import getCross from "./getCross"

/**
 * Searches the indexes connected to the search index that are connected to the main path
 * @param map The current game map element
 * @param searchIndex The index to search at
 * @param currentPath The current path that has been walked along
 * @param maxPathSize The maximum size that the path can be
 * @param equalityFunction A function to determine if 2 elements are equal
 * @returns An array of indexes connected to the main path
 */
const getConnectedIndexes = <T>(map: gameMap<T>, searchIndex: index, currentPath: index[], maxPathSize: number, equalityFunction: equalityFunctionType<T>): index[] => {
    let connectedIndexes : index[] = getCross(map, searchIndex)

    connectedIndexes = connectedIndexes.filter(el=>{
        if(currentPath.includes(el) || compareIndexes(el, searchIndex)) return false

        const neighbors = countNeighbors(map, 1, el, equalityFunction, map.getBaseValue(), false) 

        return neighbors > 0 && neighbors <= maxPathSize
    })

    return connectedIndexes
}

export default getConnectedIndexes