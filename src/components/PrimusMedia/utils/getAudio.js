export function getAudioSchema(props) {
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
                        "default": "audio",
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

export function getAudioField(props) {

    return {
        ...props,
        schema: getAudioSchema(props),
        uiSchema: {
            ...props.uiSchema,
            "ui:field": "media"
        }
    }

}