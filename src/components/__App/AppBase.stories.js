import React from 'react';
import AppBase from './AppBase';
import { getRandomTheme } from ".."

export default {
  title: 'App/AppBase',
  component: AppBase,
  args: {
      theme: getRandomTheme(),
    },
    argTypes: {
    },
};

const Template = (args) => <div style={{minHeight: '320px'}}><AppBase {...args}>{JSON.stringify(args)}</AppBase></div>;

export const Default = Template.bind({});
Default.args = {
}