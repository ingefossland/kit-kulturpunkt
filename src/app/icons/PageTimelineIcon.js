import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

const PageGridIcon = (props) => {
    const fill = "currentColor"
    return (
        <SvgIcon {...props} viewBox="0 0 24 24" {...props}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 5.5H3.5V18.5H20.5V5.5ZM2 4V20H22V4H2Z" fill="black"/>
            <circle cx="12" cy="12" r="1.5" fill="black"/>
            <circle cx="17" cy="12" r="1.5" fill="black"/>
            <circle cx="7" cy="12" r="1.5" fill="black"/>
        </SvgIcon>
    )

}

export default PageGridIcon