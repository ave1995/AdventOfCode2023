const data =
    `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

function getSumPartNumbersOfEngineSchematic(data) {
    let dataWithoutNewlines = data.replace(/\r\n|\n/g, '');

    const lines = data.trim().split(/\r\n|\n/g);
    // Get the line count
    const maxX = lines.length;
    // Get the line lengths
    const maxY = lines[0].length;

    function* getNeighbors(x, y) {
        // Iterate over neighboring positions
        for (let i = Math.max(0, x - 1); i <= Math.min(x + 1, maxX); i++) {
            for (let j = Math.max(0, y - 1); j <= Math.min(y + 1, maxY); j++) {
                // Exclude the center point itself
                if (i !== x || j !== y) {
                    yield { x: i, y: j };
                }
            }
        }
    }

    // Define a regular expression to capture two groups
    const regex = /(\d+)|([^0-9.])/g;

    // Initialize arrays to store the two groups and their positions
    const numbersGroup = [];
    const symbolsGroup = [];

    // Use the match method to find all matches in the input string
    const matches = [...dataWithoutNewlines.matchAll(regex)];
    // Iterate through matches and populate the two groups with positions
    matches.forEach(match => {
        const [value, numbers, symbols] = match;

        const positions = [];

        for (let i = 0; i < value.length; i++) {
            const pos = match.index + i;
            const position = {
                x: Math.floor(pos / maxX),
                y: pos % maxY
            }
            positions.push(position);
        }
        if (numbers) {
            numbersGroup.push({ number: parseInt(numbers, 10), positions: positions });
        } else if (symbols) {
            for (const position of positions) {
                const { x, y } = position;
                const neighborsGenerator = getNeighbors(x, y);
                for (const neighbor of neighborsGenerator) {
                    symbolsGroup.push(neighbor);
                }
            }
        }
    });

    console.log('Numbers Group:', numbersGroup);
    console.log('Symbols Group:', symbolsGroup);

    let foundNumbers = 0;

    for (let i = 0; i < numbersGroup.length; i++) {
        const { number, positions } = numbersGroup[i];
        console.log(`Checking number ${number}:`);

        // Iterate through each position associated with the number
        for (const position of positions) {
            // Check if the position exists in the Symbols Group
            const existsInSymbols = symbolsGroup.some(symbol => symbol.x === position.x && symbol.y === position.y);

            if (existsInSymbols) {
                console.log(`  Position ${JSON.stringify(position)} exists in Symbols Group`);

                // Remove the number from the Numbers Group and add it to the foundNumbers array
                const removedNumber = numbersGroup.splice(i, 1)[0]; // Splice returns an array, so we take the first (and only) element
                foundNumbers += removedNumber.number;

                // Decrement i to account for the removed element
                i--;

                // Break out of the loop since we found a match
                break;
            }
        }
    }

    console.log(foundNumbers);
}

//getSumPartNumbersOfEngineSchematic(data);

const fs = require('fs');
const filePath = 'Day3/input.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    getSumPartNumbersOfEngineSchematic(data);
});