import mapGenerator, {index} from "../mapGenerator";
import shuffle from "./shuffle";

/**
 * Gets new indexes based on the given index. 
 * [index[0] + 1, index[1]],
 * [index[0] - 1, index[1]],
 * [index[0], index[1] + 1],
 * [index[0], index[1] - 1]
 * @param map The current game map element
 * @param searchIndex The index to use for new indexes
 * @returns A shuffled array of new indexes
 */
const getConnectedIndexes = <T>(map: mapGenerator<T>, searchIndex: index): index[] => {
    const shuffledIndexes: index[] = shuffle([
        [searchIndex[0] + 1, searchIndex[1]],
        [searchIndex[0] - 1, searchIndex[1]],
        [searchIndex[0], searchIndex[1] + 1],
        [searchIndex[0], searchIndex[1] - 1],
    ])

    return shuffledIndexes.filter(el => map.isValidIndex(el))
}

export default getConnectedIndexes