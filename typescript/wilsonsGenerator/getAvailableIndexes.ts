import countNeighbors from "../countNeighbors"
import gameMap, { equalityFunctionType, index } from "../gameMap"
import shuffle from "../shuffle"
import compareIndexes from "./compareIndexes"

/**
 * Search through the map and get the shuffled available starting points for the next paths 
 * that are not touching the main path
 * @param map The current game map element
 * @param badPaths The indexes that should be ignored
 * @param equalityFunction A function to determine if 2 elements are equal
 * @returns A shuffled index array of the possible starting points for the next path
 */
const getAvailableIndexes = <T>(map: gameMap<T>, badPaths: index[], equalityFunction: equalityFunctionType<T>): index[] => {
    let locations: index[] = []

    for(let i = 0; i < map.getHeight(); i++){
        for(let j = 0; j < map.getWidth(); j++){
            const index: index = [i, j]
            if(!badPaths.some(el=>compareIndexes(el, index)) && countNeighbors(map, 1, index, equalityFunction, map.getBaseElement(), false) === 0){
                locations.push(index)
            }
        }
    }

    return shuffle(locations)
}

export default getAvailableIndexes