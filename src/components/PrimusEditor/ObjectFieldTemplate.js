import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";

import { getUiOptions } from '../utils';

const useStyles = makeStyles(theme => ({
    fieldset: {
        padding: props => { return theme.spacing(props.padding) },
    },
    nav: {
        "& > [aria-hidden=true]": {
            display: props => { return !props.hasFormat && "none"},
            opacity: 0,
            pointerEvents: "none",
        }
    },
    flex: {
        display: "flex",
        flexDirection: props => { return !props.inline && "column" }, 
        alignItems: props => { return props.inline && "center" },
        margin: props => { return theme.spacing(props.spacing * -1/2) },

        "& > *": {
            margin: props => { return theme.spacing(props.spacing * 1/2) }   
        }

    },
    flexItem: {
//        margin: props => { return theme.spacing(props.spacing * 1/2) }   
    }
}));
    
const ObjectFieldTemplate = (props) => {
    const uiOptions = getUiOptions(props.uiSchema)

    const { nav, grid, inline = false, spacing = 0, padding = 0, direction, justify, alignItems, format, minHeight } = uiOptions

    const hasFormat = format || minHeight || false

    const classes = useStyles({inline, padding, spacing, direction, justify, alignItems, hasFormat})

    // nav

    if (nav) {
        return (
            <div className={classes.nav} role="tablist">
                {props.properties.map((field, index) => {
                    const fieldUiSchema = field.uiSchema || props.uiSchema[field.name] || {}
                    const fieldUiOptions = getUiOptions(fieldUiSchema) || {}

                    return (
                        <div role="tab" data-name={field.name} aria-hidden={!fieldUiOptions.selected} key={index}>
                            { field.content }
                        </div>
                    )

                })}
            </div>
        )
    }

    // grid

    if (grid) {
        return (
            <div className={classes.fieldset}>
                <Grid className={classes.grid}
                        container
                        spacing={spacing}
                        direction={direction || "row"}
                        justify={justify || "flex-start"}
                        alignItems={alignItems || "flex-start"}
                    >
                    {props.properties.map((field, index) => {
                        const fieldUiSchema = field.uiSchema || props.uiSchema[field.name] || {}
                        const fieldUiOptions = getUiOptions(fieldUiSchema) || {}

                        const { xs, sm, md, lg, xl } = fieldUiOptions

                        return (
                            <Grid data-name={field.name} item key={index} xs={xs} sm={sm} md={md} lg={lg} xl={xl} key={index}>
                                { field.content }
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    }

    // flex

    return (
        <div className={classes.fieldset}>
            <div className={classes.flex}>
                { props.properties.map((field, index) => {
                    return (
                        <div className={classes.flexItem} data-name={field.name} key={index}>
                            { field.content }
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default ObjectFieldTemplate