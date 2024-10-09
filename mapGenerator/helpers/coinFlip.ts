/**
 * Randomly gets 0 or 1 and returns if it is equal to 0
 * @returns Either true or false
 */
const coinFlip = ():boolean => Math.floor(Math.random() * 2)===0

export default coinFlip