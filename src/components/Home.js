import React from "react";
import {useEffect, useState} from "react";
import {APIKEY} from "../services/MovieApiKey";
import MovieListing from "./MovieListing";
import {
  useGetMoviesQuery,
  useGetNowPlayingMoviesQuery,
} from "../services/movieApi";
import {CircularProgress, Button} from "@mui/material";
import {
  useGetPopularMoviesQuery,
  useGetLatestMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetPopularTvQuery,
  useGetLatestTvQuery,
  useGetTopRatedTvQuery,
} from "../services/movieApi";
import "./Home.css";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const LIMIT = 4;
  const {data: response1, isFetching: isFetchingPopularMovies} =
    useGetPopularMoviesQuery();
  const popularMovies = response1?.results;

  const {data: response2, isFetching: isFetchingNowPlayingMovies} =
    useGetNowPlayingMoviesQuery();
  const nowPlayingMovies = response2?.results;

  const {data: response3, isFetching: isFetchingTopRatedMovies} =
    useGetTopRatedMoviesQuery();
  const topRatedMovies = response3?.results;

  const {data: response4, isFetching: isFetchingLatestMovies} =
    useGetLatestMoviesQuery();
  const latestMovies = response4?.results;

  const {data: response5, isFetching: isFetchingPopularTv} =
    useGetPopularTvQuery();
  const popularTv = response5?.results;

  const {data: response6, isFetching: isFetchingTopRatedTv} =
    useGetTopRatedTvQuery();
  const topRatedTv = response6?.results;

  // if (isFetchingPopularMovies) {
  //   return <CircularProgress />;
  // }
  return (
    <div className="home">
      {/* <h1>discover</h1>
      <MovieListing movies={moviesList} /> */}
      <h1>
        popular movies
        <Button
          variant={"outlined"}
          onClick={() => navigate("/discover", {state: popularMovies})}
        >
          see more
        </Button>
      </h1>
      <MovieListing
        data={popularMovies}
        mediaType={"movie"}
        isSimplified={true}
      />
      {/* <h1>latest movies</h1>
      <MovieListing movies={latestMovies} /> */}
      <h1>
        top rated playing
        <Button
          variant={"outlined"}
          onClick={() => navigate("/discover", {state: topRatedMovies})}
        >
          see more
        </Button>
      </h1>
      <MovieListing
        data={topRatedMovies}
        mediaType={"movie"}
        isSimplified={true}
      />
      <h1>
        popular shows
        <Button
          variant={"outlined"}
          onClick={() => navigate("/discover", {state: popularTv})}
        >
          see more
        </Button>
      </h1>
      <MovieListing data={popularTv} mediaType={"tv"} isSimplified={true} />
    </div>
  );
};

export default Home;
