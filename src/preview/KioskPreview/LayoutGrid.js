import React from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        maxWidth: props => { return props.maxWidth },
        overflow: "hidden",
        margin: "auto"
    },
    grid: {
        margin: props => { return theme.spacing(-props.spacing/2) },
        display: "flex",
        flexWrap: "wrap",
    },
    item: {
        width: props => { return (props.maxWidth+theme.spacing(props.spacing))/props.gridColumns },
        padding: props => { return theme.spacing(props.spacing/2) },
        "&[data-size=medium]": {
            width: props => { return (props.maxWidth+theme.spacing(props.spacing))/props.gridColumns*2 },
        },
        "&[data-size=large]": {
            width: props => { return (props.maxWidth+theme.spacing(props.spacing))/props.gridColumns*4 },
        },
        "&[data-size=xl]": {
            width: props => { return props.maxWidth+theme.spacing(props.spacing) },
        }
    }

}));


const LayoutGrid = ({className, spacing = 2, padding = 0, maxWidth = 720, gridColumns = 4, children}) => {
    const classes = useStyles({maxWidth, gridColumns, spacing, padding})

    return (
        <section className={className || classes.wrapper}>
            <div className={className || classes.grid}>
                {children.map((child, index) => {
                    const item = React.cloneElement(child)
                    return (
                        <div className={classes.item} data-size={item.props.size} key={index}>
                            { item }
                        </div>
                    )
                })}
            </div>
        </section>
    )

}

export default LayoutGrid