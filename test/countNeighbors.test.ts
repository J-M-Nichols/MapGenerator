import { boolean, number } from 'yargs'
import countNeighbors, {equalityFunctionType} from '../typescript/countNeighbors'
import gameMap from '../typescript/gameMap'

const baseEqualityFunction : equalityFunctionType<number> = (element: number): boolean => {
    return element === 1
}

/**
 * 7x7
 * should always return 0
 */
const zeroMultArray:gameMap<number> = new gameMap(7, 7, 0)

/**
 * 5x5
 * Should return 8 with countDiagonals - range 1
 * Should return 4 without countDiagonals - range 1
 * Should return 24 with countDiagonals - range 2
 * Should return 16 without countDiagonals - range 2
 */
const oneMultArray:gameMap<number> = new gameMap(7, 7, 1)

/**
 * 3x3
 * Should return 3 with countDiagonals - range 1
 * Should return 1 without countDiagonals - range 1
 */
const variedArray:gameMap<number> = new gameMap(3, 3, 0)
variedArray.setValueAtIndex([0, 1], 1)
variedArray.setValueAtIndex([0, 2], 1)
variedArray.setValueAtIndex([2, 0], 1) 

type objType = {
    value: number,
    key: string
}

type objectEqualityFunctionType = (obj: objType) => boolean

const baseObject:objType = {
    value: 0,
    key: 'value'
}

const changedObject:objType = {
    value: 1,
    key: 'value'
} 

/**
 * 3x3
 * Should return 3 with countDiagonals - range 1
 * Should return 1 without countDiagonals - range 1
 */
const objectArray:gameMap<objType> = new gameMap(3, 3, baseObject) 
objectArray.setValueAtIndex([0, 1], changedObject)
objectArray.setValueAtIndex([0, 2], changedObject)
objectArray.setValueAtIndex([2, 0], changedObject) 

const objectEqualityFunction: objectEqualityFunctionType = (obj:objType):boolean => {
    return obj.value===1
}

describe('countNeighbors', ()=>{
    //#region zeroMultArray
    test('Should return 0 for the zeroMultArray with range 1', ()=>{
        const countOne = countNeighbors(zeroMultArray, 1, [3, 3], baseEqualityFunction, true)
        expect(countOne).toBe(0)
    })
    
    test('Should return 0 for the zeroMultArray with range 2', ()=>{
        const countTwo = countNeighbors(zeroMultArray, 2, [3, 3], baseEqualityFunction, true)
        expect(countTwo).toBe(0)
    })
    
    test('Should return 0 for the zeroMultArray with range 3', ()=>{
        const countThree = countNeighbors(zeroMultArray, 3, [3, 3], baseEqualityFunction, true)
        expect(countThree).toBe(0)
    })

    test('Should still work and return 0 for the zerMultArray when bad values are given with range 5',()=>{
        const count = countNeighbors(zeroMultArray, 5, [0, 0], baseEqualityFunction, true)
        expect(count).toBe(0)
    })
    //#endregion

    //#region oneMultArray
    test('Should return 8 for the oneMultArray',()=>{
        const count8 = countNeighbors(oneMultArray, 1, [2, 2], baseEqualityFunction, true)
        expect(count8).toBe(8)
    })

    test('Should return 4 for the oneMultArray',()=>{
        const count4 = countNeighbors(oneMultArray, 1, [2, 2], baseEqualityFunction, false)
        expect(count4).toBe(4)
    })

    test('Should return 24 for the oneMultArray',()=>{
        const count24 = countNeighbors(oneMultArray, 2, [2, 2], baseEqualityFunction, true)
        expect(count24).toBe(24)
    })

    test('Should return 16 for the oneMultArray',()=>{
        const count16 = countNeighbors(oneMultArray, 2, [2, 2], baseEqualityFunction, false)
        expect(count16).toBe(16)
    })

    test('Should return 48 for the oneMultArray with full range',()=>{
        const edgeCase = countNeighbors(oneMultArray, 7, [0, 0], baseEqualityFunction, true)
        expect(edgeCase).toBe(48)
    })

    test('Should return 48 for the oneMultArray with no range',()=>{
        const edgeCase = countNeighbors(oneMultArray, 0, [3, 3], baseEqualityFunction, true)
        expect(edgeCase).toBe(48)
    })
    //#endregion

    //#region varriedArray
    test('Should return 3 for the varriedArray with range 1', ()=>{
        const count = countNeighbors(variedArray, 1, [1, 1], baseEqualityFunction, true)
        expect(count).toBe(3)
    })

    test('Should return 3 for the varriedArray with range 0', ()=>{
        const count = countNeighbors(variedArray, 0, [1, 1], baseEqualityFunction, true)
        expect(count).toBe(3)
    })

    test('Should return 3 for the varriedArray with range 10', ()=>{
        const count = countNeighbors(variedArray, 10, [1, 1], baseEqualityFunction, true)
        expect(count).toBe(3)
    })
    //#endregion

    //#region objectArray
    test('Should return 3 for the varriedArray with range 1', ()=>{
        const count = countNeighbors(objectArray, 1, [1, 1], objectEqualityFunction, true)
        expect(count).toBe(3)
    })

    test('Should return 3 for the varriedArray with range 0', ()=>{
        const count = countNeighbors(objectArray, 0, [1, 1], objectEqualityFunction, true)
        expect(count).toBe(3)
    })

    test('Should return 3 for the varriedArray with range 10', ()=>{
        const count = countNeighbors(objectArray, 10, [1, 1], objectEqualityFunction, true)
        expect(count).toBe(3)
    })
    //#endregion
})