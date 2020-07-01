import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

const Logo = styled(Navbar.Brand)`
   font-weight: bold;
   & > a:hover {
    text-decoration: none;
   }
`;

export default Logo;
