import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

import PropTypes from "prop-types"

const colors = {
    "blue": "#0067b6",
    "red": "#eb314e"
}

const AppIcon = ({color, text, variant = "outlined", ...props}) => {

    color = colors[color] || color

    if (variant === "filled") {

        return (
            <SvgIcon width="64" height="64" viewBox="0 0 64 64" {...props}>
                <rect x="10" y="10" width="44" height="44" fill={color}></rect>
                <text x="32" y="34" fill="white" fontFamily="Akkurat, sans-serif" fontSize="18" fontWeight="bold" dominantBaseline="middle" textAnchor="middle">{text}</text>
            </SvgIcon>
        )
            
    }

    return (
        <SvgIcon width="64" height="64" viewBox="0 0 64 64" {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M54 10H10V54H54V10ZM51 13H13V51H51V13Z" fill={color}/>
            <text x="32" y="34" fill="currentColor" fontFamily="Akkurat, sans-serif" fontSize="18" fontWeight="bold" dominantBaseline="middle" textAnchor="middle">{text}</text>
        </SvgIcon>
    )
    
}

AppIcon.propTypes = {
    fontSize: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string,PropTypes.number]),
    variant: PropTypes.oneOfType([PropTypes.oneOf(['filled', 'outlined']), PropTypes.string]),
}

export default AppIcon