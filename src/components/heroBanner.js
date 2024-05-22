import React, { useState, useEffect } from 'react';
import "./heroBanner.css";

export default function HeroBanner() {
    const [firstPopularMovie, setFirstPopularMovie] = useState(null);

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
                if (jsonData.results.length > 0) {
                    setFirstPopularMovie(jsonData.results[0]);
                }
            } catch (error) {
                console.error('Error fetching popular movies:', error);
            }
        };
        fetchPopularMovies();
    }, []);

    return (
        <>
                {firstPopularMovie && (
                    <div>
                        <img
                            className="hero_banner_image"
                            src={`https://image.tmdb.org/t/p/original${firstPopularMovie.poster_path}`}
                            alt={firstPopularMovie.title}
                        />
                    </div>

                )}
           
        </>
    );
}
