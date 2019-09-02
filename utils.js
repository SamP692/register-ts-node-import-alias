const extractArguments = (args) => {
    if (args.length === 0) return {}

    const newArgs = {}

    let runningArgs = [...args]
    while(runningArgs.length > 0) {
        const loopArg = typeof runningArgs[0] === 'string' ? runningArgs[0].toLowerCase() : ''

        const argIsSupportedArg = ['-p', '--path', '-a', '--alias'].reduce(
            (doesInc, supArg) => doesInc || loopArg === supArg,
            false
        )

        let killThroughIndex = 1

        if (argIsSupportedArg && runningArgs.length > 1) {
            killThroughIndex = 2

            const argKey = (loopArg === '-p' || loopArg === '--path') ? 'path' : 'alias'

            newArgs[argKey] = runningArgs[1]
        } else if (!argIsSupportedArg && runningArgs.length === 1) {
            newArgs['alias'] = loopArg
        }

        runningArgs = runningArgs.slice(killThroughIndex)
    }

    return newArgs
}

const isArrayWithValue = arr => Array.isArray(arr) && arr.length > 0 && !(arr.length === 1 && arr[0] === '')

const trimUnnecessaryPathSuffix = path => path.slice(path.length - 2) === '/*' ?
    path.slice(0, path.length - 2) :
    path

const createAliasMapping = newAlias => newAlias[0].match(/[^a-zA-Z0-9]/) ?
    newAlias.slice(1, newAlias.length) :
    newAlias

module.exports = {
    isArrayWithValue,
    trimUnnecessaryPathSuffix,
    createAliasMapping,
    extractArguments
}
