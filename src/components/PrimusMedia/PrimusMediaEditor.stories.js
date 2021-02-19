import React from 'react';
import PrimusEditor from "../PrimusEditor/PrimusEditor";
import PrimusMediaEditor from "./PrimusMediaEditorField"
import model from "./PrimusMedia.model"

export default {
    title: 'Editor/PrimusMediaEditor',
    component: PrimusMediaEditor,
    args: {
        ...model,
        "uiSchema": {
            ...model.uiSchema,
            "ui:field": PrimusMediaEditor
        }
    },
    argTypes: {
    },
};

const Template = (args) => <PrimusEditor {...args} />

export const Default = Template.bind({});
Default.args = {
}