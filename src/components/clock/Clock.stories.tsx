import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Clock from './Clock';

export default {
  title: 'components/clock',
  component: Clock,
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#444' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Clock>;

const Template: ComponentStory<typeof Clock> = ({ ...args }) => {
  return <Clock {...args} />;
};

export const Default = Template.bind({});
