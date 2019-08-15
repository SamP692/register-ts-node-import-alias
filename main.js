const fs = require('fs')

const { isArrayWithValue } = require('./utils')

const { NEW_LINE_WITH_2_TABS, NEW_LINE_WITH_3_TABS } = require('./consts')

const updateTsPaths = (applicationRoot, newAlias) => {
    const filePath = `${applicationRoot}/tsconfig.json`

    const file = fs.readFileSync(filePath, 'utf-8')

    const [prePathText, postPathText] = file.split('"paths": {')
    const [configText, postConfigText] = postPathText.split('},')

    let cleanedConfigText = configText.trim()

    const existingConfigs = cleanedConfigText.split(',\n')

    const cleanedExistingConfigs = !isArrayWithValue(existingConfigs) ?
        [] :
        existingConfigs.map(config => config.trim())

    const newConfigText = `"${newAlias}": ["${newAlias}"]`

    const updatedConfigs = cleanedExistingConfigs.length === 0 ?
        [newConfigText] :
        [...cleanedExistingConfigs, newConfigText]

    let updatedConfigString = updatedConfigs.join(`${updatedConfigs.length === 1 ? '' : ','}${NEW_LINE_WITH_3_TABS}`)
    updatedConfigString = `${NEW_LINE_WITH_3_TABS}${updatedConfigString}${NEW_LINE_WITH_2_TABS}`

    const finalFile = prePathText + '"paths": {' + updatedConfigString + '},' + postConfigText

    console.log(finalFile)
}

function injectImportAlias(applicationRoot, newAlias) {
    updateTsPaths(applicationRoot, newAlias)
}

module.exports = injectImportAlias
