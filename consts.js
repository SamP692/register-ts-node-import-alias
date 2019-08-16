const NO_ARGS_ERROR         = 'No directory argument was received to register'
const TOO_MANY_ARGS_ERROR   = 'Only one directory argument was expected, instead received:'
const COMMAS_INCLUDED_ERROR = 'Commas cannot be included in the name of a path alias'

const PACKAGE_CONFIG_KEY = '_moduleAliases'
const TS_CONFIG_KEY      = 'paths'

const NEW_LINE_WITH_1_TAB  = '\n    '
const NEW_LINE_WITH_2_TABS = '\n        '
const NEW_LINE_WITH_3_TABS = '\n            '

module.exports = {
    NO_ARGS_ERROR,
    TOO_MANY_ARGS_ERROR,
    COMMAS_INCLUDED_ERROR,
    NEW_LINE_WITH_1_TAB,
    NEW_LINE_WITH_2_TABS,
    NEW_LINE_WITH_3_TABS,
    PACKAGE_CONFIG_KEY,
    TS_CONFIG_KEY
}
