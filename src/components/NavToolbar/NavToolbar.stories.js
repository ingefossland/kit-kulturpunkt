import React from 'react';
import NavToolbar from './NavToolbar';

export default {
    title: 'Navigation/NavToolbar',
    component: NavToolbar,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <NavToolbar {...args} />

export const Default = Template.bind({});
Default.args = {
 
}

export const Editable = Template.bind({});
Editable.args = {
    editable: true,
}

export const EditableDeletable = Template.bind({});
EditableDeletable.args = {
    editable: true,
    deletable: true
}

export const Deleted = Template.bind({});
Deleted.args = {
    editable: true,
    deletable: true,
    deleted: true
}

export const DeletedErasable = Template.bind({});
DeletedErasable.args = {
    editable: true,
    deletable: true,
    deleted: true,
    erasable: true
}

export const DeletedRestorable = Template.bind({});
DeletedRestorable.args = {
    deleted: true,
    restorable: true
}

export const DeletedRestorableErasable = Template.bind({});
DeletedRestorableErasable.args = {
    deleted: true,
    restorable: true,
    erasable: true
}

export const Hideable = Template.bind({});
Hideable.args = {
    hideable: true,
}

export const HideableHidden = Template.bind({});
HideableHidden.args = {
    hideable: true,
    hidden: true
}

export const MultipleOptions = Template.bind({});
MultipleOptions.args = {
    hideable: true,
    deletable: true,
    restoreable: true
}

export const CustomToolbar = Template.bind({});
CustomToolbar.args = {
    toolbar: [
        {
            name: "size",
            value: "small",
            options: [
                {
                    value: "small"
                },
                {
                    value: "medium"
                },
                {
                    value: "large"
                }
            ]
        },
        {
            name: "color",
            value: "#ff0",
            options: [
                {
                    value: "red"
                },
                {
                    value: "blue"
                },
                {
                    value: "green"
                }
            ]
        }
    ]
}