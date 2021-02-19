import React from "react";
import PropTypes from "prop-types"
import SvgIcon from '@material-ui/core/SvgIcon';

const MenuIconFilled = ({text = "Ap", ...props}) => {

    const backgroundColor = "currentColor"
    const color = "white"

    return (
        <SvgIcon {...props} viewBox="0 0 24 24" {...props}>
            <rect x="2" y="2" width="20" height="20" fill={backgroundColor}></rect>
            <text x="12" y="13" fill="white" fontFamily="Akkurat, sans-serif" fontSize="10" fontWeight="bold" dominantBaseline="middle" textAnchor="middle">{text}</text>
        </SvgIcon>
    )

}

const MenuIconOutlined = ({text = "Ap", ...props}) => {

    const backgroundColor = "white"
    const color = "currentColor"
    const borderColor = color

    return (
        <SvgIcon {...props} viewBox="0 0 24 24" {...props}>
            <rect x="2" y="2" width="20" height="20" fill={borderColor}></rect>
            <rect x="3.5" y="3.5" width="17" height="17" fill={backgroundColor}></rect>
            <text x="12" y="13" fill={color} fontFamily="Akkurat, sans-serif" fontSize="10" fontWeight="bold" dominantBaseline="middle" textAnchor="middle">{text}</text>
        </SvgIcon>
    )

}

const variants = {
    "outlined": MenuIconOutlined,
    "filled": MenuIconFilled,
}

const MenuIcon = ({color, text, variant = "outlined", ...props}) => {
    const IconTemplate = variants && variants[variant]

    if (!IconTemplate) {
        return "<p>Failed</p>"
    }

    return (
        <IconTemplate color={color} text={text} {...props} />
    )
    
}

MenuIcon.propTypes = {
    variant: PropTypes.oneOfType([PropTypes.oneOf(['filled', 'outlined']), PropTypes.string]),
}

export default MenuIcon