function randomBetween(array) {
    const randomizedIndex = Math.floor(Math.random() * (array.length))
    return array[randomizedIndex]
}

module.exports = randomBetween