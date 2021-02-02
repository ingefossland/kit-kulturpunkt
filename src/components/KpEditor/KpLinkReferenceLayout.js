import React, { Component } from 'react';
import { ListModule } from "@kit-ui/admin"
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';

const useStyles = makeStyles(theme => ({
    reference: {
        border: "1px solid",
        borderColor: theme.palette.divider,
        
        "&:hover $preview": {
            opacity: .5,
        }

    },
}));

const KpLinkReferenceLayout = (props) => {

    const { referenceId, reference, onChange, onDialog } = props;

    const classes = useStyles()

    const _onAddLink = () => {
        onDialog && onDialog(props)
    }

    const _onRemoveLink = () => {
        onChange && onChange({
            referenceId: undefined, 
            reference: {}
        })
    }

    const LinkAddButton = ({onClick}) => {
        return (
            <IconButton onClick={onClick}>
                <LinkIcon />
            </IconButton>
        )
    }

    const LinkRemoveButton = ({onClick}) => {
        return (
            <IconButton onClick={onClick}>
                <LinkOffIcon />
            </IconButton>
        )
    }


    if (referenceId && reference) {
        return (
            <div className={classes.reference}>
                <ListModule {...reference} startAdornment={<LinkRemoveButton onClick={_onRemoveLink} />} />
            </div>
        )
    }

    return (
        <div className={classes.reference} onClick={_onAddLink}>
            <ListModule untitled="Add a link" startAdornment={<LinkAddButton />} />
        </div>
    )

}

export default KpLinkReferenceLayout