"use client"

import React, { useState, useEffect } from 'react';

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
        <div>
            {movieDetails ? (
                <div>
                    <h2>Title: {movieDetails.title}</h2>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
