import mapGenerator, { index } from "../../mapGenerator"
import countNeighbors from "../countNeighbors"
import shuffle from "../shuffle"
import isValidHole from './isValidHole'

const fillHoles = <T>(map: mapGenerator<T>, maxPathSize: number):void => {
    //get the dimensions of the map
    const width = map.getWidth()
    const height = map.getHeight()

    let availableIndexes : index[] = []

    //fill the holes left in the map where there is an unwalkable value with a neighbor count that is greater than 0 and less than or equal to the maxPathSize
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            const index: index = [i, j]
            const neighborCount = countNeighbors(map, 1, index, map.getWalkableValue(), false)

            if(map.isIndexUnwalkable(index) && neighborCount > 0 && neighborCount < 3){
                availableIndexes.push(index)
            }
        }
    }

    availableIndexes = shuffle(availableIndexes)

    availableIndexes.forEach(el=>{
        if(isValidHole(map, el)){
            map.setWalkableValueAtIndex(el)
        }  
    })
    
    //fill the holes left in the map where there is an unwalkable value with a neighbor count that is greater than 0 and less than or equal to the maxPathSize
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            const index:index = [i, j]
            const neighborCount = countNeighbors(map, 1, index, map.getWalkableValue(), false)
            if(map.isIndexUnwalkable(index) && neighborCount > 0 && neighborCount <= maxPathSize){
                map.setWalkableValueAtIndex(index)
            }
        }
    }
}

export default fillHoles