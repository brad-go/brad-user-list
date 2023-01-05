import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { useToggle } from '@/hooks';

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
  const [checked, handleChange] = useToggle(args.checked || false);

  return <Checkbox {...args} checked={checked} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  checked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};
