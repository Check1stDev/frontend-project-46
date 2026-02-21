const _ = require("lodash")

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

module.exports = formatStylish