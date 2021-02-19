import React from 'react';
import PrimusEditor from "./PrimusEditor";
import ClassificationTags from "./ClassificationTagsField"
import model from "./Classification.model"

export default {
    title: 'uiFields/ClassificationTags',
    component: ClassificationTags,
    args: {
        ...model,
        "uiSchema": {
            "ui:field": ClassificationTags
        }
    },
    argTypes: {
    },
};

const Template = (args) => <PrimusEditor {...args} />

export const Default = Template.bind({});
Default.args = {
    formData: []
}