import gameMap, { equalityFunctionType, index } from "../gameMap"
import countNeighbors from "../helpers/countNeighbors"
import getNewIndexes from "./getNewIndexes"

//Wikipedia Link : https://en.wikipedia.org/wiki/Prim%27s_algorithm
const primsGenerator = <T>(map: gameMap<T>, maxPathSize: number, unwalkableValue: T, startIndex: index, equalityFunction: equalityFunctionType<T>): void => {
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