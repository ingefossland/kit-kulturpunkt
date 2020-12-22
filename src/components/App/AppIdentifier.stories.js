import React from 'react';
import AppIdentifier from './AppIdentifier';

export default {
  title: 'App/AppIdentifier',
  component: AppIdentifier,
  argTypes: {
  },
};

const Template = (args) => <AppIdentifier {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: "App",
    subtitle: "App owner"
}