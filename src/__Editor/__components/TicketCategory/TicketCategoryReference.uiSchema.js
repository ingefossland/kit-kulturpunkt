export default {
    "ui:editable": true,
    "ui:deletable": true,
    "ui:restorable": true,
    "ui:preview": {
        "select": {
            "_action": "_action",
            "type": "type",
            "title": "title",
            "description": "description",
            "imageUrl": "imageUrl",
            "status": "status",
            "referenceId": "referenceId",
            "reference": "reference"
        },
        prepare({formData = {}}) {
            const { _action, reference, referenceId } = formData;
    
            let status = reference && reference.status;
    
            if (_action === "delete") {
                status = "trash"
            }
    
            return {
                _action: _action,
                type: reference && reference.documentType,
                title: reference && reference.title,
                description: reference && reference.description,
                imageUrl: reference && reference.imageUrl,
                status: status,
                referenceId: referenceId,
                reference: reference
            }
        }                
    }
}