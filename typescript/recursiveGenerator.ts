import countNeighbors from './countNeighbors'
import gameMap, {index, equalityFunctionType} from './gameMap'
import shuffle from './shuffle'

/**
 * Walks through the map's multArray and and assigns a walkable path
 * @param map map<T>
 * @param index index
 * @param value T
 * @param equalityFunction equalityFunctionType<T>
 * @returns map<T>
 */
const recursiveGenerator = <T>(map: gameMap<T>, index: index, value: T, equalityFunction: equalityFunctionType<T>):gameMap<T> =>{
    if(countNeighbors(map, 1, index, equalityFunction, value, false) > 1) return map
    map.setValueAtIndex(index, value)

    const nextMoves = shuffle<index>([
        [1 + index[0], 0 + index[1]],
        [0 + index[0], 1 + index[1]],
        [-1 + index[0], 0 + index[1]],
        [0 + index[0], -1 + index[1]]
    ])

    nextMoves.forEach(element=>{
        map = recursiveGenerator(map, element, value, equalityFunction)
    })

    return map
}

export default recursiveGenerator