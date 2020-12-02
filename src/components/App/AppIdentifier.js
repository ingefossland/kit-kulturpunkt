import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    section: {
        height: theme.spacing(8),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    primaryToggle: {
        width: theme.spacing(6)
    },
    secondaryToggle: {
        width: theme.spacing(6)
    },
    button: {
        color: "inherit",
    },
    content: {
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        justifyContent: props => { return props.justifyContent },
        height: theme.spacing(8),
        margin: theme.spacing(1)
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "18px",
        fontWeight: "bold",
        color: props => { return theme.palette.header && theme.palette.header.title || theme.palette.primary.contrastText },
    },
    divider: {
        backgroundColor: theme.palette.primary.contrastText,
        width: "1px",
        height: theme.spacing(3),
        opacity: 0.85,
        margin: theme.spacing(1.5),

        [theme.breakpoints.down('xs')]: {
            display: "none"
        },

    },
    subtitle: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "18px",
        fontWeight: "normal",
        opacity: 0.85,

        [theme.breakpoints.down('xs')]: {
            display: "none"
        },

    }
}));

const AppMenuToggle = ({menu, onToggle}) => {
    const classes = useStyles()

    if (!menu) {
        return false
    }

    return (
        <IconButton className={classes.button} onClick={onToggle}>
            <MenuIcon />
        </IconButton>
    )

}

const AppSearchToggle = ({search, onToggle}) => {

    const classes = useStyles()

    if (!search || search.variant === "growing") {
        return false
    }

    return (
        <IconButton className={classes.button} onClick={onToggle}>
            <SearchIcon />
        </IconButton>
    )

}

const AppIdentifier = ({className, expanded, menu, search, title, subtitle, justifyContent = "center"}) => {


    const classes = useStyles({search, justifyContent})
    
    const toggleSearch = () => {
        search && search.onToggle && search.onToggle()
    }

    const toggleMenu = () => {
        menu && menu.onToggle && menu.onToggle()
    }

    return (
        <div className={className || classes.root} aria-expanded={expanded}>
            <div className={classes.section}>
                <div className={classes.primaryToggle}>
                    { menu && <AppMenuToggle menu={menu} onToggle={toggleMenu} /> }
                    { !menu && <AppSearchToggle search={search} onToggle={toggleSearch} /> }
                </div>
                <div className={classes.content}>
                    <Typography component="h1" className={classes.title} noWrap>{title}</Typography>
                    { title && subtitle && <div className={classes.divider}></div> }
                    <Typography component="h2" className={classes.subtitle} noWrap>{subtitle}</Typography>
                </div>
                <div className={classes.secondaryToggle}>
                    { menu && <AppSearchToggle search={search} onToggle={toggleSearch} /> }
                </div>
            </div>
        </div>
    )

}

AppIdentifier.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
}

export default AppIdentifier;