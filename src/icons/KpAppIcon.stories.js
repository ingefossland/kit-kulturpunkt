import React from 'react';
import KpAppIcon from './KpAppIcon';

export default {
    title: 'Icons/KpAppIcon',
    component: KpAppIcon,
    args: {
        style: {
            fontSize: 72
        }
    },
    argTypes: {
    }
};

const Template = (args) => <KpAppIcon {...args} />

export const Default = Template.bind({});
Default.args = {
}
