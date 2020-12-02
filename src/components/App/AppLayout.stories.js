import React from 'react';
import AppLayout from './AppLayout';
import AppLayoutExample from './AppLayout.example';

import { getRandomTheme } from ".."

const theme = getRandomTheme()

export default {
  title: 'App/AppLayout',
  component: AppLayout,
  args: {
      app: {
          title: "App",
          subtitle: "Owner"
      },
      theme: getRandomTheme(),
    },
    argTypes: {
    },
};

const Template = (args) => <div style={{minHeight: '320px'}}><AppLayoutExample {...args}>{JSON.stringify(args)}</AppLayoutExample></div>;

export const Default = Template.bind({});
Default.args = {
}

export const WithSearch = Template.bind({});
WithSearch.args = {
    search: {
        expanded: false
    }
}

export const WithSidebar = Template.bind({});
WithSidebar.args = {
    sidebar: {
        expanded: true,
        primaryAction: {
            title: "Create"
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
}

export const WithCalendar = Template.bind({});
WithCalendar.args = {
    sidebar: {
        expanded: true,
    },
    primaryAction: {
        title: "Create"
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
    },
    calendar: {
        expanded: true
    }
}


export const GrowingSearch = Template.bind({});
GrowingSearch.args = {
    search: {
        variant: "growing",
        expanded: false
    }
}

export const SearchExpanded = Template.bind({});
SearchExpanded.args = {
    search: {
        expanded: true
    }
}

export const SubviewExpanded = Template.bind({});
SubviewExpanded.args = {
    subview: {
        expanded: true,
        title: "Subview",
        description: "Description"
    }
}