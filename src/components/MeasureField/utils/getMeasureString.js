export const getMeasureString = (array = []) => {

    if (!array.length) {
        return ""
    }

    const list = array & array.map(item => {

        const { name, width, height, depth, unit } = item

        let measures = []

        if (width) { measures.push(width) }
        if (height) { measures.push(height) }
        if (depth) { measures.push(depth) }

        measures = measures.join('x')

        if (name) {
            measures = name + ":" + measures
        }

        if (unit) {
            measures = measures + unit
        }

        return measures

    })

    return list && list.join(", ")

}

export default getMeasureString