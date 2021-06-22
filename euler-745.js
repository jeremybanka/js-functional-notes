//https://blog.logrocket.com/using-trampolines-to-manage-large-recursive-loops-in-javascript-d8c9db095ae3/
const x = process.argv[2]
const y = process.argv[3]
const z = process.argv[4]
const n = parseInt(x, 10)

// g(n)
// For a given number n
// Find largest square s where n % s === 0

// S(N) run g(n) from n = 1 to n = N, add them all

// S(10)
// g(1) + g(2) + g(2) ... + g(10)
// 1 1 1 4 1 1 1 4 9 1

const checkDivisibilityBySquares = (number, upperLimitSquareRoot) => {
  let highestSquare = 1
  while (upperLimitSquareRoot > 1) {
    const squaredNumber = upperLimitSquareRoot ** 2
    const remainder = number % squaredNumber
    if (remainder === 0) {
      highestSquare = squaredNumber
      break
    }
    --upperLimitSquareRoot
  }
  return highestSquare
}

const createRecursiveFactorChecker = number => {
  const recursiveFactorChecker = upperLimitSquareRoot => {
    const maybeSquareFactor = upperLimitSquareRoot ** 2
    const rem = number % maybeSquareFactor
    const isSquareFactor = rem === 0
    return isSquareFactor
      ? maybeSquareFactor
      : () => recursiveFactorChecker(upperLimitSquareRoot - 1)
  }
  return recursiveFactorChecker
}

const trampoline = recursiveFunction =>
  (...args) => {
    let result = recursiveFunction(...args)
    while (typeof result === `function`) result = result()
    return result
  }

// const factorChecker = trampoline(recursiveFactorChecker)
// console.log(factorChecker(n))

const getHighestSquareFactor = number => {
  console.log(`number`, number)
  const root = Math.sqrt(number)
  const numberIsSquare = root % 1 === 0
  const recursiveFactorChecker = createRecursiveFactorChecker(number)
  const factorChecker = trampoline(recursiveFactorChecker)
  return numberIsSquare
    ? number
    : factorChecker(Math.floor(root))
}

const sumOfSquaresLoop = numberLimit => {
  let sum = 0
  for (let i = 1; i <= numberLimit; i++) {
    const squareFactor = getHighestSquareFactor(i)
    sum += squareFactor
  }
  return sum
}

const sumOfSquaresRec = (number, sum = 0) =>
  number
    ? () => sumOfSquaresRec(number - 1, sum + getHighestSquareFactor(number))
    : sum

const sumOfSquares = trampoline(sumOfSquaresRec)

// console.log(factorChecker(n))


// for (let i = 9; i <= 10; i++) {
//   console.log(`number input: ${i}`)
//   console.log(getHighestSquareFactor(i))
// }

console.log(sumOfSquares(n))
// console.log(getHighestSquareFactor(n))
// 1
// 2 x
// 3 x
// 4 
// 5
// 6
// 7
// 8 x
// 9
// 10