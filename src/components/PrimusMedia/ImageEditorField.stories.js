import React from 'react';
import PrimusEditor from "../PrimusEditor/PrimusEditor";
import ImageEditorField from "./ImageEditorField"
import model from "./ImageEditor.model"

export default {
    title: 'Editor/ImageEditor',
    component: ImageEditorField,
    args: {
        ...model,
        "uiSchema": {
            ...model.uiSchema,
            "ui:expanded": true,
            "ui:field": ImageEditorField
        }
    },
    argTypes: {
    },
};

const Template = (args) => <PrimusEditor {...args} />

export const Default = Template.bind({});
Default.args = {
}