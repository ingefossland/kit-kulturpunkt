import React from 'react';
import ExpandedModule from './ExpandedModule';

import { ColorSettings } from "../"

export default {
    title: 'Module/Variant/ExpandedModule',
    component: ExpandedModule,
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

const Template = (args) => <ExpandedModule {...args}><div>{JSON.stringify(args, 0, 2)}</div></ExpandedModule>

export const Default = Template.bind({});
Default.args = {
}

