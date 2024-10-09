import gameMap, { equalityFunctionType, index } from "../../gameMap"

/**
 * Determines if the search index has a base value below and above and not left or right and vice versa
 * @param map The current game map element
 * @param searchIndex The index to search on
 * @param equalityFunction A function to determine if 2 elements are equal
 * @returns If this is a valid hole or not
 */
const isValidHole = <T>(map: gameMap<T>, searchIndex: index, equalityFunction: equalityFunctionType<T>):boolean => {
    const searchIndexes: index[] = [
        [searchIndex[0]+1, searchIndex[1]],
        [searchIndex[0]-1, searchIndex[1]],
        [searchIndex[0], searchIndex[1]+1],
        [searchIndex[0], searchIndex[1]-1],
    ]
    
    //has base value above
    let hasValAbove: boolean = map.isValidIndex(searchIndexes[0]) ? 
        equalityFunction(map.getValueAtIndex(searchIndexes[0]), map.getBaseValue())
        : true

    //has base value below
    let hasValBelow: boolean = map.isValidIndex(searchIndexes[1]) ? 
        equalityFunction(map.getValueAtIndex(searchIndexes[1]), map.getBaseValue())
        : true

    //has base value right
    let hasValRight: boolean = map.isValidIndex(searchIndexes[2]) ? 
        equalityFunction(map.getValueAtIndex(searchIndexes[2]), map.getBaseValue())
        : true

    //has base value left
    let hasValLeft: boolean = map.isValidIndex(searchIndexes[3]) ? 
        equalityFunction(map.getValueAtIndex(searchIndexes[3]), map.getBaseValue())
        : true

    const vert = hasValAbove && hasValBelow && !(hasValLeft || hasValRight)
    const hori = hasValLeft && hasValRight && !(hasValAbove || hasValBelow)

    return vert || hori
}

export default isValidHole