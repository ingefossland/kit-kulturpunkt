export const applyDiscount = ({item, rule, apply}) => {

    const { total, count } = item

    const { minPrice, minCount, maxCount } = rule

    if (minCount && count < minCount) {
        apply = false
    }

    if (maxCount && count > maxCount) {
        apply = false
    }

    if (minPrice && total < minPrice) {
        apply = false
    }


    return apply

}

export const getCartDiscounts = ({cart, discounts = []}) => {

    const cartItems = cart && cart.items
    const cartTotal = cart && cart.total
    
    let items = []
    
    discounts && discounts.map(item => {
        const { criteria, maxPrice, pctPrice } = item

        let apply = true

        criteria && criteria.map(rule => {

            const { id } = rule

            if (id && cartItems && cartItems[id]) {
                apply = applyDiscount({item: cartItems[id], rule, apply})
            } else {
                apply = applyDiscount({item: cart, rule, apply})
            }

        })

        if (apply) {

            let price

            if (maxPrice && cartTotal > maxPrice) {
    
                price = maxPrice - cartTotal
    
            } else if (cartTotal && pctPrice) {
    
                const discount = cartTotal * (pctPrice / 100)
                price = (cartTotal - discount) * -1
    
            }

            price && items.push({
                id: item.id,
                title: item.title,
                description: item.description,
                price: price,
                count: 1,
                total: price
            })
                
        }
    


    })

    return items

}

export default getCartDiscounts