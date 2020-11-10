export const getCheckoutAddonsProducts = ({items = [], cart = {}, ...props}) => {

    const itemsAddon = items.map((item, index) => {

        const id = item.id || "p+" + index
        const cartItem = cart && cart.items && cart.items[id]

        const options = item.variants && item.variants.map(option => {

            const optionId = id + "-" + option.value
            const cartItem = cart && cart.items && cart.items[optionId]

            return {
                ...item,
                ...cartItem,
                ...option,
                id: optionId
            }
        })

        let optionsById = {}
    
        options && options.map(option => {
            optionsById[option.id] = option
        })

        return {
            ...item,
            ...cartItem,
            options: options,
            optionsById: optionsById,
            id: id
        }

    })

    if (!itemsAddon.length) {
        return false
    }

    return {
        ...props,
        items: itemsAddon
    }

    
}