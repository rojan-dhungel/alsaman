const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const workbook = XLSX.readFile('/Users/rojandhungel/Desktop/alsaman/allsaman.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(worksheet);

fs.writeFileSync(
  path.join(__dirname, 'allsaman.json'), 
  JSON.stringify(jsonData, null, 1)
);

console.log(`Successfully converted ${jsonData.length} rows to allsaman.json`);
