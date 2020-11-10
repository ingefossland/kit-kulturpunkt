import moment from "moment"
import _ from "lodash"

import getCartDiscounts from "./getCartDiscounts"

export const getCheckoutTicketsCategory = ({items = [], cart = {}, ...props}) => {

    const parentId = props.id

    const cartItems = items.map((item, index) => {

        const id = item.id || parentId + "-" + index
        const cartItem = cart && cart.items && cart.items[id]

        return {
            ...item,
            ...cartItem,
            id: id
        }

    })

    return {
        items: cartItems,
        ...props
    }


}

export const getCheckoutTickets = ({tickets = {}, cart = {}}) => {

    let categories = []

    if (tickets.categories) {
        categories = tickets.categories.map((category, index) => {
            const id = category.id || "tc"+index

            return getCheckoutTicketsCategory({
                ...category,
                cart: cart && cart.tickets,
                id: id
            })
        })
    } else {
        categories = [getCheckoutTicketsCategory({
            ...tickets,
            cart: cart && cart.tickets,
            id: "tc"
        })]
    }

    let categoriesById = {}

    categories.map(category => {
        categoriesById[category.id] = category
    })
    
    const discounts = cart && cart.tickets && getCartDiscounts({cart: cart.tickets, ...tickets})

    tickets = {
        ...tickets,
        categories: categories,
        categoriesById: categoriesById,
        discounts: discounts
    }
    
    return tickets
    
}