const parseFilepath = require ('./parser.js');
const _ = require('lodash');

function genDiff(filepath1, filepath2) {
    const data1 = parseFilepath(filepath1);
    const data2 = parseFilepath(filepath2);
    const allKeys = _.sortBy(_.union(_.keys(data1),_.keys(data2)));
    const result = [];
    for (const key of allKeys) {
        const key1 = _.has(data1, key);
        const key2 = _.has(data2, key);
        if (key1 && !key2) {
            result.push({key, type:'removed', value: data1[key]});
        } else if (!key1 && key2) {
            result.push({key, type:'added', value: data2[key]});
        }else if(key1 && key2) {
            if (data1[key] === data2[key]) {
                result.push({key, type:'unchanged', value: data2[key]});
            } else {
                result.push({ key, type: 'changed', before: data1[key], after: data2[key] })
            }
        }
    }
    return result
}

module.exports = genDiff;