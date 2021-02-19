import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

import Metadata from "./Metadata"

const useStyles = makeStyles(theme => ({
    list: {
        width: "100%",
        listStyle: "none",
        padding: 0,
        margin: 0,

        fontFamily: "Akkurat, sans-serif",
        fontSize: "0.875em",
        lineHeight: 1.5,
        borderTop: "1px solid",
        borderColor: "#808080",
        paddingTop: "1em",
        marginTop: "1.5em",
        marginBottom: "1.5em",

    },
    item: {

        "& + $item": {
            marginTop: "0.75em"
        }

    },
    header: {
        color: theme.palette.text.primary
    },
    body: {
        color: theme.palette.text.secondary
    },
    label: {
        fontWeight: 'normal',
        textTransform: 'uppercase',

        "&:after": {
            content: '": "'
        }
    },
    title: {
        fontWeight: 'normal',
    },
    link: {
        borderBottom: "1px solid",
        borderColor: "rgba(0,0,0,.5)",
        "&:hover": {
            cursor: "pointer",
            borderColor: theme.palette.text.primary
        }
    },
    code: {
        display: 'inline-block',
        verticalAlign: 'middle',
        border: '1px solid rgba(128, 128, 128, 0.5)',
        padding: '0.25em 0.5em',
        borderRadius: '2px',
        margin: '-1px 0',
        fontSize: '0.625em',
        lineHeight: '1',
        fontWeight: 'normal',
        textTransform: 'uppercase',
        letterSpacing: '0.075em',   
    },
    value: {
        fontStyle: "normal",

        "& + $value": {
            "&:before": {
                content: '", "'
            }
        }
    }
}));

const Events = ({items = []}) => {

    const classes = useStyles()

    const EventList = ({children}) => {
        return (
            <ul className={classes.list}>{children}</ul>
        )
    }

    const EventPerson = ({value}) => {
        return (
            <li>
                {value}
            </li>
        )
    }    

    const EventPeople = ({items = []}) => {

        return (
            <ul className={classes.people}>{items && items.map((item, index) => <EventPerson {...item} key={index} />)}</ul>
        )

    }

    const EventPlace = ({value}) => {
        return (
            <li>
                {value}
            </li>
        )
    }    

    const EventPlaces = ({items = []}) => {

        return (
            <ul className={classes.places}>{items && items.map((item, index) => <EventPlace {...item} key={index} />)}</ul>
        )

    }


    const EventItem = ({dating, eventType, description, people, places}) => {

        return (
            <li className={classes.item}>
                <header className={classes.header}>
                    <span className={classes.label}>{dating && dating.value}</span>
                    <span className={classes.title}>{eventType && eventType.value}</span>
                </header>
                <div className={classes.body}>
                    { people && <EventPeople items={people} />}
                    { places && <EventPlaces items={places} />}
                </div>
            </li>
        )

    }

    return (
        <EventList>
            {items.map((item, index) => <EventItem {...item} key={index} />)}
        </EventList>
    )


}

export default Events;