import React from 'react';
import NavActionMenu from './NavActionMenu';

export default {
  title: 'Navigation/NavActionMenu',
  component: NavActionMenu,
  argTypes: {
  },
};

const Template = (args) => <NavActionMenu {...args} />;

export const Secondary = Template.bind({});
Secondary.args = {
    menu: [
        {
            role: "group",
            children: [
                {
                    icon: "business",
                    title: "Business"
                },
                {
                    icon: "person",
                    title: "User "
                }
            ]
        },
        {
            title: "Secondary 1",
            onClick: () => alert('click')
        },
        {
            title: "Secondary 2"
        }
    ]
};