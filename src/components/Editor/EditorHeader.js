import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import EditorPath from "./EditorPath"
import EditorLocale from "./EditorLocale"
import EditorStatus from "./EditorStatus"
import EditorAction from "./EditorAction"
import EditorToggle from "./EditorToogle"

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        maxWidth: "100%",
        width: "100%",
        minHeight: theme.spacing(8),

        "& + *": {
            marginTop: theme.spacing(8)
        }

    },
    leading: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexWrap: "nowrap",
        maxWidth: "100%",
    },
    path: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexWrap: "nowrap",
    },
    locale: {
        marginLeft: theme.spacing(1)
    },
    trailing: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            display: "none",
        }
    },
    status: {
        fontSize: "14px",
        margin: theme.spacing(1.5)
    },
    action: {
        fontSize: "14px",
    }
}));

const EditorHeader = ({collapsible, expanded, onToggle, onSelect, className, ...props}) => {
    const classes = useStyles()

    return (
        <header className={className || classes.root}>
            <div className={classes.leading}>
                <EditorPath {...props} className={classes.path} onSelect={onSelect} />
                <EditorLocale {...props} className={classes.locale} />
                { collapsible && <EditorToggle expanded={expanded} onClick={onToggle} /> }
            </div>
            <div className={classes.trailing}>
                <EditorStatus {...props} className={classes.status} />
                <EditorAction {...props} className={classes.action} />
            </div>
        </header>
    )

}

EditorHeader.defaultProps = {
    untitled: "Untitled"
}

EditorHeader.propTypes = {
    status: PropTypes.string,
    statusLabel: PropTypes.string,
    statusDate: PropTypes.string,
    statusCode: PropTypes.string,
    statusMessage: PropTypes.string,
    untitled: PropTypes.string,
    title: PropTypes.string,
    parents: PropTypes.array,
    languages: PropTypes.array,
    currentLocale: PropTypes.string,
    onLocale: PropTypes.func,
    primaryAction: PropTypes.object,

} 

export default EditorHeader;