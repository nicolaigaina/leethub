import React, { useState } from 'react';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import SignupForm from './SignupForm';
import ConfirmSignupForm from './ConfirmSignupForm';
import './Signup.css';
import useFormFields from '../../libs/useFormFields';

const Signup: React.FC = () => {
  const [newUser, setNewUser] = useState<ISignUpResult | null>(null);
  const { formFields, createChangeHandler } = useFormFields({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
  });
  const { email, password, confirmPassword, confirmationCode } = formFields;

  return (
    <div className="Signup">
      {newUser === null ? (
        <SignupForm
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          setNewUser={setNewUser}
          createChangeHandler={createChangeHandler}
        />
      ) : (
        <ConfirmSignupForm
          email={email}
          password={password}
          confirmationCode={confirmationCode}
          onChange={createChangeHandler('confirmationCode')}
        />
      )}
    </div>
  );
};

export default Signup;
