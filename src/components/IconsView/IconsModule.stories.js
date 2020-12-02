import React from 'react';
import IconsModule from './IconsModule';

export default {
    title: 'Modules/IconsModule',
    component: IconsModule,
    args: {
        documentLabel: "Label",
        imageUrl: "https://dms-test.dimu.org/image/012uNXVpKSZo?mediaType=image/png",
        title: "Title",
        description: "description",
        metadata: ["25kb"],
        status: "publish",
        type: "document",
        editable: true,
        selectable: true,
        deletable: true
    },
    argTypes: {
    },
};

const Template = (args) => <IconsModule {...args} />

export const Default = Template.bind({});
Default.args = {
}

export const Selected = Template.bind({});
Selected.args = {
    selected: true
}

export const Deleted = Template.bind({});
Deleted.args = {
    deleted: true
}

export const DeletedRestorable = Template.bind({});
DeletedRestorable.args = {
    deleted: true,
    restorable: true
}

export const DeletedErasable = Template.bind({});
DeletedErasable.args = {
    deleted: true,
    restorable: true,
    erasable: true
}

export const Erased = Template.bind({});
Erased.args = {
    erased: true
}

export const WithIcon = Template.bind({});
WithIcon.args = {
    icon: "bug_report",
    imageUrl: undefined
}

export const WithLongDescription = Template.bind({});
WithLongDescription.args = {
    description: "Nullam id dolor id nibh ultricies vehicula ut id elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
}

