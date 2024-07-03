const fs = require('fs');
const path = require('path');
const readline = require('readline');

const inputDir = './input';
const outputDir = './output';

fs.readdir(inputDir, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    const inputFilePath = path.join(inputDir, file);
    const outputFilePath = path.join(outputDir, file);

    const rl = readline.createInterface({
      input: fs.createReadStream(inputFilePath)
    });

    let count = 0;
    let output = '';

    rl.on('line', (line) => {
      const modifiedLine = line.replace(/utilize/g, 'use');
      output += modifiedLine + '\n';
      count += (modifiedLine.match(/use/g) || []).length;
    });

    rl.on('close', () => {
      fs.writeFile(outputFilePath, output, (err) => {
        if (err) throw err;
        console.log(`File ${file} processed. Numărul total de înlocuiri: ${count}`);
      });
    });
  });
});
