const injectImportAlias = require('./main')

const { extractArguments } = require('./utils')
const { NO_ARGS_ERROR } = require('./consts')

const callDirectory = process.cwd()
const callArguments = process.argv.slice(2)

const argumentList = extractArguments(callArguments)

const noAliasArgument = !argumentList.alias

if (noAliasArgument) {
    console.warn(NO_ARGS_ERROR)
} else {
    const { alias, path } = argumentList

    injectImportAlias(callDirectory, alias, path)
}
