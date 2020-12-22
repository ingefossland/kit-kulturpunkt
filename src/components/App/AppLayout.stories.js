import React from 'react';
import AppLayout from './AppLayout';
import AppLayoutExample from './AppLayout.example';

export default {
    title: 'App/AppLayout',
    component: AppLayout,
    args: {
        header: {
            title: "App",
            subtitle: "Owner"
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
    }
}

export const CollapsibleSidebar = Template.bind({});
CollapsibleSidebar.args = {
    sidebar: {
        collapsible: true,
        expanded: true,
    }
}

export const CollapsibleSidebarAndSearch = Template.bind({});
CollapsibleSidebarAndSearch.args = {
    search: {
        expanded: false
    },
    sidebar: {
        collapsible: true,
        expanded: true,
    }
}


export const GrowingSearch = Template.bind({});
GrowingSearch.args = {
    header: {
        title: "Growing search"
    },
    search: {
        variant: "growing",
        expanded: false
    }
}

export const GrowingSearchAndSidebar = Template.bind({});
GrowingSearchAndSidebar.args = {
    header: {
        title: "Growing search"
    },
    sidebar: {
        collapsible: true
    },
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

export const SearchSuggestions = Template.bind({});
SearchSuggestions.args = {
    search: {
        expanded: true,
    },
}


export const SubviewExpanded = Template.bind({});
SubviewExpanded.args = {
    subview: {
        expanded: true,
        title: "Subview",
        description: "Description"
    }
}