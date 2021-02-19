import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const ButtonEdit = ({className, onClick}) => {

    return (
        <IconButton className={className} color="inherit" aria-label="edit" onClick={onClick}>
            <EditIcon />
        </IconButton>
    )

}

export default ButtonEdit;