import React from 'react';
import { Spinner } from 'react-bootstrap';
import StyledButton from './styled';

type Props = {
  isLoading: boolean;
  disabled?: boolean;
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
};

const LoaderButton: React.FC<Props> = ({
  isLoading, type, disabled = false, children,
}: Props) => (
  <StyledButton block type={type} className="LoaderButton" disabled={disabled || isLoading}>
    {isLoading && (
    <Spinner as="span" size="sm" animation="grow" role="status" aria-hidden="true">
      <span className="sr-only">Loading...</span>
    </Spinner>
    )}
    {children}
  </StyledButton>
);

export default LoaderButton;
