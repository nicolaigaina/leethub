import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Navbar, Nav, NavDropdown, Form, Button, FormControl,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Auth } from 'aws-amplify';
import Logo from './styled';

type Props = {
  isAuthenticated: boolean;
  userHasAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navigation: React.FC<Props> = ({ isAuthenticated, userHasAuthenticated }: Props) => {
  const history = useHistory();

  const handleLogout = async () => {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push('/signin');
  };

  return (
    <Navbar bg="light" expand="lg" className="Navigation">
      <Logo>
        <Link to="/">Leethub</Link>
      </Logo>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Nav>
          {isAuthenticated ? (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          ) : (
            <>
              <LinkContainer to="/signup">
                <Nav.Link href="#signup">Signup</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signin">
                <Nav.Link href="#signin">Sigin</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
