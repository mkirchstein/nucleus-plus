import React, { ComponentType } from 'react';
import { render } from '@testing-library/react';

import {
  NucleusProvider,
  product2024 as theme,
} from '@earnest/nucleus-design-system';

/**
 * DRY up the wrapping of individual test with <NucleusProvider>
 */
function customRender(ui: React.ReactElement, { ...renderOptions } = {}) {
  const AppProviders: ComponentType<{
    children?: React.ReactNode;
  }> = ({ children }) => {
    return (
      <NucleusProvider sc5Compat theme={theme}>
        {children}
      </NucleusProvider>
    );
  };

  return render(ui, { wrapper: AppProviders, ...renderOptions });
}

export { customRender };
