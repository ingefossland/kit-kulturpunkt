import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

const PageParentIcon = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M20.5 5.5H3.5V18.5H20.5V5.5ZM2 4V20H22V4H2Z"/>
            <rect x="9" y="8" width="6" height="4"/>
            <rect x="5" y="14" width="4" height="2"/>
            <rect x="10" y="14" width="4" height="2"/>
            <rect x="15" y="14" width="4" height="2"/>
        </SvgIcon>
    )

}

export default PageParentIcon