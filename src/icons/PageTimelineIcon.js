import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

const PageGridIcon = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24" {...props}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 5.5H3.5V18.5H20.5V5.5ZM2 4V20H22V4H2Z" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="17" cy="12" r="1.5" />
            <circle cx="7" cy="12" r="1.5" />
        </SvgIcon>
    )

}

export default PageGridIcon