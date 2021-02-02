import { getImageSchema, getVideoSchema, getAudioSchema } from "./"

export const getGeopointSchema = (props) => {
    const { schema } = props;
    const { properties } = schema;

    const defaultSchema = {
        "type": "object",
        "properties": {
            "placeId": {
                "type": "string"
            },
            "lat": {
                "type": "number"
            },
            "lng": {
                "type": "number"
            },
            "alt": {
                "type": "number"
            },
            "zoom": {
                "type": "number"
            }
        }
    }    

    return {
        ...defaultSchema,
        properties: {
            ...defaultSchema.properties,
            ...properties
        }
    }
    
}

export const getGeopointField = (props) => {

    const schema = getGeopointSchema(props)
    
    return {
        ...props,
        schema: schema,
        uiSchema: {
            ...props.uiSchema,
            "ui:field": "geopoint"
        }
    }
    
}