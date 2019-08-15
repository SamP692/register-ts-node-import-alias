const {
    NO_ARGS_ERROR,
    TOO_MANY_ARGS_ERROR
} = require('./consts')

const respondToBadArguments = (args) => {
    if (args.length === 0) {
        console.warn(NO_ARGS_ERROR)
    } else {
        const initialTooManyArgsString = TOO_MANY_ARGS_ERROR + '\n'

        const tooManyArgsString = args.reduce((finalString, currentArg, argIdx) => {
            let stringAddition = `  ${argIdx + 1}: '${currentArg}'`

            if (argIdx + 1 < args.length) stringAddition += '\n'

            return finalString + stringAddition
        }, initialTooManyArgsString)

        console.error(tooManyArgsString)
    }
}

const isArrayWithValue = arr => Array.isArray(arr) && arr.length > 0 && !(arr.length === 1 && arr[0] === '')

module.exports = {
    respondToBadArguments,
    isArrayWithValue
}
