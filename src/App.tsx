import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import UserPage from './pages/UserPage';
import { Navbar, Nav, Container } from 'react-bootstrap';

function App() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Social App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
