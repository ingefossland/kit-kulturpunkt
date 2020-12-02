import React from 'react';
import AppSearch from './AppSearch';
import AppSearchExample from './AppSearch.example';

export default {
  title: 'App/AppSearch',
  component: AppSearch,
  args: {
      placeholder: "Search app"
  },
  argTypes: {
      collapsible: {
        control: 'boolean'
      },
      expanded: {
        control: 'boolean'
      },
  },
};

const Template = (args) => <AppSearchExample {...args} />;

export const Default = Template.bind({});

export const Collapsed = Template.bind({});
Collapsed.args = {
    expanded: false
}

export const GrowingCollapsed = Template.bind({});
GrowingCollapsed.args = {
    variant: "growing",
    expanded: false
}

export const GrowingExpanded = Template.bind({});
GrowingExpanded.args = {
    variant: "growing",
    expanded: true
}