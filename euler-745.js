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

const num = true ? 3 : 4 // 3

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

const checkSquareFactorsOfNumber = number => {
  const recursiveFactorChecker = upperLimitSquareRoot => {
    // console.log(recursiveFactorChecker)
    const maybeSquareFactor = upperLimitSquareRoot ** 2
    const remainder = number % maybeSquareFactor
    const isSquareFactor = remainder === 0
    return isSquareFactor
      ? maybeSquareFactor
      : () => recursiveFactorChecker(upperLimitSquareRoot - 1)
  }
  return recursiveFactorChecker
}

const getHighestSquareFactor = number => {
  const root = Math.sqrt(number)
  const numberIsSquare = root % 1 === 0
  const recursiveFactorChecker = checkSquareFactorsOfNumber(number)
  return numberIsSquare
    ? number
    : trampoline(recursiveFactorChecker(Math.floor(root)))
}

const trampoline = recursiveFunction =>
  ((...args) => {
    console.log(recursiveFunction, typeof recursiveFunction)
    let result = recursiveFunction(...args)
    while (result.call) result = result()
    return result
  })()

const sumOfSquares = number => {
  let sum = 0
  for (let i = 1; i <= number; i++) {
    sum += getHighestSquareFactor(i)
  }
  return sum
}

console.log(getHighestSquareFactor(n))
