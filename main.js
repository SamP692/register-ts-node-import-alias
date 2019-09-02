const fs = require('fs')

const {
    isArrayWithValue,
    trimUnnecessaryPathSuffix,
    createAliasMapping
} = require('./utils')

const {
    NEW_LINE_WITH_1_TAB,
    NEW_LINE_WITH_2_TABS,
    NEW_LINE_WITH_3_TABS,
    PACKAGE_CONFIG_KEY,
    TS_CONFIG_KEY
} = require('./consts')

const updateConfig = ({ filePath, newConfigText, configKey, shortIndent, longIndent }) => {
    const file = fs.readFileSync(filePath, 'utf-8')

    const [prePathText, postPathText]      = file.split(`"${configKey}": {`)
    const configDivider                    = postPathText.includes('},') ? '},' : '}'
    const [configText, ...postConfigTexts] = postPathText.split(configDivider)
    const postConfigText                   = postConfigTexts.join(configDivider)

    let cleanedConfigText = configText.trim()

    const existingConfigs = cleanedConfigText.split(',\n')

    const cleanedExistingConfigs = !isArrayWithValue(existingConfigs) ?
        [] :
        existingConfigs.map(config => config.trim())

    const updatedConfigs = cleanedExistingConfigs.length === 0 ?
        [newConfigText] :
        [...cleanedExistingConfigs, newConfigText]

    let updatedConfigString = updatedConfigs.join(`${updatedConfigs.length === 1 ? '' : ','}${longIndent}`)
    updatedConfigString = `${longIndent}${updatedConfigString}${shortIndent}`

    const finalFile = prePathText + `"${configKey}": {` + updatedConfigString + configDivider + postConfigText

    fs.writeFileSync(filePath, finalFile)
}

const updatePackagePaths = (applicationRoot, path, newAlias, newAliasMapping) => {
    const filePath      = `${applicationRoot}/package.json`
    const pathToAliased = path ? `dist/${path}` : 'dist'

    const newConfigText = `"${newAlias}": "${pathToAliased}/${newAliasMapping}"`

    updateConfig({
        filePath,
        newConfigText,
        configKey: PACKAGE_CONFIG_KEY,
        shortIndent: NEW_LINE_WITH_1_TAB,
        longIndent: NEW_LINE_WITH_2_TABS
    })
}

const updateTsPaths = (applicationRoot, path, newAlias, newAliasMapping) => {
    const filePath = `${applicationRoot}/tsconfig.json`
    const pathToAliased = path ? `${path}/${newAliasMapping}` : newAliasMapping

    const newIndexConfig     = `"${newAlias}": ["${pathToAliased}"]`
    const newDirectoryConfig = `"${newAlias}/*": ["${pathToAliased}/*"]`

    const newConfigs = [newIndexConfig, newDirectoryConfig]

    newConfigs.forEach((newConfigText) => {
        updateConfig({
            filePath,
            newConfigText,
            configKey: TS_CONFIG_KEY,
            shortIndent: NEW_LINE_WITH_2_TABS,
            longIndent: NEW_LINE_WITH_3_TABS
        })
    })
}

function injectImportAlias(applicationRoot, newAlias, path) {
    const aliasMapping = createAliasMapping(newAlias)

    const [updatedAliasText, updatedAliasMapping] = [newAlias, aliasMapping].map(trimUnnecessaryPathSuffix)

    updateTsPaths(applicationRoot, path, updatedAliasText, updatedAliasMapping)

    updatePackagePaths(applicationRoot, path, updatedAliasText, updatedAliasMapping)
}

module.exports = injectImportAlias
