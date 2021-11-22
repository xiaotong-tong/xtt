function getRandomNum(min, max) {
    let number = Math.random() * (max - min + 1) + min
    
    return Math.floor(number);
}

function getNumDuel(min, max, times) {
    let duelNumSet = [];

    for (let i = 0; i < times; i++) {
        duelNumSet.push(getRandomNum(min, max));
    }
    return duelNumSet;
}

module.exports = {
    getRandomNum,
    getNumDuel
}