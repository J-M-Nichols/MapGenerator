import map, {index, equalityFunctionType} from './gameMap'

/**
 * Counts the neighbors with a certain value around the index.
 * If range is less than 1, set the range to the maximum
 * Index must be within the bounds of the width and height for multArray
 * countDiagonals will count at index +[1, 1], -[1, 1], +[1, -1], -[1, -1] when true 
 * @param map map<T>
 * @param range number
 * @param index index
 * @param equalityFunction equalityFunctionType<T>
 * @param countDiagonals boolean
 * @returns number
 */
const countNeighbors = <T>(map: map<T>, range : number, index : index, equalityFunction : equalityFunctionType<T>, countedValue: T, countDiagonals: boolean = false): number => {
    const multArray:T[][] = map.getMultArray() 
    
    //get multArray dimensions
    const height : number = map.getHeight()
    const width : number = map.getWidth()

    if(range < 1) range = width > height ? width : height

    //ensure our indexes are within range
    if(index[0] < 0 || index[0] >= height) return 5//throw new Error(`Expected rowIndex to be greater than or equal to 0 and less than or equal to ${height}. Found : ${index[0]}`)
    if(index[1] < 0 || index[1] >= width) return 5//throw new Error(`Expected columnIndex to be greater than or equal to 0 and less than or equal to ${width}. Found : ${index[1]}`)

    //initialize count
    let count = 0
    
    //search the neighbors in the multArray and add to count if equality function is true
    for(let i = -range; i <= range; i++){//row
        for(let j = -range; j <= range; j++){//column
            if((i===0 && j===0) || (Math.abs(i)===Math.abs(j) && !countDiagonals)) continue
            
            const newRowIndex = index[0] + i
            const newColumnIndex = index[1] + j
            
            if((newRowIndex >= 0 && newRowIndex < height && newColumnIndex >= 0 && newColumnIndex < width) && equalityFunction(multArray[newRowIndex][newColumnIndex], countedValue)) count++
        }
    }

    return count
}

export default countNeighbors