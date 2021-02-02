import React from 'react';
import KpEditor from "./KpEditor";
import model from "./KpDevice.model"

export default {
    title: 'KpEditor/KpDevice',
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