"use client"
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Link from 'next/link';

export default function ListMovies({searchQuery = '' }) {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzI1MDI1ZTU5MjhhYjg5MGFmOWVkZTQyMjZiMjhkMSIsInN1YiI6IjY2NDFmZjQ3NDc0NmU5OGE4ZGZiNWJiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UZkv8hTpx5fXs8Acln1k6I9w5RDTGjft5uZNED3OgvM'
          }
        });
        const jsonData = await response.json();
        const moviesWithImagesAndDetails = await Promise.all(jsonData.results.map(async movie => {
          const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, {
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzI1MDI1ZTU5MjhhYjg5MGFmOWVkZTQyMjZiMjhkMSIsInN1YiI6IjY2NDFmZjQ3NDc0NmU5OGE4ZGZiNWJiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UZkv8hTpx5fXs8Acln1k6I9w5RDTGjft5uZNED3OgvM'
            }
          });
          const detailsData = await detailsResponse.json();
          const imagesResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/images`, {
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzI1MDI1ZTU5MjhhYjg5MGFmOWVkZTQyMjZiMjhkMSIsInN1YiI6IjY2NDFmZjQ3NDc0NmU5OGE4ZGZiNWJiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UZkv8hTpx5fXs8Acln1k6I9w5RDTGjft5uZNED3OgvM'
            }
          });
          const imagesData = await imagesResponse.json();
          return { ...movie, details: detailsData, images: imagesData };
        }));

        setMovies(moviesWithImagesAndDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies?.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='home_size_carousel'>
      <div className='home_carousel'>
        <h3>List of movies</h3>
        {filteredMovies ? (
          <Carousel>
            {filteredMovies.map(movie => (
              <Carousel.Item key={movie.id}>
                <Link href={"/movies/" + movie.id}>
                  <img
                    className="d-block w-100 popular_image"
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                  <Carousel.Caption>
                    <h3>{movie.title}</h3>
                    <p>Release Date: {movie.release_date}</p>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
