import shuffle from '../typescript/helpers/shuffle'

const numbArray:number[] = [
    0,
    1,
    2,
    3,
    4,
    5
]

const stringArray:string[] = [
    'hello',
    'world, ',
    'how',
    'are',
    'you',
    'doing?'
]

describe('shuffle', ()=>{
    test('should return shuffled array', ()=>{
        const shuffledArray = shuffle(numbArray)

        let isPerfectCopy = true

        shuffledArray.forEach((value:number, index:number)=>{
            if(value!==numbArray[index]) {
                isPerfectCopy=false
                return
            }
        })

        expect(isPerfectCopy).toBe(false)
    })

    test('should not mutate original', ()=>{
        const original = [...stringArray]
        shuffle(stringArray)

        const originalReduced = original.reduce((prev:string, curr:string)=>{
            return prev + curr
        }, '')

        const stringReduced = stringArray.reduce((prev:string, curr:string)=>{
            return prev + curr
        }, '')

        expect(originalReduced).toBe(stringReduced)
    })
})