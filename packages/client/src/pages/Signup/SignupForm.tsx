import { Form } from 'react-bootstrap';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import React, { FormEvent, useState } from 'react';
import { Auth } from 'aws-amplify';
import LoaderButton from '../../components/LoaderButton';
import onError from '../../libs/errorHandler';

const validateForm = (email: string, password: string, confirmPassword: string) =>
  email.length > 0 && password.length > 0 && password === confirmPassword;

type Props = {
  setNewUser: (value: React.SetStateAction<ISignUpResult | null>) => void;
  email: string;
  password: string;
  confirmPassword: string;
  createChangeHandler: (
    key: 'email' | 'password' | 'confirmPassword',
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SignupForm: React.FC<Props> = ({ setNewUser, email, password, confirmPassword, createChangeHandler }: Props) => {
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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formGroupEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          autoFocus
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={createChangeHandler('email')}
        />
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={createChangeHandler('password')}
        />
      </Form.Group>
      <Form.Group controlId="formGroupConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          placeholder="Confirm password"
          onChange={createChangeHandler('confirmPassword')}
        />
      </Form.Group>
      <LoaderButton isLoading={isLoading} disabled={!validateForm(email, password, confirmPassword)} type="submit">
        Signup
      </LoaderButton>
    </Form>
  );
};

export default SignupForm;
