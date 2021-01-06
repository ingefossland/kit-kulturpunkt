import React from 'react';
import AppSearch from './AppSearch';
import AppSearchExample from './AppSearch.example';

export default {
  title: 'App/AppSearch',
  component: AppSearch,
  args: {
      expanded: true,
      placeholder: "Search app",
  },
  argTypes: {
  },
};

const Template = (args) => <AppSearchExample {...args} />;

export const Default = Template.bind({});

export const WithScopes = Template.bind({});
WithScopes.args = {
    id: "search-scope",
    options: [
        {
            query: true,
            icon: "search",
            placeholder: "Søk overalt",
            title: "Søk etter [q] i alt",
            count: 10000
        },
        {
            query: true,
            icon: "search",
            placeholder: "Søk i scope",
            title: "Søk etter [q] i scope",
            count: 500
        }
    ],
}

export const WithSuggestions = Template.bind({});
WithSuggestions.args = {
    id: "search-suggestions",
    options: [
        {
            query: true,
            icon: "search",
            title: "Søk etter [q] i alt",
            count: 10000
        },
        {
            query: true,
            icon: "search",
            title: "Søk etter [q] i noe annet",
            count: 500
        },
        {
            group: "suggest",
            title: "Manchester United"
        },
        {
            group: "suggest",
            title: "Manchester City"
        }
    ],

}

export const GroupedSuggestions = Template.bind({});
GroupedSuggestions.args = {
    id: "search-groups",
    options: [
        {
            query: true,
            icon: "search",
            placeholder: "Søk overalt",
            title: "Søk etter [q] i alt",
            count: 10000
        },
        {
            query: true,
            icon: "search",
            placeholder: "Søk et annet sted",
            title: "Søk etter [q] et annet sted",
            count: 500
        },
        {
            documentType: "team",
            title: "Manchester United"
        },
        {
            documentType: "team",
            title: "Manchester City"
        },
        {
            documentType: "player",
            title: "George Best"
        },
        {
            documentType: "player",
            title: "Eric Cantona"
        }
    ],
    autocompleteProps: {
        groupBy: (options) => options.documentType,
    }

}