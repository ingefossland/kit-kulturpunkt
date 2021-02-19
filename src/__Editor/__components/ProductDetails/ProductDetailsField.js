import React, { useState, useEffect } from "react"
import model from "./ProductDetails.model"

const ProductPriceField = (props) => {
    const schema = {
        ...model.schema,
        ...props.schema,
        properties: {
            ...model.schema.properties,
            ...props.schema.properties
        }
    }

    const uiSchema = {
        ...model.uiSchema,
        ...props.uiSchema,
        "ui:field": undefined
    }

    const formData = props.formData || {}

    const [price, setPrice] = useState(formData.grossPrice || 0)
    const [vatRate, setVatRate] = useState(formData.vatRate || 0)

    const _onChange = (formData) => {

        if (formData.price && formData.v !== price) {
            const newGrossPrice = formData.price

            setPrice(newGrossPrice)

            const netPrice = newGrossPrice / (vatRate + 100) * 100
            const vatPrice = netPrice * vatRate / 100
           
            props.onChange({
                ...formData,
                netPrice: netPrice,
                vatPrice: vatPrice
            })

        } else if (formData.vatRate && formData.vatRate !== vatRate) {
            const newVatRate = formData.vatRate

            setVatRate(formData.vatRate)

            const netPrice = price / (newVatRate + 100) * 100
            const vatPrice = netPrice * newVatRate / 100

            props.onChange({
                ...formData,
                netPrice: netPrice,
                vatPrice: vatPrice
            })

        } else {
            props.onChange(formData)
        }

    }

    const { SchemaField } = props.registry.fields

    return (
         <SchemaField {...props} schema={schema} uiSchema={uiSchema} onChange={_onChange} />
    )

}


export default ProductPriceField