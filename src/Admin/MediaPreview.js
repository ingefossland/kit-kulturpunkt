import React, { useEffect, useState } from 'react';
import { PreviewMedia } from "@kit-ui/admin"

const MediaPreview = ({formData, formContext}) => {
    return <PreviewMedia {...formData} />
}

export default MediaPreview