import React from "react"

import "./css/Akkurat.css"
import "./css/AkkuratMono.css"
import "./css/MaterialIcons.css"

import { Canvas } from '@storybook/addon-docs/blocks';

const Preview = ({children, ...props}) => {

    return (
        <Canvas {...props} children={children}>
            <div style={{minHeight:400, position: "relative"}}>
                {children}
            </div>
        </Canvas>
    )

}

const alphaSort = (a, b) => a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })


const storySort = {
    order: ['About', "App", "Finder", "Calendar", "Editor", "Module", "Media", [alphaSort], "Widget"]
}



export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    options: {
        storySort: storySort
    },
    docs: {
        components: {
            Preview: Preview,
        }
    },
}