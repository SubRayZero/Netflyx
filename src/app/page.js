"use client"

import PopularMovie from "@/components/popularMovies";
import ListMovies from "@/components/movies";
import Navbars from "@/components/navbar";
import ReleaseDate from "@/components/releaseDate";
import HeroBanner from "@/components/heroBanner";

export default function Home() {
  return (
    <>
      <Navbars />
      <HeroBanner />
      <PopularMovie />
      <ReleaseDate />
      <ListMovies />
    </>
  );
}
