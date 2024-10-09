import mapGenerator, { index } from "../mapGenerator"
import countNeighbors from "../helpers/countNeighbors"
import getNewIndexes from "./getNewIndexes"

/**
 * Generates a path through the map 
 * using Prim's algorithm : Wikipedia Link : https://en.wikipedia.org/wiki/Prim%27s_algorithm
 * @param map The current game map element
 * @param maxPathSize The maximum size for the path
 * @param startIndex The index that the path begins at
 */
const primsGenerator = <T>(map: mapGenerator<T>, maxPathSize: number, startIndex: index): void => {
    const baseValue = map.getWalkableValue()

    map.setWalkableValueAtIndex(startIndex)

    const mapLocations : index[] = getNewIndexes(map, [0, 0], [], baseValue)

    while(mapLocations.length){
        const nextIndex: index = mapLocations.splice(0, 1)[0]

        const neighborCount = countNeighbors(map, 1, nextIndex, baseValue, false)

        if(neighborCount <= maxPathSize){
            map.setWalkableValueAtIndex(nextIndex)

            mapLocations.unshift(...getNewIndexes(map, nextIndex, mapLocations, baseValue))
        }
    }
}

export default primsGenerator