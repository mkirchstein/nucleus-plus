import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { customRender } from '../../test';
import { CreateAccountDialog } from './CreateAccountDialog';

describe('CreateAccountDialog', () => {
  test('renders the "Create Account" button', () => {
    customRender(<CreateAccountDialog />);
    const createAccountButton = screen.getByText('Create Account');
    expect(createAccountButton).toBeInTheDocument();
  });

  test('opens the dialog when "Create Account" button is clicked', () => {
    customRender(<CreateAccountDialog />);
    const createAccountButton = screen.getByText('Create Account');
    fireEvent.click(createAccountButton);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  test('closes the dialog when "Cancel" button is clicked', () => {
    customRender(<CreateAccountDialog />);
    const createAccountButton = screen.getByText('Create Account');
    fireEvent.click(createAccountButton);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    const dialog = screen.queryByRole('dialog');
    expect(dialog).not.toBeInTheDocument();
  });
});
