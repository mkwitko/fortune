export const RandomNumbers = () => {
  return {
    getRandomNumber: (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    getRandomNumbers: (min: number, max: number, quantity: number) => {
      const numbers = []
      for (let i = 0; i < quantity; i++) {
        numbers.push(Math.floor(Math.random() * (max - min + 1)) + min)
      }
      return numbers
    },
  }
}
