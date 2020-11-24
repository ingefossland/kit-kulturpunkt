import React from 'react';
import TableModule from './TableModule';

import { ColorSettings } from "../"

export default {
    title: 'Module/Variant/TableModule',
    component: TableModule,
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

const Template = (args) => <TableModule {...args} />

export const Default = Template.bind({});
Default.args = {
}

const StatusTemplate = (args) => (
    <div>
        <TableModule {...args} status="publish" />
        <TableModule {...args} status="draft" />
        <TableModule {...args} status="trash" />
        <TableModule {...args} status="erased" />
        <TableModule {...args} selectable={true} />
        <TableModule {...args} selectable={true} selected={true} />
    </div>
)
    
export const Status = StatusTemplate.bind({});
Default.args = {
}

const WithSettingsTemplate = (args) => (
    <div>
        <TableModule {...args} status="publish" />
        <TableModule {...args} status="draft" />
        <TableModule {...args} status="trash" />
        <TableModule {...args} status="erased" />
        <TableModule {...args} selectable={true} />
        <TableModule {...args} selectable={true} selected={true} />
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
        <TableModule {...args} selectable={true} />
        <TableModule {...args} selectable={true} selected={true} />
        <TableModule {...args} editable={true} />
        <TableModule {...args} editable={true} deletable={true} />
        <TableModule {...args} editable={true} />
        <TableModule {...args} restorable={true} />
    </div>
)

export const Capabilities = CapabilitiesTemplate.bind({});
Capabilities.args = {
}