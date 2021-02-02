import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const ButtonDelete = ({className, onClick}) => {

    return (
        <IconButton className={className} color="inherit" aria-label="delete" onClick={onClick}>
            <DeleteIcon />
        </IconButton>
    )

}

export default ButtonDelete;