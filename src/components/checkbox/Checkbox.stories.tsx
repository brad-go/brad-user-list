import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Checkbox from './Checkbox';

export default {
  title: 'components/checkbox',
  component: Checkbox,
  decorators: [
    (Story) => (
      <div style={{ margin: '20px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = ({ ...args }) => {
  return <Checkbox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  checked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};
