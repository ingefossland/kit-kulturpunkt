import React from 'react';
import NavSearch from './NavSearch';

export default {
  title: 'Navigation/NavSearch',
  component: NavSearch,
  args: {
      placeholder: "Search"
  },
  argTypes: {
  },
};

const Template = (args) => <NavSearch {...args} />;

export const Default = Template.bind({});