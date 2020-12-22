import React from 'react';
import MenuItem from "@material-ui/core/MenuItem"
import ListItem from "@material-ui/core/ListItem"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    actionListItem: {
        width: "100%",
        padding: 0,
        "&[role=group] + *": {
            borderTop: "1px solid",
            borderTopColor: theme.palette.divider,
            marginTop: theme.spacing(1.5),
            paddingTop: theme.spacing(1.5),
        },
        "& + &[role=group]": {
            borderTop: "1px solid",
            borderTopColor: theme.palette.divider,
            marginTop: theme.spacing(1.5),
            paddingTop: theme.spacing(1.5),

            "& + *": {
                borderTop: "1px solid",
                borderTopColor: theme.palette.divider,
                marginTop: theme.spacing(1.5),
                paddingTop: theme.spacing(1.5),
            }
        }
    }
}));

const ActionMenuItem = ({className, role, children}) => {
    const classes = useStyles()

    return (
        <ListItem className={className || classes.actionListItem} role={role}>
            {children}
        </ListItem>
    )

}

export default ActionMenuItem