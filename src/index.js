import _ from 'lodash';
import parseFilepath from './parser.js';
import format from './formatters/index.js';


function genDiff(filepath1, filepath2, formatName = 'stylish') {
    const data1 = parseFilepath(filepath1);
    const data2 = parseFilepath(filepath2);
    const tree = buildDiffThree(data1,data2)
    return format(tree, formatName)
}

function buildDiffThree(data1,data2) {
    const allKeys = _.sortBy(_.union(_.keys(data1),_.keys(data2)));
    const result = [];
    for (const key of allKeys) {
        const key1 = _.has(data1, key);
        const key2 = _.has(data2, key);
        const v1 = data1[key];
        const v2 = data2[key];
        if (key1 && !key2) {
            result.push({key, type: 'removed', value: v1});
        } else if (!key1 && key2) {
            result.push({key, type: 'added', value: v2});
        } else if (_.isPlainObject(v1) && _.isPlainObject(v2)) {
            result.push({key, type: 'nested', children: buildDiffThree(v1,v2)});
        } 
        else if(key1 && key2) {
            if (v1 === v2) {
                result.push({key, type: 'unchanged', value: v2});
            } else {
                result.push({ key, type: 'changed', before: v1, after: v2 })
            }
        }
    }
    return result
}

export default genDiff;