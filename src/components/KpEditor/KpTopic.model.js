import schema from "./KpTopic.schema"
import uiSchema from "./KpTopic.uiSchema"
import formData from "./KpTopic.formData"
import Preview from "./KpTopicPreview"

export default {
    schema: schema,
    uiSchema: uiSchema,
    formData: formData,
    preview: {
        template: Preview
    }
}