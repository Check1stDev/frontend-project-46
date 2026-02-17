const genDiff = require('../src/index.js')
const path = require('path')

const getFixturesPath = (filepath) => {
    return path.join(__dirname,'..','__fixtures__',filepath)
}

test ('compares flat json files', () => {
    const file1 = getFixturesPath('file1.json');
    const file2 = getFixturesPath('file2.json');

    const result = genDiff(file1,file2);

    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

expect(result).toBe(expected)
})

