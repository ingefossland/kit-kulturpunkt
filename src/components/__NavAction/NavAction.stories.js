import React from 'react';
import NavAction from './NavAction';

export default {
  title: 'Navigation/NavAction',
  component: NavAction,
  argTypes: {
  },
};

const Template = (args) => <NavAction {...args} />;

export const Single = Template.bind({});
Single.args = {
    menu: [{
        title: "Create",
    }]
};

export const SingleWithChildren = Template.bind({});
SingleWithChildren.args = {
    menu: [{
        role: "toggle", 
        title: "Create",
        children: [
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
    }]
};

export const SingleCombo = Template.bind({});
SingleCombo.args = {
    menu: [{
        title: "Create",
        url: "/create",
        children: [
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
    }]
};

export const SingleDisabled = Template.bind({});
SingleDisabled.args = {
    menu: [{
        title: "Create",
        url: "/create",
        disabled: true,
        children: [
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
    }]
};

export const Multiple = Template.bind({});
Multiple.args = {
    icons: {
        customIcon: "bug_report"
    },
    menu: [
        {
            role: "toggle", 
            title: "Combo",
            url: "/combo",
            children: [
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
        },
        {
            role: "toggle", 
            title: "Toggle",
            children: [
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
                    title: "Click me!",
                },
                {
                    title: "Secondary 2"
                }
            ]
        },
        {
            title: "Click",
            onClick: () => alert('Parent click'),
            children: [
                {
                    icon: "customIcon",
                    title: "Click child",
                    onClick: () => alert('Child click')
                }
            ]
        },
        {
            title: "Custom icons",
            children: [
                {
                    icon: "customIcon",
                    title: "Custom icon",
                }
            ]
        },
        {
            title: "Action 2"
        }
    ]
};