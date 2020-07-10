export function getMultipleSelectionIDs(selections, idName = 'id') {
    if ( Boolean(selections[0]) && selections.length > 0 ) {

        return [...new Set(selections.map(item => item[idName]))]
    } else {
        return []
    }
}

