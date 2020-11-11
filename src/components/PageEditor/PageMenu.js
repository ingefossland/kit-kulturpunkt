import React from 'react';
import { NavMenuList, NavMenuItem, NavMenuLink } from "@kit-ui/admin"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    menu: {
        position: "absolute",
        zIndex: 1,
        top: 0,
        right: "auto",
        left: 0,
        bottom: 0,
        margin: 0,
        width: props => { return props.menuWidth },
        transition: ".125s ease-out",

        "& + *": {
            position: "absolute",
            zIndex: 1,
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            margin: 0,
            overflowY: "scroll"
        },

        "&[aria-expanded=true] + *":  {
            marginLeft: props => { return props.menuWidth },
        }
    },
    menuList: {
        margin: theme.spacing(2, 0),
        "& > li + li": {
            marginTop: theme.spacing(1)
        }
    }
}));

const PageMenu = ({className, menuWidth = 224, menu = undefined}) => {
    const classes = useStyles({menuWidth});

    if (!menu) {
        return false
    }

    return (
        <aside className={className || classes.menu} aria-expanded={true}>
            <NavMenuList className={classes.menuList}>
                {menu.map((item, index) => {
                    return (
                        <NavMenuItem key={index}>
                            <NavMenuLink {...item} />
                        </NavMenuItem>
                    )
                })}
            </NavMenuList>
        </aside>
    )

}

export default PageMenu;