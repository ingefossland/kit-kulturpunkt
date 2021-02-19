export function getVideoSchema(props) {
    const { schema } = props;

    const defaultSchema = {
        "type": "object",
        "properties": {
            "uploadProgress": {
                "type": "number",
                "readonly": true,
                "default": 100
            },
            "mediaId": {
                "type": "string",
                "readonly": true
            },
            "media": {
                "type": "object",
                "properties": {
                    "mediaType": {
                        "type": "string",
                        "default": "video",
                        "readonly": true
                    },
                    "uniqueId": {
                        "type": "string",
                        "readonly": true
                    }
                }
            }
        }
    }

    return {
        ...defaultSchema,
        properties: {
            ...defaultSchema.properties,
            ...schema.properties,
        }
    }
    
    return defaultSchema

}

export function getVideoField(props) {

    return {
        ...props,
        schema: getVideoSchema(props),
        uiSchema: {
            ...props.uiSchema,
            "ui:field": "media"
        }
    }

}