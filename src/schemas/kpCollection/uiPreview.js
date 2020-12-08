import icons from "../../icons"

export default {
    "select": {
        "siteId": "siteId",
        "title": "title",
        "name": "name",
        "metadata": "metadata",
        "icon": "icon"
    },
    prepare({formData, formContext}) {
        let { id, siteId, siteName, name, title, collectionType, content = {} } = formData

        if (content) {

            title = content.title
            siteId = content.siteId
            name = title && collectionType + ":" + title.replace(' ', '-').toLowerCase()

        }
        
        const metadata = [
            "Id:"+id,
            "Site:"+siteName,
        ]

        return {
            siteId: siteId,
            title: title,
            name: name,
            metadata: metadata,
            icon: icons["kpMenu"]
        }
    }
}