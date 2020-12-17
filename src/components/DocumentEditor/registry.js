import DocumentParentIdField from "./DocumentParentIdField"
import DocumentParentsField from "./DocumentParentsField"
import DocumentChildrenField from "./DocumentChildrenField"
import DocumentLocaleField from "./DocumentLocaleField"
import DocumentCollectionIdField from "./DocumentCollectionIdField"

export default {
    fields: {
        "documentParentId": DocumentParentIdField,
        "documentParents": DocumentParentsField,
        "documentChildren": DocumentChildrenField,
        "documentLocale": DocumentLocaleField,
        "documentCollectionId": DocumentCollectionIdField
    }

}