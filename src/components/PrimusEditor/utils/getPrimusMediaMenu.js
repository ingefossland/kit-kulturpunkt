import _ from 'lodash';
import { getUiFieldset } from "./"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils;

export const getPrimusMediaMenu = ({parent, onAdd, ...props}) => {
    const { formData, formContext } = props;
    const { _onUploadClick } = formContext
    
    const imagesMenu = formData.images && formData.images.length && {
        "title": "Bilder",
        "id": parent.id + "_images_0",
        "count": formData.images && formData.images.length
    }

    const attachmentsMenu = formData.attachments && formData.attachments.length && {
        "title": "Dokumenter",
        "id": parent.id + "_attachments_0",
        "count": formData.attachments && formData.attachments.length
    }

    return {
        ...parent,
        role: "section",
        "children": [
            imagesMenu,
            attachmentsMenu,
            {
                "icon": "add",
                "title": "Last opp",
                "onClick": onAdd
            }
        ]
    }

}