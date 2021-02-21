import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

const ObjectIcon = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M18.5 20.5L18.5 3.5L5.5 3.5L5.5 20.5H18.5ZM20 2L4 2L4 22H20V2Z"/>
            <path d="M14 8H13V16H14V8Z" fill="black"/>
            <path d="M11 8H10V16H11V8Z" fill="black"/>
            <path d="M16 10H8V11H16V10Z" fill="black"/>
            <path d="M16 13H8V14H16V13Z" fill="black"/>
        </SvgIcon>
    )
}

export default ObjectIcon