//
//  WIP - This is a bare bones initial version for illustrative purposes
//
// Basic anatomy of a Radix Form pattern:
/**  
  <Form.Root>
    <Form.Field>
      <Form.Label />
      <Form.Control />
      <Form.Message />
      <Form.ValidityState />
    </Form.Field>

    <Form.Message />
    <Form.ValidityState />

    <Form.Submit />
  </Form.Root>
  */

import React from 'react';
import { styled } from 'styled-components';
import * as FormPrimitive from '@radix-ui/react-form';

import {
  XResponsiveCSSProps as ResponsiveCSSProps,
  XuseCSSProps as useCSSProps,
} from '@earnest/nucleus-design-system';

// Form ///////////////////////////////////////////////////////////////

interface FormProps
  extends FormPrimitive.FormProps,
    Omit<ResponsiveCSSProps, keyof FormPrimitive.FormProps> {
  children?: React.ReactNode;
  ariaLabel?: string;
  testId?: string;
  dataCy?: string;
}

const StyledForm = styled(FormPrimitive.Root)<FormProps>`
  ${({ theme: { tokens } }) => `
  `}
  ${(props) => useCSSProps(props)}
`;

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ children, ariaLabel, testId, dataCy, ...rest }, ref) => {
    return (
      <StyledForm
        ref={ref}
        aria-label={ariaLabel}
        data-testid={testId}
        data-cy={dataCy}
        {...rest}
      >
        {children}
      </StyledForm>
    );
  },
);

Form.displayName = 'Form';

// Form Field //////////////////////////////////////////////////////////

interface FormFieldProps
  extends Omit<FormPrimitive.FormFieldProps, 'onCopy'>,
    Omit<ResponsiveCSSProps, keyof FormPrimitive.FormFieldProps> {
  children?: React.ReactNode;
  ariaLabel?: string;
  testId?: string;
  dataCy?: string;
  name: string;
}

const StyledFormField = styled(FormPrimitive.Field)<FormFieldProps>`
  ${({ theme: { tokens } }) => `
    display: flex;
    flex-direction: column;
    gap: ${tokens.space8};
    margin-bottom: ${tokens.space32};
  `}
  ${(props) => useCSSProps(props)}
`;

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, ariaLabel, testId, dataCy, ...rest }, ref) => {
    return (
      <StyledFormField
        aria-label={ariaLabel}
        data-testid={testId}
        data-cy={dataCy}
        ref={ref}
        {...rest}
      >
        {children}
      </StyledFormField>
    );
  },
);

FormField.displayName = 'FormField';

// Form Control ///////////////////////////////////////////////////////

interface FormControlProps
  extends Omit<FormPrimitive.FormControlProps, 'height'>,
    Omit<ResponsiveCSSProps, keyof FormPrimitive.FormControlProps> {
  children?: React.ReactNode;
  ariaLabel?: string;
  name: string;
}

const StyledFormControl = styled(FormPrimitive.Control)<FormControlProps>``;

const FormControl = React.forwardRef<HTMLInputElement, FormControlProps>(
  ({ children, ...rest }, ref) => {
    return (
      <StyledFormControl ref={ref} {...rest}>
        {children}
      </StyledFormControl>
    );
  },
);

FormControl.displayName = 'FormControl';

// Form Message ///////////////////////////////////////////////////////

interface FormMessageProps
  extends FormPrimitive.FormMessageProps,
    Omit<ResponsiveCSSProps, keyof FormPrimitive.FormMessageProps> {
  children?: React.ReactNode;
  ariaLabel?: string;
  testId?: string;
  dataCy?: string;
  /**
   * Possible match values: "badInput", "patternMismatch", "rangeOverflow", "rangeUnderflow", "stepMismatch", "tooLong", "tooShort", "typeMismatch", "valid", "valueMissing"
   */
  match?: FormPrimitive.ValidityMatcher;
  /** Used to target a specific field by name when rendering outside of a FormField part */
  name?: string;
}

const StyledFormMessage = styled(FormPrimitive.Message)<FormMessageProps>`
  ${({ theme: { tokens } }) => `
    color: ${tokens.colorNeutral60};
    line-height: 1.5;
  `}
  ${(props) => useCSSProps(props)}
`;

const FormMessage = React.forwardRef<HTMLSpanElement, FormMessageProps>(
  ({ children, ariaLabel, testId, dataCy, ...rest }, ref) => {
    return (
      <StyledFormMessage
        aria-label={ariaLabel}
        data-testid={testId}
        data-cy={dataCy}
        ref={ref}
        {...rest}
      >
        {children}
      </StyledFormMessage>
    );
  },
);

FormMessage.displayName = 'FormMessage';

export {
  Form,
  FormField,
  FormControl,
  FormMessage,
  type FormProps,
  type FormFieldProps,
  type FormControlProps,
  type FormMessageProps,
};
