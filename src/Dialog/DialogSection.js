import React, { useRef, useState, useEffect } from 'react';
import { withResizeDetector } from 'react-resize-detector';
import { makeStyles } from '@material-ui/core/styles';
import _ from "lodash"

const useStyles = makeStyles(theme => ({
    section: {
        position: "absolute",
        zIndex: 1,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflowY: "scroll",
    }
}));

const DialogSection = ({height, onScroll, children}) => {
    const classes = useStyles()

    const parentRef = useRef()

    const handleScroll = _.debounce((event) => {
        onScroll && onScroll(event)
    }, 500)

    useEffect(() => {
        const ph = parentRef.current && parentRef.current.offsetHeight
        const ch = parentRef.current && parentRef.current.children && parentRef.current.children[0] && parentRef.current.children[0].offsetHeight

        parentRef.current.addEventListener("scroll", handleScroll);

        if (ph < ch) {
//            setOverflow(true)
        }

        return () => {
            parentRef.current.removeEventListener("scroll", handleScroll);
        };

    }, [children, height]);


    return (
        <section className={classes.section} ref={parentRef}>
            {children}
        </section>
    )
}

export default withResizeDetector(DialogSection)