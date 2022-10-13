
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from "react-router-dom";

function NavScroll({ search, setSearchQuery, searchQuery }) {
  const inputHandler = (event) => {
    setSearchQuery(event.target.value);
    console.log(searchQuery);
  };

  const pressEnter = (event) => {
    
    if (event.key === "Enter") {
      event.preventDefault();
      search();
    }
  };
  return (
    <div className="nav-body">
    <Navbar  bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href=""></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <LinkContainer to="/">
            <Nav.Link >Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/aboutus">
            <Nav.Link >About us</Nav.Link>
            </LinkContainer>
            
            <NavDropdown title="Genre" id="navbarScrollingDropdown">
              <NavDropdown.Item href="">Roll and Move</NavDropdown.Item>
              <NavDropdown.Item href="">Cooperative</NavDropdown.Item>
              <NavDropdown.Item href="">Deck Building</NavDropdown.Item>
              <NavDropdown.Item href="">Party Games</NavDropdown.Item>
              <NavDropdown.Item href="">Strategic</NavDropdown.Item>
            </NavDropdown>
            <LinkContainer to="/contactform">
            <Nav.Link >Contact</Nav.Link>
            </LinkContainer>
            
          </Nav>
          <Form  className="d-flex">
            <Form.Control
            
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={inputHandler}
            />
            <Link  to="/search">
              <Button
                type="submit"
                onClick={search}
                onKeyPress={pressEnter}
                variant="outline-success"
              >
                Search
              </Button>
              
            </Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default NavScroll;
