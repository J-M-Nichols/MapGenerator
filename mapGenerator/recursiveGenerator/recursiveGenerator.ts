import countNeighbors from '../helpers/countNeighbors'
import mapGenerator, {index} from '../mapGenerator'
import getConnectedIndexes from '../helpers/getConnectedIndexes'

/**
 * Walks through the map's multArray and and assigns a walkable path
 * @param map The current game map element
 * @param maxPathSize The maximun size of the path
 * @param startIndex The index to start the path at
 * @returns The map with the current path walked
 */
const recursiveGenerator = <T>(map: mapGenerator<T>, maxPathSize: number, startIndex: index):mapGenerator<T> =>{
    //we cannot move to this index, do not continue
    if(countNeighbors(map, 1, startIndex, map.getWalkableValue(), false) > maxPathSize) return map
    
    //we can move at this index, set the value
    map.setWalkableValueAtIndex(startIndex)
    
    //recursively add to the path
    getConnectedIndexes(map, startIndex).forEach(element=>{
        map = recursiveGenerator(map, maxPathSize, element)
    })

    //return the current path
    return map
}

export default recursiveGenerator