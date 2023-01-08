import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Profile from './Profile';

export default {
  title: 'components/profile',
  component: Profile,
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = ({ ...args }) => {
  return <Profile {...args} />;
};

export const Default = Template.bind({});

export const FullWidth = Template.bind({});
FullWidth.args = {
  fullWidth: true,
};

export const Mobile = Template.bind({});
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};
