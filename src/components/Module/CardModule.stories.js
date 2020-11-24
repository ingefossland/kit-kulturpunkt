import React from 'react';
import CardModule from './CardModule';

import { ColorSettings } from "../"

export default {
    title: 'Module/Variant/CardModule',
    component: CardModule,
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

const Template = (args) => <CardModule {...args} />

export const Default = Template.bind({});
Default.args = {
}

const StatusTemplate = (args) => (
    <div>
        <CardModule {...args} status="publish" />
        <CardModule {...args} status="draft" />
        <CardModule {...args} status="trash" />
        <CardModule {...args} status="erased" />
        <CardModule {...args} selectable={true} />
        <CardModule {...args} selectable={true} selected={true} />
    </div>
)
    
export const Status = StatusTemplate.bind({});
Default.args = {
}

const WithSettingsTemplate = (args) => (
    <div>
        <CardModule {...args} status="publish" />
        <CardModule {...args} status="draft" />
        <CardModule {...args} status="trash" />
        <CardModule {...args} status="erased" />
        <CardModule {...args} selectable={true} />
        <CardModule {...args} selectable={true} selected={true} />
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
        <CardModule {...args} selectable={true} />
        <CardModule {...args} selectable={true} selected={true} />
        <CardModule {...args} editable={true} />
        <CardModule {...args} editable={true} deletable={true} />
        <CardModule {...args} editable={true} />
        <CardModule {...args} restorable={true} />
    </div>
)

export const Capabilities = CapabilitiesTemplate.bind({});
Capabilities.args = {
}