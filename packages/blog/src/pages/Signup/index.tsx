import React, { useState } from 'react';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { useFormFields } from '@leethub/utils';
import SignupForm from './SignupForm';
import ConfirmSignupForm from './ConfirmSignupForm';
import './Signup.css';

const Signup: React.FC = () => {
  const [newUser, setNewUser] = useState<ISignUpResult | null>(null);
  const { formFields, createChangeHandler } = useFormFields({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
  });
  const {
    email, password, confirmPassword, confirmationCode,
  } = formFields;

  const RenderSignupForm = (
    <SignupForm
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      setNewUser={setNewUser}
      createChangeHandler={createChangeHandler}
    />
  );

  const RenderConfirmSignupForm = (
    <ConfirmSignupForm
      email={email}
      password={password}
      confirmationCode={confirmationCode}
      onChange={createChangeHandler('confirmationCode')}
    />
  );

  return (
    <div className="Signup">
      {newUser === null
        ? RenderSignupForm
        : RenderConfirmSignupForm}
    </div>
  );
};

export default Signup;
