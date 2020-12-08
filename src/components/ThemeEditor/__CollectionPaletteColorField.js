import React, { useState, useEffect } from 'react';
import Color from 'color';
import { getDefaultFormState } from "@frontend-components/admin"
import createPalette from '@material-ui/core/styles/createPalette';
import { makeStyles } from "@material-ui/core/styles" 

const useStyles = makeStyles(theme => ({
    root: {
    },
    mainColor: {
    }
}));


const CollectionPaletteField = ({formData, schema, ...props}) => {
    const { main, light, dark, contrastText } = formData

    let palette = {};

    if (main) {
        palette = createPalette({primary: { main: main}})
    }

    const color = palette && palette.primary

    const lightDefault = color && color.light && Color(color.light).hex()
    const darkDefault = color && color.dark && Color(color.dark).hex()
    const contrastTextDefault = color && color.contrastText && Color(color.contrastText).hex()

    const newSchema = color && {
        ...schema,
        properties: {
            ...schema.properties,
            light: {
                ...schema.properties.light,
                default: lightDefault
            },
            dark: {
                ...schema.properties.dark,
                default: darkDefault
            },
            contrastText: {
                ...schema.properties.contrastText,
                default: contrastTextDefault
            }
        }
    } || schema

    

    const { ObjectField } = props.registry.fields

    return (
        <div>
            {JSON.stringify(newSchema)}
            <div>{palette && palette.primary && JSON.stringify(palette.primary)}</div>
            <ObjectField {...props} schema={newSchema} formData={formData} />
        </div>        
    )
    
}

export default CollectionPaletteField;
