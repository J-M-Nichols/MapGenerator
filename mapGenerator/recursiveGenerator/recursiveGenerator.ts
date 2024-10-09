import countNeighbors from '../helpers/countNeighbors'
import mapGenerator, {index, equalityFunctionType} from '../mapGenerator'
import shuffle from '../helpers/shuffle'

/**
 * Walks through the map's multArray and and assigns a walkable path
 * @param map The current game map element
 * @param startIndex The index to start generating a path at
 * @param baseValue The value of a walkable area
 * @param equalityFunction A function to determine if 2 values are equal
 * @returns The map with the current path walked
 */
const recursiveGenerator = <T>(map: mapGenerator<T>, maxPathSize: number, startIndex: index, baseValue: T, equalityFunction: equalityFunctionType<T>):mapGenerator<T> =>{
    //we cannot move to this index, do not continue
    if(countNeighbors(map, 1, startIndex, equalityFunction, baseValue, false) > maxPathSize) return map
    
    //we can move at this index, set the value
    map.setValueAtIndex(startIndex, baseValue)

    //get the next moves that can be walked along
    const nextMoves:index[] = shuffle<index>([
        [1 + startIndex[0], 0 + startIndex[1]],
        [0 + startIndex[0], 1 + startIndex[1]],
        [-1 + startIndex[0], 0 + startIndex[1]],
        [0 + startIndex[0], -1 + startIndex[1]]
    ])

    //recursively add to the path
    nextMoves.forEach(element=>{
        map = recursiveGenerator(map, maxPathSize, element, baseValue, equalityFunction)
    })

    //return the current path
    return map
}

export default recursiveGenerator