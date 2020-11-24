import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import RestoreIcon from '@material-ui/icons/Restore';

const ButtonRestore = ({className, onClick}) => {

    return (
        <IconButton className={className} color="inherit" aria-label="restore" onClick={onClick}>
            <ButtonRestore />
        </IconButton>
    )

}

export default ButtonRestore;