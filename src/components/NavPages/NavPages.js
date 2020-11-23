import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

const NavPages = ({count, page, onChange}) => {
    const classes = useStyles();

    const _onChange = (event, value) => {
        onChange && onChange(value, event)
    };
  
    return (
        <div className={classes.root}>
            <Pagination count={count} page={page} onChange={_onChange} />
        </div>
    );
    
}

export default NavPages;