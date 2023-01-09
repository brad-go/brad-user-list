import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Layout from './Layout';

export default {
  title: 'components/layout',
  component: Layout,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = () => {
  return <Layout />;
};

export const Desktop = Template.bind({});

export const Mobile = Template.bind({});
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};
