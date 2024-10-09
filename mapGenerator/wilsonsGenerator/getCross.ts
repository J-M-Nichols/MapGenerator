import mapGenerator, { index } from "../mapGenerator"
import shuffle from "../helpers/shuffle"

/**
 * Gets a shuffled and filtered index array that is 1 + x,y and 1 - x,y filtered by elements that are within the bounds of the map
 * @param map The current game map element
 * @param index The index to search at
 * @returns A shuffled and filtered index array where the new indexes are within the bounds of the map
 */
const getCross = <T>(map: mapGenerator<T>, index: index): index[] => {
    const nextMoves : index[] = [
        [1 +  index[0], 0 +  index[1]],
        [0 +  index[0], 1 +  index[1]],
        [-1 + index[0], 0 +  index[1]],
        [0 +  index[0], -1 + index[1]]
    ]

    return shuffle(nextMoves.filter(el=>map.isValidIndex(el)))
}

export default getCross