const formatPlain = require("./plain")
const formatStylish = require("./stylish")

const formatters = {
    stylish: formatStylish,
    plain: formatPlain,
}

const format = (fileDiff, formatName) => {
    if (!formatters[formatName]) {
        throw new Error(`Unknown format: ${formatName}`)
    }
   return formatters[formatName](fileDiff)
}

module.exports = format