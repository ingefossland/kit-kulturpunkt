import React from 'react';
import PreviewJSON from './PreviewJSON';

export default {
    title: 'Preview/PreviewJSON',
    component: PreviewJSON,
    args: {
        data: {
            "glossary": {
                "title": "example glossary",
                "string": "A string",
                "boolean": true,
                "boolean": false,
                "number": 5,
                "GlossDiv": {
                    "title": "S",
                    "GlossList": {
                        "GlossEntry": {
                            "ID": "SGML",
                            "SortAs": "SGML",
                            "GlossTerm": "Standard Generalized Markup Language",
                            "Acronym": "SGML",
                            "Abbrev": "ISO 8879:1986",
                            "GlossDef": {
                                "para": "A meta-markup language, used to create markup languages such as DocBook.",
                                "GlossSeeAlso": ["GML", "XML"]
                            },
                            "GlossSee": "markup"
                        }
                    }
                }
            }
        }
    },
    argTypes: {
    },
    
};

const Template = (args) => <PreviewJSON {...args} />;

export const Default = Template.bind({});
Default.args = {
}

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    theme: "dark"
}