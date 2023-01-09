import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Profile from './Profile';

export default {
  title: 'components/profile',
  component: Profile,
} as ComponentMeta<typeof Profile>;

const USER = {
  id: 1,
  name: 'Pororo',
  date: '1984-02-23',
  comment: 'I like to play.',
  image: '1.png',
  checked: true,
};

const Template: ComponentStory<typeof Profile> = ({ ...args }) => {
  return <Profile {...args} user={USER} />;
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
