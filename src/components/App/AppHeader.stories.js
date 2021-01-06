import React from 'react';
import AppHeader from './AppHeader';
import AppHeaderExample from './AppHeader.example';

export default {
  title: 'App/AppHeader',
  component: AppHeader,
  args: {
      title: "App",
      subtitle: "Owner"
  },
  argTypes: {
  },
};

const Template = (args) => <AppHeaderExample {...args} />;

export const Default = Template.bind({});
Default.args = {
}

export const WithMenu = Template.bind({});
WithMenu.args = {
    menu: {
        expanded: false,
    }
}

export const MenuAndSearch = Template.bind({});
MenuAndSearch.args = {
    menu: {
        expanded: false,
    },
    search: {
        expanded: false,
    }
}

export const SubviewExpanded = Template.bind({});
SubviewExpanded.args = {
    subview: {
        expanded: true,
        title: "Subview",
        description: "5 actions"
    }
}

export const Search = Template.bind({});
Search.args = {
    search: {
        expanded: false,
        placeholder: "Search app"
    }
}

export const SearchExpanded = Template.bind({});
SearchExpanded.args = {
    search: {
        expanded: true,
        placeholder: "Search app"
    }
}


export const SearchOptions = Template.bind({});
SearchOptions.args = {
    search: {
        expanded: false,
        placeholder: "Search app",
        options: [
            {
                title: "Bla bla"
            },
            {
                title: "Bla bla bla"
            }
        ]
    }
}

export const GrowingSearch = Template.bind({});
GrowingSearch.args = {
    search: {
        variant: "growing",
        expanded: false,
        placeholder: "Search app"
    }
}

export const GrowingSearchOptions = Template.bind({});
GrowingSearchOptions.args = {
    search: {
        variant: "growing",
        expanded: false,
        placeholder: "Search app",
        options: [
            {
                title: "Bla bla"
            },
            {
                title: "Bla bla bla"
            }
        ]
    }
}