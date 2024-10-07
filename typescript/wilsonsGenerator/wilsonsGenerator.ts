import countNeighbors from "../countNeighbors"
import gameMap, { equalityFunctionType, index } from "../gameMap"
import shuffle from "../shuffle"

let mapLocations: index[] = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
]

const getAvailableCells = <T>(map: gameMap<T>, equalityFunction: equalityFunctionType<T>): index[] => {
    let locations: index[] = []

    for(let i = 0; i < map.getHeight(); i++){
        for(let j = 0; j < map.getWidth(); j++){
            if(countNeighbors(map, 1, [i, j], equalityFunction, false) === 0){
                locations.push([i, j])
            }
        }
    }

    return locations
}

const randomWalk = <T>(map: gameMap<T>,  unusedMapLocations: index[], equalityFunction: equalityFunctionType<T>, loopLimit: number, value: T, validValue: T) => {
    const width: number = map.getWidth()
    const height: number = map.getHeight()
    
    //get a random location from the unused map locations
    let mapLocation: index = unusedMapLocations[Math.floor(Math.random() * unusedMapLocations.length)]

    //start the walk with the random location
    let locationsInWalk : index[] = [mapLocation]

    //prevent excessive looping
    let loop: number = 0

    //track and see if this is a valid path
    let validPath = false

    while (
        mapLocation[0] >= 0 && 
        mapLocation[0] < height && 
        mapLocation[1] >= 0 &&
        mapLocation[1] < width &&
        !validPath &&
        loop++ < loopLimit
    ){
        //mark this location as a walkable path
        map.setValueAtIndex(mapLocation, validValue)

        //count the number of cells with the validValue
        const neighborCount = countNeighbors(map, 1, mapLocation, equalityFunction, false)

        //This is a valid path if we have exactly 1 neighbor
        validPath = neighborCount === 1

        //if we have more than 1 neighbor then move back
        if(neighborCount > 1) break

        //get a random index from the mapLocations
        mapLocations = shuffle(mapLocations)

        let nextLocation: index = [-1, -1]

        mapLocations.every((el)=>{
            nextLocation = [
                mapLocation[0] + el[0],
                mapLocation[1] + el[1],
            ]

            return !map.isValidIndex(nextLocation)
        })


        if(map.isValidIndex(nextLocation) && countNeighbors(map, 1, nextLocation, equalityFunction, false) < 2){
            locationsInWalk.push(mapLocation)
            mapLocation = nextLocation
        }
    }

    if(validPath){
        map.setValueAtIndex(mapLocation, validValue)

        locationsInWalk.forEach(element=>{
            map.setValueAtIndex(element, validValue)
        })
    } else {
        locationsInWalk.forEach(element => {
            map.setValueAtIndex(element, value)
        })
    }
}

const wilsonsGenerator = <T>(map: gameMap<T>, startIndex:index, loopLimit: number, equalityFunction: equalityFunctionType<T>, value: T, validValue: T): void => {
    const width = map.getWidth()
    const height = map.getHeight()

    //fill array with value
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            map.setValueAtIndex([i, j], value)
        }
    }

    map.setValueAtIndex(startIndex, validValue)

    //prevent excesive looping
    let limit = 0

    let lastCount = -1
    let unusedMapLocations:index[] = getAvailableCells(map, equalityFunction)
    let currentCount = unusedMapLocations.length
    randomWalk(map, unusedMapLocations, equalityFunction, loopLimit, value, validValue)
    // while(currentCount > 1 && (limit++ < loopLimit || lastCount!= currentCount)){
    //     lastCount = currentCount

    //     randomWalk(map, unusedMapLocations, equalityFunction, loopLimit, value, validValue)

    //     unusedMapLocations = getAvailableCells(map, equalityFunction)
    //     console.log(unusedMapLocations)
    //     map.logMap()
    //     currentCount = unusedMapLocations.length
    // }

    // for(let i = 0; i < height; i++){
    //     for(let j = 0; j < width; j++){
    //         if(map.isValidIndex([i, j]) && map.getValueAtIndex([i, j]) === validValue) map.setValueAtIndex([i, j], map.getBaseElement())
    //     }
    // }
}

export default wilsonsGenerator