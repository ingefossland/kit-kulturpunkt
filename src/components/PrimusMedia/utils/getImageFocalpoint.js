export function getImageFocalpointSchema(props) {

    const defaultSchema = {
        "type": "object",
        "properties": {
            "x": {
                "type": "number",
                "readonly": true
            },
            "y": {
                "type": "number",
                "readonly": true
            }
        }
    }

    return defaultSchema
}

export function getImageFocalpointField(props) {
    const schema = getImageFocalpointSchema(props)
    
    return {
        ...props,
        schema: schema,
        uiSchema: {
            ...props.uiSchema,
            "ui:field": "imageFocalpoint"
        }
    }
    
}