const DigitsEnum = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

const numbersArray = Object.keys(DigitsEnum);
const regex = new RegExp(`(?=(${numbersArray.join('|')}|\\d))`, 'g');

function getDigit(line) {
    let matches = [];
    let m;

    while ((m = regex.exec(line)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            if (groupIndex === 1) {
                matches.push(match);
            }
        });
    }

    const result = parseInt(`${convertEnumToDigit(matches[0])}${convertEnumToDigit(matches[matches.length - 1])}`, 10);
    return result;
}

function convertEnumToDigit(value) {
    if (!isNaN(value)) {
        return value;
    }

    return DigitsEnum[value];
}

const fs = require('fs');
const filePath = 'Day1/input.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let sum = 0;
    const lines = data.split('\n');

    lines.forEach((line) => {
        const result = getDigit(line);
        sum += result;
    });
    console.log(sum);
});


