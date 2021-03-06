import { Form } from 'react-bootstrap';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import React, { FormEvent, useState } from 'react';
import { Auth } from 'aws-amplify';
import { LoaderButton } from '@leethub/shared';
import { onError } from '@leethub/utils';
import { StyledForm, StyledFormGroup } from './styled';

const validateForm = (
  email: string,
  password: string,
  confirmPassword: string,
) => email.length > 0
&& password.length > 0
  && password === confirmPassword;

type Props = {
  setNewUser: (value: React.SetStateAction<ISignUpResult | null>) => void;
  email: string;
  password: string;
  confirmPassword: string;
  createChangeHandler: (
    key: 'email' | 'password' | 'confirmPassword',
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SignupForm: React.FC<Props> = ({
  setNewUser, email, password, confirmPassword, createChangeHandler,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: email,
        password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (_e) {
      onError(_e);
      setIsLoading(false);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormGroup controlId="formGroupEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          autoFocus
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={createChangeHandler('email')}
        />
      </StyledFormGroup>
      <StyledFormGroup controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={createChangeHandler('password')}
        />
      </StyledFormGroup>
      <StyledFormGroup controlId="formGroupConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          placeholder="Confirm password"
          onChange={createChangeHandler('confirmPassword')}
        />
      </StyledFormGroup>
      <LoaderButton isLoading={isLoading} disabled={!validateForm(email, password, confirmPassword)} type="submit">
        Signup
      </LoaderButton>
    </StyledForm>
  );
};

export default SignupForm;
