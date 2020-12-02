import React from 'react';
import NavAction from './NavAction';

export default {
  title: 'Navigation/NavAction',
  component: NavAction,
  argTypes: {
  },
};

const Template = (args) => <NavAction {...args} />;

export const Secondary = Template.bind({});
Secondary.args = {
    primaryAction: {
        role: "toggle", 
        title: "Create",
        expanded: true,
        children:[
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
                title: "Secondary 1"
            },
            {
                title: "Secondary 2"
            }
        ]
    }    
    
};