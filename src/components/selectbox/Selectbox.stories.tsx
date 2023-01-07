import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Selectbox from './Selectbox';

export default {
  title: 'components/selectbox',
  component: Selectbox,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          padding: '20px',
          backgroundColor: '#cbc5f0',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Selectbox>;

const Template: ComponentStory<typeof Selectbox> = ({ ...args }) => {
  return <Selectbox {...args} />;
};

export const Desktop = Template.bind({});

export const Mobile = Template.bind({});
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};
