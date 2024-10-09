import mapGenerator, { equalityFunctionType, index } from "../mapGenerator"
import countNeighbors from "../helpers/countNeighbors"
import getNewIndexes from "./getNewIndexes"

/**
 * Generates a path through the map 
 * using Prim's algorithm : Wikipedia Link : https://en.wikipedia.org/wiki/Prim%27s_algorithm
 * @param map The current game map element
 * @param maxPathSize The maximum size for the path
 * @param unwalkableValue A value that denotes a part of the map that cannot be walked on
 * @param startIndex The index that the path begins at
 * @param equalityFunction A function to determine if 2 elements are equal
 */
const primsGenerator = <T>(map: mapGenerator<T>, maxPathSize: number, unwalkableValue: T, startIndex: index, equalityFunction: equalityFunctionType<T>): void => {
    const baseValue = map.getBaseValue()

    map.setBaseValueAtIndex(startIndex)

    const mapLocations : index[] = getNewIndexes(map, [0, 0], [], baseValue, equalityFunction)

    while(mapLocations.length){
        const nextIndex: index = mapLocations.splice(0, 1)[0]

        const neighborCount = countNeighbors(map, 1, nextIndex, equalityFunction, baseValue, false)

        if(neighborCount <= maxPathSize){
            map.setBaseValueAtIndex(nextIndex)

            mapLocations.unshift(...getNewIndexes(map, nextIndex, mapLocations, baseValue, equalityFunction))
        }
    }
}

export default primsGenerator