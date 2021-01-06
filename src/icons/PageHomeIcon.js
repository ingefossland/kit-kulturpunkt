import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

const PageHomeIcon = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M20.5 5.5H3.5V18.5H20.5V5.5ZM2 4V20H22V4H2Z" />
            <path d="M11 16V13H13V16H15.5V12H17L12 7.5L7 12H8.5V16H11Z" />
        </SvgIcon>
    )
}

export default PageHomeIcon