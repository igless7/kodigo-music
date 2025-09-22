import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, Button, Container, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

export const Navigation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}&type=artist`);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">SpotifyApp</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/form">Formulario</Nav.Link>
        </Nav>
        <Form onSubmit={handleSearch}>
          <InputGroup>
            <Form.Control
              type="search"
              placeholder="¿Qué quieres escuchar?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ minWidth: '300px' }}
            />
            <Button variant="outline-light" type="submit">
              <Search />
            </Button>
          </InputGroup>
        </Form>
      </Container>
    </Navbar>
  );
};

