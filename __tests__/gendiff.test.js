const genDiff = require('../src/index.js')
const parseFilepath = require ('../src/parser.js');
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

test ('compares flat yaml files', () => {
    const file1 = getFixturesPath('file1.yml');
    const file2 = getFixturesPath('file2.yml');

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
});

test ('test parser json', () => {
    const file = getFixturesPath('file1.json');

    const result = parseFilepath(file);

    const expected = {
        host: 'hexlet.io',
        timeout: 50,
        proxy: '123.234.53.22',
        follow: false,
        }

expect(result).toEqual(expected)
});

test ('test parser yml', () => {
    const file = getFixturesPath('file1.yml');

    const result = parseFilepath(file);

    const expected = {
        host: 'hexlet.io',
        timeout: 50,
        proxy: '123.234.53.22',
        follow: false,
        }

expect(result).toEqual(expected)
});