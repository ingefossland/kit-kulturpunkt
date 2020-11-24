import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

const PageGridIcon = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 5.5H3.5V18.5H20.5V5.5ZM2 4V20H22V4H2Z"/>
            <rect x="4" y="12" width="16" height="1"/>
            <rect x="15" y="13" width="1" height="5"/>
            <rect x="10" y="6" width="1" height="6"/>
        </SvgIcon>
    )
}

export default PageGridIcon