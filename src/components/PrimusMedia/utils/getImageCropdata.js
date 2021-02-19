export function getImageCropdataSchema(props) {

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
            },
            "width": {
                "type": "number",
                "readonly": true
            },
            "height": {
                "type": "number",
                "readonly": true
            },
            "rotate": {
                "type": "number",
                "readonly": true,
            }
        }
    }

    return defaultSchema
}

export function getImageCropdataField(props) {
    const schema = getImageCropdataSchema(props)
    
    return {
        ...props,
        schema: schema,
        uiSchema: {
            ...props.uiSchema,
            "ui:field": "imageCropdata"
        }
    }
    
}