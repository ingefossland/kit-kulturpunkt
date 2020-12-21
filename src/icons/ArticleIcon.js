import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

const ArticleIcon = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M18.5 20.5L18.5 3.5L5.5 3.5L5.5 20.5H18.5ZM20 2L4 2L4 22H20V2Z"/>
            <rect x="8" y="8.5" width="8" height="1" />
            <rect x="8" y="10.5" width="8" height="1" />
            <rect x="8" y="12.5" width="8" height="1" />
            <rect x="8" y="14.5" width="5" height="1" />
        </SvgIcon>
    )
}

export default ArticleIcon