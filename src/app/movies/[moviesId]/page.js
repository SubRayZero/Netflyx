"use client"

import Navbars from '@/components/navbar';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function MoviesDetails(props) {
    console.log(props.params.moviesId);
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${props.params.moviesId}?language=fr_FR`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzI1MDI1ZTU5MjhhYjg5MGFmOWVkZTQyMjZiMjhkMSIsInN1YiI6IjY2NDFmZjQ3NDc0NmU5OGE4ZGZiNWJiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UZkv8hTpx5fXs8Acln1k6I9w5RDTGjft5uZNED3OgvM'
                    }
                });
                const data = await response.json();
                setMovieDetails(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [props.params.moviesId]);

    return (

        <>
            <Navbars>
            </Navbars>
            <Container>
                <div className="mt-5">
                    {movieDetails ? (
                        <div className="card mx-auto" style={{ maxWidth: '50rem' }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    {movieDetails.poster_path && (
                                        <Card.Img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
                                    )}
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{movieDetails.title}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Release Date: {movieDetails.release_date}</h6>
                                        <p className="card-text">{movieDetails.overview}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </Container>

        </>
    );
}
