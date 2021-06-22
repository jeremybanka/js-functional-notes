const x = process.argv[2]
const y = process.argv[3]
const z = process.argv[4]
const n = parseInt(process.argv[2])

const reverse = string =>
  string === `` ? `` : reverse(string.substring(1)) + string[0]

const reverseSafe = string =>
  string === `` ? `` : () => reverse(string.substring(1)) + string[0]

const nthTriangleNumberUnsafe = (n, sum = 0) =>
  n === 0
    ? sum
    : nthTriangleNumberUnsafe(n - 1, sum + n)

const nthTriangleNumber = (n, sum = 0) =>
  n === 0
    ? sum
    : () => nthTriangleNumber(n - 1, sum + n)
    
const trampoline = recursiveFunction =>
  ((...args) => {
    let result = recursiveFunction(...args)
    while (result.call) result = result()
    return result
  })()

const countCoins = valueOfCoin => {
  const recursiveFunction = (centsRemaining, totalCoins = 0) =>
    centsRemaining >= valueOfCoin
      ? () => recursiveFunction(centsRemaining - valueOfCoin, totalCoins++)
      : totalCoins
  return recursiveFunction
}

console.log(trampoline(nthTriangleNumber(n)))

/*
. . . .
 . . .
  . .
   .
*/
