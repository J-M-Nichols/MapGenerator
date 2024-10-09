import getConnectedIndexes from "../helpers/getConnectedIndexes";
import mapGenerator, { index } from "../mapGenerator";

/**
 * Gets new indexes based on the given index for Prims
 * @param map The current game map element
 * @param searchIndex The index to use for new indexes
 * @param baseValue A value that denotes a part of the map that cannot be walked on
 * @param equalityFunction A function to determine if 2 elements are equal
 * @returns A shuffled array of new indexes
 */
const getNewIndexes = <T>(map: mapGenerator<T>, searchIndex: index, currentLocations: index[], baseValue: T):index[] => {
    return getConnectedIndexes(map, searchIndex).filter(el=>{        
        return !currentLocations.includes(el) && !map.isValueAtIndexEqualToValue(el, baseValue)
    })
}

export default getNewIndexes