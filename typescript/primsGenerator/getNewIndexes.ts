import gameMap, { equalityFunctionType, index } from "../gameMap";
import shuffle from "../helpers/shuffle";

/**
 * Gets new indexes based on the given index. 
 * [index[0] + 1, index[1]],
 * [index[0] - 1, index[1]],
 * [index[0], index[1] + 1],
 * [index[0], index[1] - 1]
 * @param map The current game map element
 * @param index The index to use for new indexes
 * @param baseValue A value that denotes a part of the map that cannot be walked on
 * @param equalityFunction A function to determine if 2 elements are equal
 * @returns A shuffled array of new indexes
 */
const getNewIndexes = <T>(map: gameMap<T>, index: index, currentLocations: index[], baseValue: T, equalityFunction: equalityFunctionType<T>):index[] => {
    const shuffledIndexes: index[] = shuffle([
        [index[0] + 1, index[1]],
        [index[0] - 1, index[1]],
        [index[0], index[1] + 1],
        [index[0], index[1] - 1],
    ])
    
    return shuffledIndexes.filter(el=>{        
        return map.isValidIndex(el) && !currentLocations.includes(el) && !equalityFunction(map.getValueAtIndex(el), baseValue)
    })
}

export default getNewIndexes