export function getImageAnnotationsSchema(props) {

    const defaultSchema = {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "top": {
                    "type": "number",
                    "default": 50,
                    "readonly": true
                },
                "left": {
                    "type": "number",
                    "default": 50,
                    "readonly": true
                },
                "x": {
                    "type": "number",
                    "default": 0,
                    "readonly": true
                },
                "y": {
                    "type": "number",
                    "default": 0,
                    "readonly": true
                },
                "radius": {
                    "type": "number",
                    "minimum": 1,
                    "maximum": 100,
                    "default": 1
                },
                "title": {
                    "type": "string",
                },
                "description": {
                    "type": "string",
                }
            }
        }
    }

    return defaultSchema
}
    
export function getImageAnnotationsField(props) {
    const schema = getImageAnnotationsSchema(props)
    
    return {
        ...props,
        schema: schema,
        uiSchema: {
            ...props.uiSchema,
            "ui:field": "imageAnnotations"
        }
    }
    
}