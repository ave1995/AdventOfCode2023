const data = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const CubesRules = {
    RED: 12,
    GREEN: 13,
    BLUE: 14,
}

function getIDsCountOfValidGames(data) {
    const lines = data.split(/\r\n|\n/);
    let result = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const game = line.split(": ")[1].split("; ").map(x => {
            const result = {
                red: 0,
                green: 0,
                blue: 0
            }
            const objects = x.split(", ");
            for (const object of objects) {
                if (object.endsWith("red")) result.red = parseInt(object.split(" ")[0]);
                if (object.endsWith("green")) result.green = parseInt(object.split(" ")[0]);
                if (object.endsWith("blue")) result.blue = parseInt(object.split(" ")[0]);
            }

            return result;
        });

        const redMax = Math.max(...game.map(x => x.red));
        const greenMax = Math.max(...game.map(x => x.green));
        const blueMax = Math.max(...game.map(x => x.blue));

        if (redMax <= CubesRules.RED && greenMax <= CubesRules.GREEN && blueMax <= CubesRules.BLUE)
            result += i + 1;
    }

    console.log(result);
}

getIDsCountOfValidGames(data);

const fs = require('fs');
const filePath = 'Day2/input.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    getIDsCountOfValidGames(data);
});