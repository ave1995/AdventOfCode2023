function getDigit(line) {
    const numbers = line.match(/\d/g);
    if (!numbers.length > 0) {
        return 0;
    }

    if (numbers.count === 1) {
        return parseInt(`${numbers[0]}${numbers[0]}`, 10);
    }

    return parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`, 10);
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

