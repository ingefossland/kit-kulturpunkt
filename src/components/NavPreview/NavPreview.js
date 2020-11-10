
import React from "react"
import Chip from '@material-ui/core/Chip';

const PreviewChip = ({label, selected, onClick}) => {

    if (selected) {
        return (
            <Chip
                label={label}
                color="primary"
            />
        )
    }

    return (
        <Chip
            label={label}
            color="default"
            onClick={onClick}
        />
    )

}

const NavPreview = ({className, menu = [], onSelect}) => {

    return (
        <nav className={className}>
            {menu.map((item, index) => (<PreviewChip {...item} key={index} onClick={() => onSelect(item)} />))}
        </nav>
    )
    
}

export default NavPreview