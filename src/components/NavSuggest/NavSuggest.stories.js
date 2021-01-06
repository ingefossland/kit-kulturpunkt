import React from 'react';
import NavSearch from '../NavSearch/NavSearch';
import NavSuggest from './NavSuggest';

export default {
  title: 'Navigation/NavSuggest',
  component: NavSuggest,
  args: {
      suggestions: [
        {
            title: "Søk i hele applikasjonen"
        },
        {
            title: "Søk i hele applikasjonen"
        },
      ]
  },
  argTypes: {
  },
};

const Template = (args) => <NavSuggest {...args} />;

export const Default = Template.bind({});