"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Carousel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./movies.css";

export default function ListMovies(props) {
  console.log(props);
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

  return (
    <div className='home_size_carousel'>
      <div className='home_carousel'>
        <h3>List of movies</h3>
        {movies ? (
          <Carousel>
            {movies.reduce((chunks, movie, index) => {
              if (index % 4 === 0) {
                chunks.push([]);
              }
              chunks[chunks.length - 1].push(movie);
              return chunks;
            }, []).map((chunk, chunkIndex) => (
              <Carousel.Item key={chunkIndex}>
                <div className="row justify-content-center">
                  {chunk.map(movie => (
                    <div className="col-lg-3 col-md-6 mb-4" key={movie.id}>
                      <Card style={{ width: '100%' }} className='heigh_card_list'>
                        <Card.Img variant="top" className="popular_image"
                          src={movie.images && movie.images.backdrops && movie.images.backdrops.length > 0 && `https://image.tmdb.org/t/p/w500${movie.images.backdrops[0].file_path}`} alt={movie.title} />
                        <Card.Body>
                          <Link href={"/movies/" + movie.title}>
                            <Card.Title>{movie.title}</Card.Title>
                          </Link>
                        </Card.Body>

                      </Card>
                    </div>
                  ))}
                </div>
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



