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

export const WithOptions = Template.bind({});
WithOptions.args = {
    id: "search-suggestions",
    options: [
        {
            title: "Søk etter {value} i alt",
            count: 10000
        },
        {
            title: "Søk etter {value} i noe annet",
            count: 500
        }
    ],
    suggest: [
        {
            title: "Manchester United"
        },
        {
            title: "Manchester City"
        }
    ]

}