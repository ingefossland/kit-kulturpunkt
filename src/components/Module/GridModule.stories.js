import React from 'react';
import GridModule from './GridModule';

import { ColorSettings } from "../"

export default {
    title: 'Module/Variant/GridModule',
    component: GridModule,
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

const Template = (args) => <GridModule {...args} />

export const Default = Template.bind({});
Default.args = {
}

const StatusTemplate = (args) => (
    <div>
        <GridModule {...args} status="publish" />
        <GridModule {...args} status="draft" />
        <GridModule {...args} status="trash" />
        <GridModule {...args} status="erased" />
        <GridModule {...args} selectable={true} />
        <GridModule {...args} selectable={true} selected={true} />
    </div>
)
    
export const Status = StatusTemplate.bind({});
Default.args = {
}

const CapabilitiesTemplate = (args) => (
    <div>
        <GridModule {...args} selectable={true} />
        <GridModule {...args} selectable={true} selected={true} />
        <GridModule {...args} editable={true} />
        <GridModule {...args} editable={true} deletable={true} />
        <GridModule {...args} editable={true} />
        <GridModule {...args} restorable={true} />
    </div>
)

export const Capabilities = CapabilitiesTemplate.bind({});
Capabilities.args = {
}