import React from 'react';
import MenuList from "@material-ui/core/MenuList"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    actionList: {
        width: "100%",
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
    },
}));

const ActionMenuList = ({className, children}) => {
    const classes = useStyles()

    return (
        <MenuList className={className || classes.actionList}>
            {children}
        </MenuList>
    )

}

export default ActionMenuList