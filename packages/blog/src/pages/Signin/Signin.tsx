import React, { useState, FormEvent } from 'react';
import { Form } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import './Signin.css';
import { useHistory } from 'react-router-dom';
import { useAppContext, UserSession } from '../../libs/appContext';
import LoaderButton from '../../components/LoaderButton';
import onError from '../../libs/errorHandler';
import useFormFields from '../../libs/useFormFields';

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
    <div className="Signin">
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
        <LoaderButton isLoading={isLoading} disabled={!validateForm(email, password)} type="submit">
          Signin
        </LoaderButton>
      </Form>
    </div>
  );
};

export default Signin;
