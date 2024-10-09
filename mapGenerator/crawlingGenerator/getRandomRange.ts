/**
 * Generates a random number between the min and max 
 * where the max number is exclusive
 * @param min The minimum number to generate (inclusive)
 * @param max The maximum number to generate (exclusive)
 * @returns A random number between min and (max-1)
 */
const getRandomRange = (min: number, max: number):number => Math.floor(Math.random() * (max - min) + min)

export default getRandomRange