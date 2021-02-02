import React from 'react';
import KpEditor from "./KpEditor";
import model from "./PageAnnotate.model"

export default {
    title: 'KpEditor/PageAnnotate',
    component: KpEditor,
    args: {
        ...model,
        "formContext": {
            "parents": [
                {
                    "title": "Kp",
                }
            ]
        }
    },
    argTypes: {
    },
};

const Template = (args) => <KpEditor {...args} />

export const Default = Template.bind({});
Default.args = {
}