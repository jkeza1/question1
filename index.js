const fs = require('fs');
const readline = require('readline');

function readIntegersFromFile(filename) {
    return new Promise((resolve, reject) => {
        const integers = [];
        const rl = readline.createInterface({
            input: fs.createReadStream(filename),
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            const strippedLine = line.trim();
            const parts = strippedLine.split(/\s+/);
            if (parts.length !== 1) {
                return;
            }
            try {
                const number = parseInt(parts[0], 10);
                if (!isNaN(number)) {
                    integers.push(number);
                }
            } catch (error) {
                // Skip lines that don't contain a valid integer
            }
        });

        rl.on('close', () => {
            resolve(integers);
        });

        rl.on('error', (error) => {
            reject(error);
        });
    });
}

function findDuplicates(integers) {
    const seen = new Set();
    const duplicates = new Set();
    for (const number of integers) {
        if (seen.has(number)) {
            duplicates.add(number);
        } else {
            seen.add(number);
        }
    }
    return Array.from(duplicates).sort((a, b) => a - b);
}

function writeDuplicatesToFile(duplicates, outputFilename) {
    const fileContent = duplicates.join('\n') + '\n';
    fs.writeFileSync(outputFilename, fileContent);
}

async function processFile(inputFilename, outputFilename) {
    try {
        const integers = await readIntegersFromFile(inputFilename);
        const duplicates = findDuplicates(integers);
        writeDuplicatesToFile(duplicates, outputFilename);
    } catch (error) {
        console.error(`Error processing file: ${error.message}`);
    }
}

// Example usage
const inputFilename = 'sample_data.txt';
const outputFilename = 'result.txt'; // Changed the output filename here
processFile(inputFilename, outputFilename);

