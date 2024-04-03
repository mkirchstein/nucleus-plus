import React, { useState } from 'react';
import { styled } from 'styled-components';

import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  Flex,
  Input,
  Text,
} from '@earnest/nucleus-design-system';

// CSS Props support outside of Nucleus currently experimental
import {
  XResponsiveCSSProps as ResponsiveCSSProps,
  XuseCSSProps as useCSSProps,
} from '@earnest/nucleus-design-system';

interface CreateAccountDialogProps extends ResponsiveCSSProps {
  children?: React.ReactNode;
  url?: string;
  username?: string;
  email?: string;
  password?: string;
  ariaLabel?: string;
  testId?: string;
  dataCy?: string;
}

// CreateAccountDialog ///////////////////////////////////////////////////////////////

const StyledCreateAccountDialog = styled(Box)<CreateAccountDialogProps>`
  ${({ theme: { tokens } }) => `
  `}
  ${(props) => useCSSProps(props)}
`;

const CreateAccountDialog = React.forwardRef<
  HTMLDivElement,
  CreateAccountDialogProps
>(
  (
    {
      children,
      url,
      username,
      email,
      password,
      ariaLabel,
      testId,
      dataCy,
      ...rest
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setVisible(true)}>
          Create Account
        </Button>
        <Dialog
          open={visible}
          onClose={() => setVisible(false)}
          onOpenChange={setVisible}
        >
          <Flex flexDirection="column">
            {/* TODO: prefix any known values */}
            <form
              action="https://neas-api.staging.earnest.com/auth/account"
              method="post"
            >
              <Text as="h1" marginTop="0">
                Finish setting up your account
              </Text>
              <Input name="username" label="Username" />
              <Input name="email" label="Email" />
              <Input name="password" label="Password" />
              <ButtonGroup marginTop="space.16" gap="space.8">
                <Button size="sm" type="submit">
                  Save
                </Button>
                <Button tertiary size="sm" onClick={() => setVisible(false)}>
                  Cancel
                </Button>
              </ButtonGroup>
            </form>
          </Flex>
        </Dialog>
      </>
    );
  },
);

CreateAccountDialog.displayName = 'CreateAccountDialog';

export { CreateAccountDialog, type CreateAccountDialogProps };
