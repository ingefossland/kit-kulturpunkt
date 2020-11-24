import React from 'react';
import Gallery from "../Gallery/Gallery"
import GalleryModule from './GalleryModule';

export default {
    title: 'Module/Variant/GalleryModule',
    component: GalleryModule,
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

const Template = (args) => <GalleryModule {...args} />

export const Default = Template.bind({});
Default.args = {
}

const StatusTemplate = (args) => (
    <Gallery>
        <GalleryModule {...args} status="publish" />
        <GalleryModule {...args} status="draft" />
        <GalleryModule {...args} status="trash" />
        <GalleryModule {...args} status="erased" />
        <GalleryModule {...args} selectable={true} />
        <GalleryModule {...args} selectable={true} selected={true} />
    </Gallery>
)
    
export const Status = StatusTemplate.bind({});
Default.args = {
}

const WithSettingsTemplate = (args) => (
    <Gallery>
        <GalleryModule {...args} status="publish" />
        <GalleryModule {...args} status="draft" />
        <GalleryModule {...args} status="trash" />
        <GalleryModule {...args} status="erased" />
        <GalleryModule {...args} selectable={true} />
        <GalleryModule {...args} selectable={true} selected={true} />
    </Gallery>
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
    <Gallery>
        <GalleryModule {...args} selectable={true} />
        <GalleryModule {...args} selectable={true} selected={true} />
        <GalleryModule {...args} editable={true} />
        <GalleryModule {...args} editable={true} deletable={true} />
        <GalleryModule {...args} editable={true} />
        <GalleryModule {...args} restorable={true} />
    </Gallery>
)

export const Capabilities = CapabilitiesTemplate.bind({});
Capabilities.args = {
}