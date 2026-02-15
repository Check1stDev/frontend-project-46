const parseFilepath = requere ('./parser.js');

function genDiff(filepath1, filepath2) {
    const data1 = parseFilepath(filepath1);
    const data2 = parseFilepath(filepath2);
}

module.exports = genDiff;