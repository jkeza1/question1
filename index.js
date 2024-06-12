const fs = require('fs');

function readFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return data.split('\n').map(line => line.trim()).filter(line => line !== '');
    } catch (error) {
        throw new Error(`Error reading file: ${error.message}`);
    }
}

function parseInteger(line) {
    const number = parseInt(line, 10);
    if (isNaN(number) || !Number.isInteger(number) || number < -1023 || number > 1023) {
        throw new Error(`Invalid input: ${line}`);
    }
    return number;
}

function findDuplicates(integers) {
    const duplicates = [];
    const seen = new Set();

    for (const number of integers) {
        if (seen.has(number) && !duplicates.includes(number)) {
            duplicates.push(number);
        } else {
            seen.add(number);
        }
    }

    return duplicates.sort((a, b) => a - b);
}

function writeToFile(filename, data) {
    try {
        fs.writeFileSync(filename, data.join('\n') + '\n');
    } catch (error) {
        throw new Error(`Error writing to file: ${error.message}`);
    }
}

function processFile(inputFilename, outputFilename) {
    try {
        const lines = readFile(inputFilename);
        const integers = lines.map(parseInteger);
        const duplicates = findDuplicates(integers);
        writeToFile(outputFilename, duplicates.map(String));
    } catch (error) {
        console.error(`Error processing file: ${error.message}`);
    }
}

const inputFilename = 'sample_data.txt';
const outputFilename = 'sample_results.txt';
processFile(inputFilename, outputFilename);
