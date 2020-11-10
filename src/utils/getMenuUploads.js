export function getMenuUploads({query, mediaTypes = [], ...props}) {

    const uploadsMenu = {
        "role": "group",
        "pathname": "upload",
        "title": "upload",
        "query": {
            "models": "media",
            "uploadStatus": "NOT done"
        },
        "template": "upload",
        "children": [
            {
                "title": "Status: init",
                "pathname": "init",
                "query": {
                    "models": "media",
                    "uploadStatus": "init"
                }
            },
            {
                "title": "Status: failed",
                "pathname": "undone",
                "query": {
                    "models": "media",
                    "uploadStatus": "NOT done"
                }
            }
        ]
    }

    return uploadsMenu

}

export default getMenuUploads