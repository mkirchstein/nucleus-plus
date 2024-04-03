import React, { useState, useRef } from 'react';
import { styled } from 'styled-components';
import Reaptcha from 'reaptcha';

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

import { Form, FormField, FormMessage } from 'src/components';

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
    const [captchaToken, setCaptchaToken] = useState(null);
    const captchaRef = useRef(null);

    const verify = () => {
      // @ts-ignore
      captchaRef.current.getResponse().then((res) => {
        setCaptchaToken(res);
      });
    };
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
          <Form
            action={url || 'https://neas-api.staging.earnest.com/auth/account'}
            method="post"
          >
            <Flex flexDirection="column">
              <Text as="h2" marginTop="0">
                Finish setting up your account
              </Text>
              <Input type="hidden" name="username" />
              <FormField name="email">
                <Input name="email" label="Email" defaultValue={email} />
              </FormField>
              <FormField name="password">
                <Input name="password" type="password" label="Password" />
                <FormMessage name="password">
                  Your password should include at least: 10 characters, 1
                  uppercase letter, 1 lowercase letter, 1 number, 1 special
                  character (!,@,#, etc)
                </FormMessage>
              </FormField>
              <Box marginBlock="space.16">
                {/* 
                  v2 ReCAPTCHA Sitekey: 6LdxsKQpAAAAAENOzJGEFNLCnFQlR8P5y7S6MyIV
                  v3 ReCAPTCHA Sitekey: 6LcAsaQpAAAAABQTo8UzHNNTKezc_qiW7ZEhF7IH
                */}
                <Reaptcha
                  //  sitekey={process.env.RECAPTCHA_SITE_KEY}
                  sitekey={'6LdxsKQpAAAAAENOzJGEFNLCnFQlR8P5y7S6MyIV'}
                  ref={captchaRef}
                  onVerify={verify}
                />
              </Box>
              <ButtonGroup reverse marginTop="space.16" gap="space.8">
                <Button type="submit">Save</Button>
                <Button tertiary onClick={() => setVisible(false)}>
                  Cancel
                </Button>
              </ButtonGroup>
            </Flex>
          </Form>
        </Dialog>
      </>
    );
  },
);

CreateAccountDialog.displayName = 'CreateAccountDialog';

export { CreateAccountDialog, type CreateAccountDialogProps };
