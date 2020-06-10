import React from "react";
import { Button, Spinner } from "react-bootstrap";

import "./LoaderButton.css";


type Props = {
  isLoading: boolean;
  disabled?: boolean;
  type: "button" | "submit" | "reset";
}

const LoaderButton: React.FC<Props> = ({ isLoading, type, disabled = false, ...props }) => {
  return (
    <Button block type={type} className="LoaderButton" disabled={disabled || isLoading} {...props}>
      {isLoading &&
        <Spinner as="span" size="sm" animation="grow" role="status" aria-hidden="true">
          <span className="sr-only">Loading...</span>
        </Spinner>}
      {props.children}
    </Button>
  )
}

export default LoaderButton;
