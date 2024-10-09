import mapGenerator, { index } from "../../mapGenerator"

/**
 * Determines if the search index has a base value below and above and not left or right and vice versa
 * @param map The current game map element
 * @param searchIndex The index to search on
 * @returns If this is a valid hole or not
 */
const isValidHole = <T>(map: mapGenerator<T>, searchIndex: index):boolean => {
    const searchIndexes: index[] = [
        [searchIndex[0]+1, searchIndex[1]],
        [searchIndex[0]-1, searchIndex[1]],
        [searchIndex[0], searchIndex[1]+1],
        [searchIndex[0], searchIndex[1]-1],
    ]
    
    //has base value above
    let hasValAbove: boolean = map.isValidIndex(searchIndexes[0]) ? 
        map.isIndexWalkable(searchIndexes[0])
        : true

    //has base value below
    let hasValBelow: boolean = map.isValidIndex(searchIndexes[1]) ? 
        map.isIndexWalkable(searchIndexes[1])
        : true

    //has base value right
    let hasValRight: boolean = map.isValidIndex(searchIndexes[2]) ? 
        map.isIndexWalkable(searchIndexes[2])
        : true

    //has base value left
    let hasValLeft: boolean = map.isValidIndex(searchIndexes[3]) ? 
        map.isIndexWalkable(searchIndexes[3])
        : true

    const vert = hasValAbove && hasValBelow && !(hasValLeft || hasValRight)
    const hori = hasValLeft && hasValRight && !(hasValAbove || hasValBelow)

    return vert || hori
}

export default isValidHole