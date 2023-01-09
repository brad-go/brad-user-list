import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Header from './Header';

export default {
  title: 'components/header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => {
  return <Header />;
};

export const Desktop = Template.bind({});

export const Mobile = Template.bind({});
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};
