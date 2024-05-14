"use client"

import PopularMovie from "@/components/popularMovies";
import ListMovies from "@/components/movies";
import Navbars from "@/components/navbar";
import ReleaseDate from "@/components/releaseDate";
import HeroBanner from "@/components/heroBanner";
import TopRated from "@/components/topRate";

export default function Home() {
  return (
    <>

      <Navbars />
      <HeroBanner />
      <div className="container_home">
        <ReleaseDate />
        <PopularMovie />
        <TopRated />
        <ListMovies />
      </div>
    </>
  );
}
