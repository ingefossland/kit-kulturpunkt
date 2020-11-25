import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { renderToStaticMarkup } from 'react-dom/server'
import reactElementToJSXString from 'react-element-to-jsx-string';
import pretty from 'pretty';

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import PreviewCodeRender from "./PreviewCodeRender"

import { ThemeProvider } from '@material-ui/core/styles';

import themeDark from "./PreviewCode.themeDark"
import themeLight from "./PreviewCode.themeLight"

const themes = {
    "light": themeLight,
    "dark": themeDark
}

function isJSON(something) {
    try {
        JSON.parse(JSON.stringify(something));
        return true;
    } catch (e) {
        return false;
    }
}

function isClassComponent(component) {
    return (
        typeof component === 'function' && 
        !!component.prototype.isReactComponent
    ) ? true : false
}

function isFunctionComponent(component) {
    return (
        typeof component === 'function' && 
        String(component).includes('return React.createElement')
    ) ? true : false;
}

function isReactComponent(component) {
    return (
        isClassComponent(component) || 
        isFunctionComponent(component)
    ) ? true : false;
}

function isElement(element) {
    return React.isValidElement(element);
}

function isDOMTypeElement(element) {
    return isElement(element) && typeof element.type === 'string';
}

function isCompositeTypeElement(element) {
    return isElement(element) && typeof element.type === 'function';
}

const preTag = ({className, theme, language, children, ...props}) => {

    return (
        <pre className={className} data-theme={theme} data-language={language}>{children}</pre>
    )
            
}

const PreviewCode = ({theme = "dark", language, data, children}) => {

    let value = data || children

    if (isJSON(value)) {
        language = "json"
        value = JSON.stringify(value, 0, 2);
    } else if (typeof value === "function") {
        language = "javascript"
        value  = value.toString()
    } else if (isCompositeTypeElement(value)) {
        language = "jsx"
        value = reactElementToJSXString(value)
    } else if (isDOMTypeElement(value)) {
        value = pretty(renderToStaticMarkup(value))
    }
    
    if (!value || typeof value !== "string") {
        return false;
    }
    
    value = value.trim();

    
    return (
        <ThemeProvider theme={themes[theme] || themeLight}>
            <SyntaxHighlighter data-theme={theme} data-language={language} language={language} style={false} wrapLines={true} useInlineStyles={false}
                PreTag={(props) => PreviewCodeRender({...props, theme, language})}>{value}</SyntaxHighlighter>
        </ThemeProvider>
    )    
}

PreviewCode.propTypes = {
    language: PropTypes.string,
    theme: PropTypes.string,
    data: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.func
    ])   
}

export default PreviewCode;