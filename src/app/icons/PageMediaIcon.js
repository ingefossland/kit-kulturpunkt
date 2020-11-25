import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

const PageMediaIcon = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 5.5H3.5V18.5H20.5V5.5ZM2 4V20H22V4H2Z" />
            <path d="M18 16.1382H6L9 12.2873L11.1382 14.8618L14.1382 11L18 16.1382Z" />
        </SvgIcon>
    )
}

export default PageMediaIcon