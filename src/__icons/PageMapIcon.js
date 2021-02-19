import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

const PageMapIcon = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M20.5 5.5H3.5V18.5H20.5V5.5ZM2 4V20H22V4H2Z" />
            <rect x="17.5355" y="10" width="1" height="5" transform="rotate(45 17.5355 10)" />
            <rect x="18.2426" y="13.5355" width="1" height="5" transform="rotate(135 18.2426 13.5355)" />
            <circle cx="7" cy="12" r="1" />
            <circle cx="11" cy="12" r="1" />
        </SvgIcon>
    )

}

export default PageMapIcon