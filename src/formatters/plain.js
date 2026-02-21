import _ from 'lodash'

function formatPlain(fileDiff) {
  function formatterP(fileDiff, parentPath = '') {
    const result = []
    for (const item of fileDiff) {
      let currentPath
      if (parentPath === '')
        currentPath = item.key
      else {
        currentPath = parentPath + '.' + item.key
      }

      if (item.type === 'removed') {
        result.push(`Property '${currentPath}' was removed`)
      }
      else if (item.type === 'added') {
        result.push(`Property '${currentPath}' was added with value: ${formatValue(item.value)}`)
      }
      else if (item.type === 'nested') {
        const innet = formatterP(item.children, currentPath)
        result.push(...innet)
      }
      else if (item.type === 'changed') {
        result.push(`Property '${currentPath}' was updated. From ${formatValue(item.before)} to ${formatValue(item.after)}`)
      }
    }
    return result
  }

  function formatValue(value) {
    if (typeof value === 'string') {
      return `'${value}'`
    }
    else if (_.isPlainObject(value)) {
      return `[complex value]`
    }
    return value
  }
  return formatterP(fileDiff).join('\n')
}

export default formatPlain
