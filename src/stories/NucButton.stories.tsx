import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, ButtonGroup } from '@earnest/nucleus-design-system';

const meta = {
  title: 'Example/NucButton',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NucleusButton = {
  name: 'NucleusButton',
  render: () => (
    <ButtonGroup>
      <Button secondary iconStart="ArrowLeftIcon">
        Go Back
      </Button>
      <Button iconEnd="ArrowRightIcon">Continue</Button>
    </ButtonGroup>
  ),
};
