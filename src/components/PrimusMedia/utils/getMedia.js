import { getImageSchema, getVideoSchema, getAudioSchema } from "./"

export const getMediaSchema = (props) => {
    const { schema } = props;
    const { mediaType, properties } = schema;

    const defaultSchema = {
        "type": "object",
        "properties": {
            "mediaId": {
                "type": "string",
                "readonly": true
            },
            "media": {
                "type": "object",
                "properties": {
                    "uploadProgress": {
                        "type": "number",
                        "readonly": true,
                    },
                    "mediaType": {
                        "type": "string",
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

    if (mediaType && mediaType === "image") {
        return getImageSchema(props)
    }
    
    return {
        ...defaultSchema,
        properties: {
            ...defaultSchema.properties,
            ...properties
        }
    }
    
}

export function getMediaField(props) {

    const schema = getMediaSchema(props)
    
    return {
        ...props,
        schema: schema,
        uiSchema: {
            ...props.uiSchema,
            "ui:field": "media"
        }
    }
    
}