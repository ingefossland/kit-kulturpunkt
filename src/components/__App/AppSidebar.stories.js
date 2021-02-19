import React from 'react';
import AppSidebar from './AppSidebar';

export default {
    title: 'App/AppSidebar',
    component: AppSidebar,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <AppSidebar {...args} />

export const Default = Template.bind({});
Default.args = {
}

export const FinderSidebar = Template.bind({});
FinderSidebar.args = {
    primaryAction: {
        title: "Create",
        children: [
            {
                icon: "document",
                title: "New dcument"
            },
            {
                icon: "page",
                title: "New page"
            }
        ]
    },
    menu: [
        {
            title: "Menu 1",
            url: "/1"
        },
        {
            title: "Menu 2",
            url: "/2"
        }
    ],
    menuByUrl: {
        "/1": {
            count: 200
        }
    }
}

export const CalendarSidebar = Template.bind({});
CalendarSidebar.args = {
    primaryAction: {
        title: "New event"
    },
    calendar: {
        date: "1999-05-26"
    },
    menu: [
        {
            title: "Menu 1",
            url: "/1"
        },
        {
            title: "Menu 2",
            url: "/2"
        }
    ],
    menuByUrl: {
        "/1": {
            count: 200
        }
    }
}
