const formatPlain = require("./plain")
const formatStylish = require("./stylish")
const formatJson = require("./json")

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

module.exports = format