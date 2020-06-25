import React from 'react';

function useFormFields<T>(initialValues: T) {
  const [formFields, setFormFields] = React.useState<T>(initialValues);

  const createChangeHandler = (key: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormFields((prev: T) => ({ ...prev, [key]: value }));
  };
  return { formFields, createChangeHandler };
}

export default useFormFields;
