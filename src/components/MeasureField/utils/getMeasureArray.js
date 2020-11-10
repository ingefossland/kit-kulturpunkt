const getMeasureFromValue = (value) => {

    const split = value && value.split("x") || []

    const values = split && split.map((value, index) => {
        return parseFloat(value)
    })

    const unitValue = split && split.length && split[split.length-1]

    const unit = unitValue && unitValue.replace(/[0-9]/g, '')

    return {
        width: values && values[0],
        height: values && values[1],
        depth: values && values[2],
        unit: unit,
        value: value
    }

}

const getArrayItem = (string) => {

    const split = string && string.split(":")

    const name = split[0]
    const value = split[1]

    if (name && value) {
        return {
            ...getMeasureFromValue(value),
            name: name.trim(),
        }
    }

    else {
        return getMeasureFromValue(string)
    }

}

export const getMeasureArray = (string = "") => {

    const array = string && string.split(",") || []

    return array.map(item => { return getArrayItem(item) } )


}

export default getMeasureArray