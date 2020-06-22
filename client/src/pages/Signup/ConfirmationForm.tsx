import React, { FormEvent, useState } from 'react';

import { Form } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import LoaderButton from '../../components/LoaderButton';
import { useAppContext, UserSession } from '../../libs/appContext';
import onError from '../../libs/errorHandler';

const validateConfirmationForm = (confirmationCode: string) => confirmationCode.length > 0;

type Props = {
  email: string;
  password: string;
  confirmationCode: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const ConfirmiationForm: React.FC<Props> = ({ email, password, confirmationCode, onChange }: Props) => {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext() as UserSession;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleConfirmationSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);

      userHasAuthenticated(true);
      history.push('/');
    } catch (_e) {
      onError(_e);
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleConfirmationSubmit}>
      <Form.Group controlId="confirmationCode">
        <Form.Label>Confirmation Code</Form.Label>
        <Form.Control
          autoFocus
          type="tel"
          value={confirmationCode}
          placeholder="Enter confirmation code"
          onChange={onChange}
        />
        <Form.Text className="text-muted">Please check your email for the code.</Form.Text>
      </Form.Group>
      <LoaderButton isLoading={isLoading} disabled={!validateConfirmationForm(confirmationCode)} type="submit">
        Verify
      </LoaderButton>
    </Form>
  );
};

export default ConfirmiationForm;
