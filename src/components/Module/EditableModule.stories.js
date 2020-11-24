import React from 'react';
import EditableModule from './EditableModule';

import { ColorSettings } from "../"

export default {
    title: 'Module/Variant/EditableModule',
    component: EditableModule,
    args: {
        imageUrl: "https://dms-test.dimu.org/image/012uNXVpKSZo?mediaType=image/png",
        title: "Title",
        description: "description",
        metadata: ["25kb"],
        status: "publish",
        type: "document"
    },
    argTypes: {
    },
};

const Template = (args) => <EditableModule {...args}><div>{JSON.stringify(args, 0, 2)}</div></EditableModule>

export const Default = Template.bind({});
Default.args = {
}

export const Editing = Template.bind({});
Editing.args = {
    editing: true
}

export const EditingMenu = Template.bind({});
EditingMenu.args = {
    editing: true,
    menu: [
        {
            title: "Menu 1"
        },
        {
            title: "Menu 2"
        }
    ]
}


export const EditingButtons = Template.bind({});
EditingButtons.args = {
    editing: true,
    buttons: [
        {
            title: "Button 1"
        },
        {
            title: "Button 2"
        }
    ]
}
