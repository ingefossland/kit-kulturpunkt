import React from 'react';
import ListModule from './ListModule';

import { ColorSettings } from "../"

export default {
    title: 'Module/Variant/ListModule',
    component: ListModule,
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

const Template = (args) => <ListModule {...args} />

export const Default = Template.bind({});
Default.args = {
}

export const LongDescription = Template.bind({});
LongDescription.args = {
    description: "Nullam id dolor id nibh ultricies vehicula ut id elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
    editable: true,
    deletable: true
}


const StatusTemplate = (args) => (
    <div>
        <ListModule {...args} status="publish" />
        <ListModule {...args} status="draft" />
        <ListModule {...args} status="trash" />
        <ListModule {...args} status="erased" />
        <ListModule {...args} selectable={true} />
        <ListModule {...args} selectable={true} selected={true} />
    </div>
)
    
export const Status = StatusTemplate.bind({});
Default.args = {
}

const WithSettingsTemplate = (args) => (
    <div>
        <ListModule {...args} status="publish" />
        <ListModule {...args} status="draft" />
        <ListModule {...args} status="trash" />
        <ListModule {...args} status="erased" />
        <ListModule {...args} selectable={true} />
        <ListModule {...args} selectable={true} selected={true} />
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
        <ListModule {...args} selectable={true} />
        <ListModule {...args} selectable={true} selected={true} />
        <ListModule {...args} editable={true} />
        <ListModule {...args} editable={true} deletable={true} />
        <ListModule {...args} editable={true} />
        <ListModule {...args} restorable={true} />
    </div>
)

export const Capabilities = CapabilitiesTemplate.bind({});
Capabilities.args = {
}