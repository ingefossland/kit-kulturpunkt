import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        overflowY: "scroll",
        fontFamily: "Akkurat Mono",
        fontVariantLigatures: "none",
        fontSize: "14px",
        lineHeight: 1.5,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.secondary,
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",

        margin: 0,
        padding: theme.spacing(1),

        "& .string": {
            color: theme.palette.code.string
        },
        "& .number": {
            color: theme.palette.code.number
        },
        "& .boolean": {
            color: theme.palette.code.boolean
        }

    },
}));

const PreviewCodeRender = ({theme, language, children, ...props}) => {
    const classes = useStyles()

    return (
        <pre className={classes.root} data-theme={theme} data-language={language}>{children}</pre>
    )
            
}

export default PreviewCodeRender;