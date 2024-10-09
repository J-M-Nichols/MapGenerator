import countNeighbors from "../helpers/countNeighbors"
import mapGenerator, { equalityFunctionType, index } from "../mapGenerator"
import getNextMoves from './getNextMoves'
import getConnectedIndexes from './getConnectedIndexes'

/**
 * Walks through the map searching for a possible path at the startIndex then saves the path if it is valid
 * @param map The current game map element
 * @param maxPathSize The maximum size for the path
 * @param startIndex The index that the path begins at
 * @param unwalkableValue A value that denotes a part of the map that cannot be walked on
 * @param possiblePathValue A temporary value that denotes a part of the map that may be the next path
 * @param equalityFunction A function to determine if 2 elements are equal
 * @returns indexes that cannot be connected to the main path
 */
const walk = <T>(map: mapGenerator<T>, maxPathSize:number, startIndex: index, unwalkableValue: T, possiblePathValue: T, equalityFunction: equalityFunctionType<T>) : index[] => {
    //get the next moves for the walk
    let nextMoves = getNextMoves(map, maxPathSize, startIndex, possiblePathValue, equalityFunction)

    //track the paths walked
    const walkedPath: index[][] = []
    const currentPath: index[] = [startIndex]
    const badPath: index[] = []
    let validPath = false
    
    //get connected paths in case the startIndex is also complete
    const conn = getConnectedIndexes(
        map, 
        startIndex, 
        currentPath,
        maxPathSize,
        equalityFunction
    )
    
    //we are connected, finish here
    if(conn.length > 0){
        currentPath.push(conn[0])
        validPath = true
    }
    //we don't have any moves here it is a dead path 
    else if (nextMoves.length === 0) return [startIndex]

    //we have moves to make, search for a path
    let nextMove = nextMoves.splice(0, 1)[0]
    //add the rest of the moves in case our current move is invalid
    walkedPath.push(nextMoves)
    //set the value at this index so it will affect the next move
    map.setValueAtIndex(startIndex, possiblePathValue)

    //continue along the path looking for a valid path
    while(!validPath){
        //see if this new move is connected to the main path
        const conn = getConnectedIndexes(
            map, 
            nextMove, 
            currentPath,
            maxPathSize,
            equalityFunction
        )

        //path has connected, set the path
        if(
            conn.length > 0 &&
            countNeighbors(map, 1, nextMove, equalityFunction, map.getBaseValue(), false) <= maxPathSize
        ){
            currentPath.push(nextMove)
            currentPath.push(conn[0])
            validPath = true
            break
        } 
        
        //path is not connected yet, keep looking for a connection

        //set this as a path so we count it in getNextMoves
        map.setValueAtIndex(nextMove, possiblePathValue)

        //get next moves
        nextMoves = getNextMoves(map, maxPathSize, nextMove, possiblePathValue, equalityFunction)

        //determine if we can move forward or if we should move back
        if(nextMoves.length > 0){
            //we still have moves that we can make, move forward
            currentPath.push(nextMove)
            nextMove = nextMoves.splice(0, 1)[0]
            walkedPath.push(nextMoves)
        } else {
            //We cannot make any more moves on this path, add to badPath and move back
            map.setValueAtIndex(nextMove, unwalkableValue)
            badPath.push(nextMove)

            let foundNewPath = false

            while(!foundNewPath){
                const walkPop = walkedPath.pop()
                
                //we need to do this again if walkPop is not greater than 0
                if(walkPop){
                    if(walkPop.length > 0){
                        //found next move
                        nextMove = walkPop.splice(0, 1)[0]
                        walkedPath.push(walkPop)
                        foundNewPath = true
                    }else{
                        const poppedCurrentPath = currentPath.pop()
                        if(poppedCurrentPath) badPath.push(poppedCurrentPath)
                    }
                }else break
            }

            if(!foundNewPath) break
        }
    }

    if(validPath){
        currentPath.forEach(move=>{
            map.setBaseValueAtIndex(move)
        })
    } else {
        const pathToRemove: index[] = [...currentPath, ...badPath]

        pathToRemove.forEach(move=>{
            map.setValueAtIndex(move, unwalkableValue)
        })
    }

    return badPath
}

export default walk