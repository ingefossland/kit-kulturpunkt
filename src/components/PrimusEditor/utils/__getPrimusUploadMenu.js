import _ from 'lodash';
import { getUiFieldset } from "."

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils;

export const getPrimusUploadMenu = (props) => {
    const { formData, formContext } = props;
    const { _onUploadClick } = formContext
    
    const imagesMenu = formData.images && formData.images.length && {
        "title": "Bilder",
        "pathname": "images",
        "count": formData.images && formData.images.length
    }

    const attachmentsMenu = formData.attachments && formData.attachments.length && {
        "title": "Dokumenter",
        "pathname": "attachments",
        "count": formData.attachments && formData.attachments.length
    }

    return {
        "title": "Media",
        "role": "section",
        "children": [
            imagesMenu,
            attachmentsMenu,
            {
                "icon": "add",
                "title": "Last opp",
                "onClick": _onUploadClick
            }
        ]
    }

}