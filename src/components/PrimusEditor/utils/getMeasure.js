export const getMeasureFromString = (value) => {
    const typings = value && value.split(":")

    let measureType, measureValue = value

    if (typings.length > 1) {
        measureType = typings[0]
        measureValue = typings[1]
    }

    const numberValue = measureValue.replace(/,/g, '.')
    const split = numberValue && numberValue.split("x") || []

    const width = split && split[0] && parseFloat(split[0])
    const height = split && split[1] && parseFloat(split[1])
    const depth = split && split[2] && parseFloat(split[2])

    const unitValue = split && split.length && split[split.length-1]

    const unit = width && unitValue && unitValue.replace(/[0-9,.]/g, '')

    let size = []

    width && size.push(width)
    height && size.push(height)
    depth && size.push(depth)

    size = size.join('×')

    if (unit) {
        size = size + unit
    }
    
    return {
        measureType: measureType,
        width: width,
        height: height,
        depth: depth,
        unit: unit,
        size: size,
        value: value
    }

}