import schema from "./KpArticle/schema"
import uiSchema from "./KpArticle/uiSchema"
import formData from "./KpArticle/formData"
import Preview from "./KpArticlePreview"

export default {
    schema: schema,
    uiSchema: uiSchema,
    formData: formData,
    preview: {
        template: Preview
    }
}