import React from "react"

import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"

const NavToolbarButton = ({name, icon, disabled, onClick}) => {

    return (
        <IconButton name={name} onClick={onClick} disabled={disabled}>
            <Icon>{icon}</Icon>
        </IconButton>    
    )

}

export default NavToolbarButton