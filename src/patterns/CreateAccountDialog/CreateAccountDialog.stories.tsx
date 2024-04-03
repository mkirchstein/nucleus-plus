import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { CreateAccountDialog } from './CreateAccountDialog';

export default {
  title: 'Patterns/NEAS/CreateAccountDialog',
  component: CreateAccountDialog,
  args: {
    variant: 'overlay',
  },
} as Meta<typeof CreateAccountDialog>;

export const Basic: StoryFn<typeof CreateAccountDialog> = () => {
  return <CreateAccountDialog username="bob" email="bob@example.com" />;
};
