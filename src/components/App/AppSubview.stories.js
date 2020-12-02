import React from 'react';
import AppSubview from './AppSubview';

export default {
  title: 'App/AppSubview',
  component: AppSubview,
  argTypes: {
  },
};

const Template = (args) => <AppSubview {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: "App",
    subtitle: "App owner"
}