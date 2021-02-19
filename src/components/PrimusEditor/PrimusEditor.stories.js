import React from 'react';
import PrimusEditor from "./PrimusEditor";
import model from "./models/artwork/model"

export default {
    title: 'Editor/PrimusEditor',
    component: PrimusEditor,
    args: {
        ...model,
        "formData": model.formData,
        "formContext": {
            "parents": [
                {
                    "title": "Primus art",
                }
            ]
        }
    },
    argTypes: {
    },
};

const Template = (args) => <PrimusEditor {...args} />

export const Default = Template.bind({});
Default.args = {
}
