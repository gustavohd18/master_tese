import fs from 'fs';

export function writeToCSV(text) {
  const csvText = `text\n${text}\n`;
  fs.writeFile('output.csv', csvText, function (err) {
    if (err) throw err;
    console.log('Text written to CSV file');
  });
}
