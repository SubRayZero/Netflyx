import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function Navbars({ onSearch, onSelectGenre }) {
    const [query, setQuery] = useState('');
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzI1MDI1ZTU5MjhhYjg5MGFmOWVkZTQyMjZiMjhkMSIsInN1YiI6IjY2NDFmZjQ3NDc0NmU5OGE4ZGZiNWJiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UZkv8hTpx5fXs8Acln1k6I9w5RDTGjft5uZNED3OgvM'
                    }
                });
                const data = await response.json();
                setGenres(data.genres);
            } catch (error) {
                console.error('Erreur lors de la récupération des genres :', error);
            }
        };

        fetchGenres();
    }, []);

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Categories" id="navbarScrollingDropdown">
                            {genres.length === 0 ? (
                                <NavDropdown.Item disabled>Loading...</NavDropdown.Item>
                            ) : (
                                genres.map((genre) => (
                                    <NavDropdown.Item key={genre.id} onClick={() => onSelectGenre(genre.id)}>
                                        {genre.name}
                                    </NavDropdown.Item>
                                ))
                            )}
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearchSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={query}
                            onChange={handleSearchChange}
                        />
                        <Button variant="outline-success" type="submit">
                            Search
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
