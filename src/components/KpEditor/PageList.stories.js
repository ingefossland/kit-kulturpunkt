import React from 'react';
import KpEditor from "./KpEditor";
import model from "./PageMap.model"

export default {
    title: 'KpEditor/PageList',
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