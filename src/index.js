const parseFilepath = require ('./parser.js');
const _ = require('lodash');

function formatStylish(fileDiff, depth = 1) {
    const indent = ' '.repeat(((depth * 4)-2))
    const indentNested = ' '.repeat(depth * 4)
    const bracketIndent =  ' '.repeat((depth - 1) * 4)
   const result = fileDiff.reduce((acc,item) =>{
    if (item.type === 'removed'){
        acc.push(`${indent}- ${item.key}: ${stringify(item.value,depth + 1)}`)
    } 
    else if (item.type === 'added') {
        acc.push(`${indent}+ ${item.key}: ${stringify(item.value,depth + 1)}`)
    }
    else if (item.type === 'nested'){
        acc.push(`${indentNested}${item.key}: ${formatStylish(item.children, depth + 1)}`)
    }
    else if (item.type === 'unchanged') {
        acc.push(`${indent}  ${item.key}: ${stringify(item.value,depth + 1)}`)
    }
    else if (item.type === 'changed') {
        acc.push(`${indent}- ${item.key}: ${stringify(item.before,depth + 1)}`)
        acc.push(`${indent}+ ${item.key}: ${stringify(item.after,depth + 1)}`)
    }
    return acc
   },[])
   return `{\n${result.join('\n')}\n${bracketIndent}}`
}

function stringify(value, depth = 1) {
    if (!_.isPlainObject(value)) {
        return String(value)
    }
    const indent = ' '.repeat(depth * 4)
    const bracketIndent =  ' '.repeat((depth - 1) * 4)
    
    const lines = Object.entries(value)
        .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}` )

    return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

function genDiff(filepath1, filepath2) {
    const data1 = parseFilepath(filepath1);
    const data2 = parseFilepath(filepath2);
    const tree = buildDiffThree(data1,data2)
    return formatStylish(tree)
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

module.exports = genDiff;