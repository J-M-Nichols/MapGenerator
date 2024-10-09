import countNeighbors from "../helpers/countNeighbors"
import mapGenerator, { index } from "../mapGenerator"
import compareIndexes from "../helpers/compareIndexes"
import getConnectedIndexes from "../helpers/getConnectedIndexes"

/**
 * Searches the indexes connected to the search index that are connected to the main path
 * @param map The current game map element
 * @param searchIndex The index to search at
 * @param currentPath The current path that has been walked along
 * @param maxPathSize The maximum size that the path can be
 * @returns An array of indexes connected to the main path
 */
const getWilsonsConnectedIndexes = <T>(map: mapGenerator<T>, searchIndex: index, currentPath: index[], maxPathSize: number): index[] => {
    let connectedIndexes : index[] = getConnectedIndexes(map, searchIndex)

    connectedIndexes = connectedIndexes.filter(el=>{
        if(currentPath.includes(el) || compareIndexes(el, searchIndex)) return false

        const neighbors = countNeighbors(map, 1, el, map.getWalkableValue(), false) 

        return neighbors > 0 && neighbors <= maxPathSize
    })

    return connectedIndexes
}

export default getWilsonsConnectedIndexes