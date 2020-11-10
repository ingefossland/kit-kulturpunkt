import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import SearchDialog from "./SearchDialog"

const DocumentsDialog = ({schema, formData, ...props}) => {

    return (
        <SearchDialog schema={schema} formData={formData} {...props} />
    )

}

DocumentsDialog.defaultProps = {
    query: {
        models: "documents",
        documentType: "*"
    }
}

export default DocumentsDialog