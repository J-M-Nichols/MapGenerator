import { index } from "../gameMap"

/**
 * Compares 2 indexes to see if they are equal.
 * @param indexA A tuple of 2 numbers [number, number]
 * @param indexB A tuple of 2 numbers [number, number]
 * @returns indexA is equal to indexB
 */
const compareIndexes = (indexA: index, indexB: index): boolean => {
    return indexA[0]===indexB[0] && indexA[1]===indexB[1]
}

export default compareIndexes