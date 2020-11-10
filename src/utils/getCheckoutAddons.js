import { getCheckoutAddonsProgram } from "./getCheckoutAddonsProgram"
import { getCheckoutAddonsProducts } from "./getCheckoutAddonsProducts"

export const getCheckoutAddons = ({program = {}, products = {}, cart = {}}) => {

    if (program) {
        program = getCheckoutAddonsProgram({
            ...program,
            cart: cart && cart.program
        })
    }

    if (products) {
        products = getCheckoutAddonsProducts({
            ...products,
            cart: cart && cart.products
        })
    }

    if (!program && !products) {
        return false
    } 
    
    return {
        program: program,
        products: products
    }

}