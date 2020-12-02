import React from "react"

import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"

import ButtonSelect from "./ButtonSelect"

const NavToolbarButton = (props) => {

    const {name, icon, disabled, onClick} = props

    if (name === "select") {
        return <ButtonSelect {...props} />
    }

    return (
        <IconButton name={name} onClick={onClick} disabled={disabled}>
            <Icon>{icon}</Icon>
        </IconButton>    
    )

}

export default NavToolbarButton