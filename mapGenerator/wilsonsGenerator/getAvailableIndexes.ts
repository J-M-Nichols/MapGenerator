import countNeighbors from "../helpers/countNeighbors"
import mapGenerator, { index } from "../mapGenerator"
import shuffle from "../helpers/shuffle"
import compareIndexes from "../helpers/compareIndexes"

/**
 * Search through the map and get the shuffled available starting points for the next paths 
 * that are not touching the main path
 * @param map The current game map element
 * @param badPaths The indexes that should be ignored
 * @returns A shuffled index array of the possible starting points for the next path
 */
const getAvailableIndexes = <T>(map: mapGenerator<T>, badPaths: index[]): index[] => {
    let locations: index[] = []

    const height = map.getHeight()
    const width = map.getWidth()

    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            const index: index = [i, j]
            if(!badPaths.some(el=>compareIndexes(el, index)) && countNeighbors(map, 1, index, map.getWalkableValue(), false) === 0){
                locations.push(index)
            }
        }
    }

    return shuffle(locations)
}

export default getAvailableIndexes