import React from 'react';
import PropTypes from "prop-types"
import Dropzone from 'react-dropzone'
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDoneIcon from '@material-ui/icons/CloudDone';

import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    upload: {
        position: "sticky",
        zIndex: 2,
        bottom: 0,
        color: "inherit",

        minHeight: theme.spacing(16),

        "&[aria-expanded=true]": {
            top: 0,
            height: "100%",

            "& $dropzone": {
                margin: 0
            },

            "& $dropButton": {
                border: 0
            }

        },

       "& + *": {
            marginTop: theme.spacing(8),
        }
   
    },
    closeButton: {
        position: "absolute",
        zIndex: "2",
        top: "0",
        right: "0",
        margin: theme.spacing(1),
    },
    dropzone: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "inherit",
//        overflow: "hidden",
        margin: theme.spacing(2),
    },
    dropButton: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid",
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.default,
        backgroundColor: "#eee",
        color: theme.palette.text.secondary,

        "&:hover": {
            cursor: "pointer"
        },

        "& > *": {
            margin: theme.spacing(.5)
        },

    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        fontWeight: "normal"
    },

}));

const DialogUpload = ({className, accept, multiple, onUpload, onCancel, currentUpload = {}, children, expanded = false, ...props}) => {
    const { t, i18n } = useTranslation('dialog');
    const classes = useStyles()

    const handleDrop = (acceptedFiles, rejectedFiles) => {
        onUpload && onUpload(acceptedFiles)
        console.log('acceptedFiles', acceptedFiles)
        console.log('rejectedFiles', rejectedFiles)
    }

    const { requested, received } = currentUpload;

    let label

    if (!expanded) {
        label = t('Upload more');
    } else if (received > 0 && requested < received) {
        label = t('Uploading {{requested}} of {{received}}', { requested, received }) + "...";
    } else {
        label = t('Click or drop files to upload');
    }

    const ButtonClose = ({className, onClick}) => {
        return (
            <IconButton className={className} onClick={onClick}>
                <CloseIcon />
            </IconButton>
        )
    }

    return (
        <div className={classes.upload} aria-expanded={expanded}>
            <Dropzone multiple={multiple} accept={accept} onDrop={handleDrop}>
                {({getRootProps, getInputProps}) => (
                    <div className={classes.dropzone} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Paper className={classes.dropButton} elevation={1} square={true}>
                            <CloudUploadIcon className={classes.icon} />
                            <Typography className={classes.label}>{label}</Typography>
                        </Paper>
                    </div>
                )}
            </Dropzone>
            {expanded && <ButtonClose className={classes.closeButton} onClick={onCancel} /> }
        </div>
    )
    
}

DialogUpload.propTypes = {
    onUpload: PropTypes.func
}

DialogUpload.defaultProps = {
    multiple: true,
    accept: "image/*, video/*, audio/*",
}

export default DialogUpload