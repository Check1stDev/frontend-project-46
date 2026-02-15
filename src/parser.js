const fs = require('fs');
const path = require('path');


function parseFilepath(filepath) {
  const absPath = path.resolve(process.cwd(), filepath);
  const ext = path.extname(absPath);
  const content = fs.readFileSync(absPath, 'utf-8');
  if (ext !== '.json') {
    throw new Error(`Unsupported file format: ${ext}`);
  }
  const data = JSON.parse(content);
  return data;
}

module.exports = parseFilepath;