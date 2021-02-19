import { getUiOptions } from "../../Schema/utils"

const defaultProps = {
    defaultSchema: {
        "type": "object",
        "properties": {
            "mediaId": {
                "type": "string",
                "readonly": true
            },
            "media": {
                "type": "object",
                "properties": {
                    "mediaType": {
                        "type": "string",
                        "default": "image",
                        "readonly": true
                    },
                    "uniqueId": {
                        "type": "string",
                        "readonly": true
                    }
                }
            },
            "imageAnnotations": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "top": {
                            "type": "number",
                            "readonly": true
                        },
                        "left": {
                            "type": "number",
                            "readonly": true
                        },
                        "x": {
                            "type": "number",
                            "readonly": true
                        },
                        "y": {
                            "type": "number",
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
        }
    }
}

export const getAnnotateImageSchema = (props) => {
    const { schema, defaultSchema } = props;

    return defaultSchema

    return {
        ...defaultSchema,
        properties: {
            ...defaultSchema.properties,
            ...schema.properties
        }
    }
    
}

export function getAnnotateImageField(props) {
    
    props = {
        ...defaultProps,
        ...props,
    }    
    
    const schema = getAnnotateImageSchema(props)
    
    return {
        ...props,
        schema: schema,
        uiSchema: {
            ...props.uiSchema,
            "ui:field": "annotateImage"
        }
    }
    
}