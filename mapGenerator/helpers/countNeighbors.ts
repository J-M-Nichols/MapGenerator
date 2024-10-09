import map, {index} from '../mapGenerator'

/**
 * Counts the neighbors with a certain value around the index.
 * If range is less than 1, set the range to the maximum
 * Index must be within the bounds of the width and height for multArray
 * countDiagonals will count at index +[1, 1], -[1, 1], +[1, -1], -[1, -1] when true 
 * @param map The current game map element
 * @param range The maximum size of the path
 * @param searchIndex The index to count neighbors at
 * @param countedValue The value to count with
 * @param countDiagonals If it should count diagonal indexes
 * @returns The number of indexes around the searchIndex with a value of countedValue
 */
const countNeighbors = <T>(map: map<T>, range : number, searchIndex : index, countedValue: T, countDiagonals: boolean = false): number => {
    //get multArray dimensions
    const height : number = map.getHeight()
    const width : number = map.getWidth()

    if(range < 1) range = width > height ? width : height

    //ensure our indexes are within range
    if(!map.isValidIndex(searchIndex)) return 5

    //initialize count
    let count = 0
    
    //search the neighbors in the multArray and add to count if equality function is true
    for(let i = -range; i <= range; i++){//row
        for(let j = -range; j <= range; j++){//column
            if((i===0 && j===0) || (Math.abs(i)===Math.abs(j) && !countDiagonals)) continue
            
            const index: index = [
                searchIndex[0] + i,
                searchIndex[1] + j
            ]
            
            if(map.isValidIndex(index) && map.isValueAtIndexEqualToValue(index, countedValue)) count++
        }
    }

    return count
}

export default countNeighbors