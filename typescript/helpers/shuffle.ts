type shuffleType = <T>(array: T[]) => T[] 

/**
 * Takes in an array, returns a new array with the elements from the array at random indexes.
 * Does not mutate the given array.
 *  
 * @param array array of elements to shuffle
 * @returns a shuffled version of the given array
 */
const shuffle : shuffleType = <T>(array: T[]) : T[] => {
    const shuffledArray: T[] = []
    const copiedArray: T[] = [...array]

    while(copiedArray.length > 0){
        const index : number = Math.floor(Math.random() * copiedArray.length)
        shuffledArray.push(copiedArray.splice(index, 1)[0]) 
    }
    
    return shuffledArray
}

export default shuffle