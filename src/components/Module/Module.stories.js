import React from 'react';
import Module from './Module';

import { ColorSettings } from "../"

export default {
    title: 'Module/Module',
    component: Module,
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

const Template = (args) => <Module {...args} />

export const Default = Template.bind({});
Default.args = {
}

export const Expanded = Template.bind({});
Expanded.args = {
    expanded: true
}

export const Editable = Template.bind({});
Editable.args = {
    editable: true
}

export const EditableEditing = Template.bind({});
EditableEditing.args = {
    editable: true,
    editing: true
}

const StatusTemplate = (args) => (
    <div>
        <Module {...args} status="publish" />
        <Module {...args} status="draft" />
        <Module {...args} status="trash" />
        <Module {...args} status="erased" />
        <Module {...args} selectable={true} />
        <Module {...args} selectable={true} selected={true} />
    </div>
)
    
export const Status = StatusTemplate.bind({});
Default.args = {
}

const WithSettingsTemplate = (args) => (
    <div>
        <Module {...args} status="publish" />
        <Module {...args} status="draft" />
        <Module {...args} status="trash" />
        <Module {...args} status="erased" />
        <Module {...args} selectable={true} />
        <Module {...args} selectable={true} selected={true} />
    </div>
)
    
export const WithSettings = WithSettingsTemplate.bind({});
WithSettings.args = {
    settings: [
        {
            template: "color"
        },
    ]
}


const CapabilitiesTemplate = (args) => (
    <div>
        <Module {...args} selectable={true} />
        <Module {...args} selectable={true} selected={true} />
        <Module {...args} editable={true} />
        <Module {...args} editable={true} deletable={true} />
        <Module {...args} editable={true} />
        <Module {...args} restorable={true} />
    </div>
)

export const Capabilities = CapabilitiesTemplate.bind({});
Capabilities.args = {
}