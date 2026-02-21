import formatPlain from './plain.js'
import formatStylish from './stylish.js'
import formatJson from './json.js'

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
}

const format = (fileDiff, formatName) => {
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: ${formatName}`)
  }
  return formatters[formatName](fileDiff)
}

export default format
