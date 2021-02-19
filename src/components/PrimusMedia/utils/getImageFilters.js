export function getImageFiltersSchema(props) {

    const defaultSchema = {
        "type": "object",
        "properties": {
            "brightness": {
                "type": "number"
            },
            "contrast": {
                "type": "number"
            }
        }
    }

    return defaultSchema
}
    
export function getImageFiltersField(props) {
    const schema = getImageFiltersSchema(props)
    
    return {
        ...props,
        schema: schema,
        uiSchema: {
            ...props.uiSchema,
            "ui:field": "imageFilters"
        }
    }
    
}