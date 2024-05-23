"use client"

import React, { useState } from 'react';




import HeroBanner from '@/components/heroBanner';
import ReleaseDate from '@/components/releaseDate';
import Navbars from '@/components/navbar';
import TopRated from '@/components/topRate';
import ListMovies from '@/components/movies';
import SearchResult from '@/components/search';
import PopularMovies from '@/components/popularMovies';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    try {

      const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzI1MDI1ZTU5MjhhYjg5MGFmOWVkZTQyMjZiMjhkMSIsInN1YiI6IjY2NDFmZjQ3NDc0NmU5OGE4ZGZiNWJiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UZkv8hTpx5fXs8Acln1k6I9w5RDTGjft5uZNED3OgvM'
        }
      });


      const searchData = await response.json();


      setSearchResults(searchData.results);
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
  };
  
return  (
    <>
      <Navbars onSearch={handleSearch} />
      {searchQuery ? (
        <SearchResult searchResults={searchResults} />
      ) : (
        <>
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

}
