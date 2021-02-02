import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

const PageListIcon = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 5.5H3.5V18.5H20.5V5.5ZM2 4V20H22V4H2Z"/>

            <rect x="8" y="8.5" width="8" height="1" />
            <rect x="8" y="10.5" width="8" height="1" />
            <rect x="8" y="12.5" width="8" height="1" />
            <rect x="8" y="14.5" width="8" height="1" />


        </SvgIcon>
    )

}

export default PageListIcon