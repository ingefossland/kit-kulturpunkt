import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {

    },
    input: {
        backgroundColor: "white",

        "& .MuiFilledInput-root": {
//            backgroundColor: "rgba(255,255,255,.9)",

            "&.Mui-focused": {
                backgroundColor: "white"
            }

        }

        
    }
}));

const GeopointAutocomplete = ({className, onChange}) => {
    const [autocomplete, setAutocomplete] = useState(null) 

    const handleChange = () => {
        if (autocomplete !== null) {
            onChange && onChange(autocomplete.getPlace())
        } else {
            console.log('Autocomplete is not loaded yet!')
        }        
    }

    const classes = useStyles()

    return (
        <div className={className || classes.root}>
            <Autocomplete
                options={{
                    types: "geocode"
                }}
                onLoad={(autocomplete) => setAutocomplete(autocomplete)}
                onPlaceChanged={handleChange}
            >
                <TextField className={classes.input} label="Find location" placeholder="Enter a place" variant="filled" fullWidth />
            </Autocomplete>
      </div>
    )        

}

export default GeopointAutocomplete;