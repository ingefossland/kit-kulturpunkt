import { getUiOptions } from "../../Schema/utils"
import { getImageCropdataSchema, getImageFocalpointSchema, getImageFiltersSchema, getImageAdjustSchema, getImageAnnotationsSchema } from "./"

export const getImageSchemaProps = (props) => {
    const { schema, uiSchema } = props;
    const uiOptions = getUiOptions(uiSchema)

    const imageCropdata = schema.cropdata || schema.imageCropdata || uiOptions.imageCropdata || undefined;
    const imageFocalpoint = schema.focalpoint || schema.imageFocalpoint || uiOptions.imageFocalpoint || undefined;
    const imageFilters = schema.filters || schema.imageFilters || uiOptions.imageFilters || undefined;
    const imageAnnotations = schema.annotations || schema.imageAnnotations || uiOptions.imageAnnotations || undefined;
    
    let imageProps = {}

    if (imageCropdata) {
        imageProps.imageCropdata = getImageCropdataSchema()
    }

    if (imageFocalpoint) {
        imageProps.imageFocalpoint = getImageFocalpointSchema()
    }

    if (imageFilters) {
        imageProps.imageFilters = getImageFiltersSchema({
            schema: {
                type: "imageFilters",
                options: imageFilters
            }
        })
    }

    if (imageAnnotations) {
        imageProps.imageAnnotations = getImageAnnotationsSchema({
            schema: {
                type: "imageAnnotations",
                options: imageAnnotations
            }
        })
    }

    
    return imageProps
    
}
 
export const getImageSchema = (props) => {
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
                        "default": "image",
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

    const imageProps = getImageSchemaProps(props)

    return {
        ...defaultSchema,
        properties: {
            ...defaultSchema.properties,
            ...schema.properties,
            ...imageProps
        }
    }

}

export function getImageField(props) {
    const schema = getImageSchema(props)
    
    return {
        ...props, 
        schema: schema,
        uiSchema: {
            ...props.uiSchema,
            "ui:field": "media"
        }
    }
}