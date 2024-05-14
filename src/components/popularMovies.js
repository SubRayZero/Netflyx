import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import "./popularMovies.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function PopularMovie() {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzI1MDI1ZTU5MjhhYjg5MGFmOWVkZTQyMjZiMjhkMSIsInN1YiI6IjY2NDFmZjQ3NDc0NmU5OGE4ZGZiNWJiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UZkv8hTpx5fXs8Acln1k6I9w5RDTGjft5uZNED3OgvM'
                    }
                });
                const jsonData = await response.json();
                setPopularMovies(jsonData.results);
            } catch (error) {
                console.error('Error fetching popular movies:', error);
            }
        };
        fetchPopularMovies();
    }, []);

    return (
        <div className='home_size_carousel'>
            <div className='home_carousel'>
                {popularMovies ? (
                    <Carousel>
                        {popularMovies.map(movie => (
                            <Carousel.Item key={movie.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" className="d-block w-100 popular_image"
                                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                        alt={movie.title} />
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <p>Chargement...</p>
                )}
            </div>
        </div>
    );
}
