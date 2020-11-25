import React from 'react';
import PreviewCode from "../PreviewCode/PreviewCode";

const PreviewJSON = ({theme = "light", children}) => {

    return (
        <PreviewCode theme={theme} language="json">{children}</PreviewCode>
    )

}

export default PreviewJSON;