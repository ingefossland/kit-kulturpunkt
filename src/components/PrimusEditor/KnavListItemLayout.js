import React from "react"
import { NavToolbar } from "@kit-ui/admin"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    listItem: {
        width: "100%",
        display: "flex",
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        backgroundColor: "rgba(0,0,0,.09)",
        borderBottom: "1px solid",
        borderBottomColor: theme.palette.divider,
    },
    startAdornment: {
        height: theme.spacing(7),
        marginRight: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    endAdornment: {
        height: theme.spacing(7),
        marginLeft: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        flexBasis: 0,
        flexGrow: 1,
    },
    toolbar: {
    }
}));

const PrimusListItemLayout = ({children, startAdornment, toolbar}) => {

    const classes = useStyles()

    return (
        <div className={classes.listItem}>
            { startAdornment && <div className={classes.startAdornment}>{startAdornment}</div> }
            <div className={classes.content}>
                {children}
            </div>
            <div className={classes.endAdornment}>
                <NavToolbar toolbar={toolbar} />
            </div>
        </div>
    )

}

export default PrimusListItemLayout