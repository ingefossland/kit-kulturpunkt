import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { create } from 'jss';
import { makeStyles, withStyles, useTheme, jssPreset, StylesProvider } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import rtl from 'jss-rtl';
import Frame from 'react-frame-component';

const useStyles = theme => ({
    frame: {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100%",
        border: 'none',
    },
});

const PreviewIframe = (props) => {
    const { children, classes, ...other } = props;
    const theme = useTheme();
    const [state, setState] = useState({
        ready: false,
    });
    
    const instanceRef = React.useRef();

    const handleRef = React.useCallback((ref) => {
        instanceRef.current = {
            contentDocument: ref ? ref.node.contentDocument : null,
            contentWindow: ref ? ref.node.contentWindow : null,
        };
    }, []);

    const onContentDidMount = () => {
        setState({
            ready: true,
            jss: create({
            plugins: [...jssPreset().plugins, rtl()],
            insertionPoint: instanceRef.current.contentWindow['demo-frame-jss'],
            }),
            sheetsManager: new Map(),
            container: instanceRef.current.contentDocument.body,
            window: () => instanceRef.current.contentWindow,
        });
    };

    const onContentDidUpdate = () => {
        instanceRef.current.contentDocument.body.dir = theme.direction;
    };

//    const wrapper = useStyles()

    // NoSsr fixes a strange concurrency issue with iframe and quick React mount/unmount
    return (
        <NoSsr defer>
            <Frame
                ref={handleRef}
                className={classes.frame}
                contentDidMount={onContentDidMount}
                contentDidUpdate={onContentDidUpdate}
                {...other}
            >
            <div id="demo-frame-jss" />
                {state.ready ? (
                <StylesProvider jss={state.jss} sheetsManager={state.sheetsManager}>
                    {React.cloneElement(children, {
                    container: state.container,
                    window: state.window,
                    })}
                </StylesProvider>
                ) : null}
            </Frame>
        </NoSsr>
    )
}

PreviewIframe.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(useStyles)(PreviewIframe);