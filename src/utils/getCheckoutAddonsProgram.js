
export const getCheckoutAddonsProgram = ({items = [], cart = {}, ...props}) => {

    const itemsAddon = items.map((item, index) => {

        const id = item.id || "t+" + index
        const cartItem = cart && cart.items && cart.items[id]

        return {
            ...item,
            ...cartItem,
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