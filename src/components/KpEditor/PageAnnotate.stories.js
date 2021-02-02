import React from 'react';
import KpEditor from "./KpEditor";
import model from "./PageAnnotate.model"
import formData from "./PageAnnotate.formData"

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

export const WithLegends = Template.bind({});
WithLegends.args = {
    formData: {
        ...formData,
        content: {
            ...formData.content,
            "annotateLayout": "legends"
        }
    }
}