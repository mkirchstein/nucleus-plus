import React from 'react';
import type { Preview } from '@storybook/react';

import { NucleusProvider, product2024 } from '@earnest/nucleus-design-system';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (Story, context) => {
    return (
      <NucleusProvider theme={product2024} sc5Compat>
        <Story />
      </NucleusProvider>
    );
  },
];

export default preview;
