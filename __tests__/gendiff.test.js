import path from 'path';
import genDiff from '../src/index.js';
import parseFilepath from '../src/parser.js';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

test ('compares flat new json files', () => {
    const file1 = getFixturesPath('file1new.json');
    const file2 = getFixturesPath('file2new.json');

    const result = genDiff(file1,file2);

    const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

expect(result).toBe(expected)
})

test ('compares flat new yaml files', () => {
    const file1 = getFixturesPath('file1new.yml');
    const file2 = getFixturesPath('file2new.yml');

    const result = genDiff(file1,file2);

    const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

expect(result).toBe(expected)
})


test ('test plain formatter', () => {
    const file1 = getFixturesPath('file1new.yml');
    const file2 = getFixturesPath('file2new.yml');

    const result = genDiff(file1,file2, 'plain');

    const expected = 
    `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

expect(result).toBe(expected)
})

test ('test json formatter', () => {
    const file1 = getFixturesPath('file1new.yml');
    const file2 = getFixturesPath('file2new.yml');

    const result = genDiff(file1,file2, 'json');

    const expected = 
    `[
    {
        "key": "common",
        "type": "nested",
        "children": [
            {
                "key": "follow",
                "type": "added",
                "value": false
            },
            {
                "key": "setting1",
                "type": "unchanged",
                "value": "Value 1"
            },
            {
                "key": "setting2",
                "type": "removed",
                "value": 200
            },
            {
                "key": "setting3",
                "type": "changed",
                "before": true,
                "after": null
            },
            {
                "key": "setting4",
                "type": "added",
                "value": "blah blah"
            },
            {
                "key": "setting5",
                "type": "added",
                "value": {
                    "key5": "value5"
                }
            },
            {
                "key": "setting6",
                "type": "nested",
                "children": [
                    {
                        "key": "doge",
                        "type": "nested",
                        "children": [
                            {
                                "key": "wow",
                                "type": "changed",
                                "before": "",
                                "after": "so much"
                            }
                        ]
                    },
                    {
                        "key": "key",
                        "type": "unchanged",
                        "value": "value"
                    },
                    {
                        "key": "ops",
                        "type": "added",
                        "value": "vops"
                    }
                ]
            }
        ]
    },
    {
        "key": "group1",
        "type": "nested",
        "children": [
            {
                "key": "baz",
                "type": "changed",
                "before": "bas",
                "after": "bars"
            },
            {
                "key": "foo",
                "type": "unchanged",
                "value": "bar"
            },
            {
                "key": "nest",
                "type": "changed",
                "before": {
                    "key": "value"
                },
                "after": "str"
            }
        ]
    },
    {
        "key": "group2",
        "type": "removed",
        "value": {
            "abc": 12345,
            "deep": {
                "id": 45
            }
        }
    },
    {
        "key": "group3",
        "type": "added",
        "value": {
            "deep": {
                "id": {
                    "number": 45
                }
            },
            "fee": 100500
        }
    }
]`;

expect(result).toBe(expected)
})
