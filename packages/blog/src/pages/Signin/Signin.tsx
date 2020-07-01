import React, { useState, FormEvent } from 'react';
import { Form } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { LoaderButton } from '@leethub/shared';
import { onError, useFormFields } from '@leethub/utils';
import { useAppContext, UserSession } from '../../libs/appContext';
import { FormContainer, StyledForm, StyledFormGroup } from './styled';

const validateForm = (email: string, password: string) => email.length > 0 && password.length > 0;

const Signin: React.FC = () => {
  const { formFields, createChangeHandler } = useFormFields({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext() as UserSession;
  const { email, password } = formFields;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      history.push('/');
    } catch (_e) {
      onError(_e);
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
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
        <LoaderButton isLoading={isLoading} disabled={!validateForm(email, password)} type="submit">
          Signin
        </LoaderButton>
      </StyledForm>
    </FormContainer>
  );
};

export default Signin;
