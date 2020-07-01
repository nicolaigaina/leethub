import styled from 'styled-components';
import { Form } from 'react-bootstrap';

export const FormContainer = styled.div`
  @media all and (min-width: 480px) {
    padding: 60px 0;
  }
`;

export const StyledForm = styled(Form)`
  @media all and (min-width: 480px) {
    margin: 0 auto;
    max-width: 400px;
  }
`;

export const StyledFormGroup = styled(Form.Group)`
  text-align: left;
  font-weight: bold;
`;
