import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import PreviewCols from "../components/PrimusPreview/PreviewCols"

const DocumentPreviewCols = ({formData}) => {

    return (
        <PreviewCols items={[formData]}  />
    )

}

export default DocumentPreviewCols