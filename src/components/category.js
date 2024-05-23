// CategoryPage.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function CategoryPage() {



    const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzI1MDI1ZTU5MjhhYjg5MGFmOWVkZTQyMjZiMjhkMSIsInN1YiI6IjY2NDFmZjQ3NDc0NmU5OGE4ZGZiNWJiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UZkv8hTpx5fXs8Acln1k6I9w5RDTGjft5uZNED3OgvM';

    const fetchMoviesByGenre = async (genreId) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`,
            },
        };
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`, options);
        const data = await response.json();
        return data.results;
    };

    const CategoryPage = ({ genreId }) => {
        const [movies, setMovies] = useState([]);

        useEffect(() => {
            if (genreId) {
                fetchMoviesByGenre(genreId).then(setMovies);
            }
        }, [genreId]);

        return (
            <Container>
                <Row>
                    {movies.map((movie) => (
                        <Col key={movie.id} md={4} lg={3} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>
                                        Release Date: {movie.release_date}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    };
}

