/*
import schema from "./Artwork.schema"
import uiSchema from "./Artwork.uiSchema"
import formData from "./Artwork.formData"
import Preview from "./ArtworkPreview"
*/

import schema from "./schema"
import uiSchema from "./uiSchema"
import formData from "./formData"
import Preview from "../../ArtworkPreview"


export default {
    name: "artifact",
    schemaType: "documents",
    schemaId: 1,
    schema: schema,
    uiSchema: uiSchema,
    formData: formData,
    preview: {
        template: Preview
    }
}