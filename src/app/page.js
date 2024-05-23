
"use client"
import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbars from '@/components/navbar';
import HeroBanner from '@/components/heroBanner';
import ReleaseDate from '@/components/releaseDate';
import TopRated from '@/components/topRate';
import ListMovies from '@/components/movies';
import SearchResult from '@/components/search';
import PopularMovies from '@/components/popularMovies';
import "./globals.css";

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

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      const searchData = await response.json();
      setSearchResults(searchData.results);
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
  };

  const handleSelectGenre = async (genreId) => {
    setSelectedGenre(genreId);
    const moviesByGenre = await fetchMoviesByGenre(genreId);
    setMovies(moviesByGenre);
  };

  useEffect(() => {
    if (selectedGenre !== null) {
      handleSelectGenre(selectedGenre);
    }
  }, [selectedGenre]);

  return (
    <>
      <Navbars onSearch={handleSearch} onSelectGenre={handleSelectGenre} />
      {searchQuery ? (
        <SearchResult searchResults={searchResults} />
      ) : (
        <>
          {selectedGenre && (
            <Container>
              <h1>Category : </h1>
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
          )}
          <HeroBanner />
          <div className="container_home">
            <ReleaseDate />
            <PopularMovies />
            <TopRated />
            <ListMovies />

          </div>
        </>
      )}
    </>
  );
};

export default Home;
