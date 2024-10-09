import gameMap, { equalityFunctionType, index } from "../../gameMap"
import countNeighbors from "../countNeighbors"
import shuffle from "../shuffle"
import isValidHole from './isValidHole'

const fillHoles = <T>(map: gameMap<T>, maxPathSize: number, unwalkableValue: T, equalityFunction: equalityFunctionType<T>):void => {
    //get the dimensions of the map
    const width = map.getWidth()
    const height = map.getHeight()

    let availableIndexes : index[] = []

    //fill the holes left in the map where there is an unwalkable value with a neighbor count that is greater than 0 and less than or equal to the maxPathSize
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            const index: index = [i, j]
            const valueAtIndex = map.getValueAtIndex(index)
            const neighborCount = countNeighbors(map, 1, index, equalityFunction, map.getBaseValue(), false)

            if(equalityFunction(valueAtIndex, unwalkableValue) && neighborCount > 0 && neighborCount < 3){
                availableIndexes.push(index)
            }
        }
    }

    availableIndexes = shuffle(availableIndexes)

    availableIndexes.forEach(el=>{
        if(isValidHole(map, el, equalityFunction)){
            map.setBaseValueAtIndex(el)
        }  
    })
    
    //fill the holes left in the map where there is an unwalkable value with a neighbor count that is greater than 0 and less than or equal to the maxPathSize
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            const index:index = [i, j]
            const neighborCount = countNeighbors(map, 1, index, equalityFunction, map.getBaseValue(), false)
            if(equalityFunction(map.getValueAtIndex(index), unwalkableValue) && neighborCount > 0 && neighborCount <= maxPathSize){
                map.setBaseValueAtIndex(index)
            }
        }
    }
}

export default fillHoles