import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

const colors = {
    "blue": "#0067b6",
    "red": "#eb314e"
}

export const EditorIcon = ({color = "grey", ...props}) => {
    color = colors[color] || color

    return (
        <SvgIcon width="64" height="64" viewBox="0 0 64 64" {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M54 10H10V54H54V10ZM51 13H13V51H51V13Z" fill={color}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M40.71 25.63C41.1 26.02 41.1 26.65 40.71 27.04L38.88 28.87L35.13 25.12L36.96 23.29C37.35 22.9 37.98 22.9 38.37 23.29L40.71 25.63ZM23 41V37.25L34.06 26.19L37.81 29.94L26.75 41H23Z" fill="currentColor" fillOpacity="0.54" />
        </SvgIcon>
    )

}

export default EditorIcon