const { respondToBadArguments } = require('./utils')
const injectImportAlias = require('./main')
const { COMMAS_INCLUDED_ERROR } = require('./consts')

const callDirectory = process.cwd()
const callArguments = process.argv.slice(2)

if (callArguments.length !== 1) {
    respondToBadArguments(callArguments)
} else if (callArguments[0].includes(',')) {
    console.error(COMMAS_INCLUDED_ERROR)
} else {
    const newAlias = callArguments[0]

    injectImportAlias(callDirectory, newAlias)
}
