import React from 'react';
import KioskAppIcon from './KioskAppIcon';

export default {
    title: 'Icons/KioskAppIcon',
    component: KioskAppIcon,
    args: {
        style: {
            fontSize: 40
        }
    },
    argTypes: {
    }
};

const Template = (args) => <KioskAppIcon {...args} />

export const Default = Template.bind({});
Default.args = {
}
