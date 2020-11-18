import React from 'react';
import NavCalendar from "../NavCalendar/NavCalendar"

import NavMenuLink from "./NavMenuLink"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {

    },

}));


const NavMenuTags = ({expanded, date, onSelect}) => {

    const classes = useStyles()

    const _onChange = (date) => {

    }

    return (
        <NavCalendar date={date} onChange={_onChange} />

    )

}

export default NavMenuTags;
