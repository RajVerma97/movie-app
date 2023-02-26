// import {APIKEY} from "./MovieApiKey";

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const APIKEY = process.env.REACT_APP_API_KEY;

const createRequest = (url) => url + "?api_key=" + APIKEY;
export const movieApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),

  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => createRequest(`/discover/movie`),
    }),
    getPopularMovies: builder.query({
      query: () => createRequest(`/movie/popular`),
    }),
    getTopRatedMovies: builder.query({
      query: () => createRequest(`/movie/top_rated`),
    }),
    getNowPlayingMovies: builder.query({
      query: () => createRequest(`/movie/now_playing`),
    }),
    getLatestMovies: builder.query({
      query: () => createRequest(`/movie/latest`),
    }),
    getMovieImages: builder.query({
      query: (movieId) => createRequest(`/movie/${movieId}/images`),
    }),
    getMovieVideos: builder.query({
      query: (movieId) => createRequest(`/movie/${movieId}/videos`),
    }),
    getMovieReviews: builder.query({
      query: (movieId) => createRequest(`/movie/${movieId}/reviews`),
    }),

    getTvImages: builder.query({
      query: (tvId) => createRequest(`/tv/${tvId}/images`),
    }),

    getTvVideos: builder.query({
      query: (tvId) => createRequest(`/tv/${tvId}/videos`),
    }),
    getTvReviews: builder.query({
      query: (tvId) => createRequest(`/tv/${tvId}/reviews`),
    }),
    getLatestTv: builder.query({
      query: () => createRequest(`/tv/latest`),
    }),
    getPopularTv: builder.query({
      query: () => createRequest(`/tv/popular`),
    }),
    getTopRatedTv: builder.query({
      query: () => createRequest(`/tv/top_rated`),
    }),

    getMovieDetails: builder.query({
      query: (movieId) => createRequest(`/movie/${movieId}`),
    }),
    getTvDetails: builder.query({
      query: (tvId) => createRequest(`/tv/${tvId}`),
    }),
    getMovieCast: builder.query({
      query: (movieId) => createRequest(`/movie/${movieId}/credits`),
    }),
    getTvCast: builder.query({
      query: (tvId) => createRequest(`/tv/${tvId}/credits`),
    }),

    getPeople: builder.query({
      query: (personId) => createRequest(`/person/${personId}`),
    }),
    getSearchMovie: builder.query({
      query: (searchText) =>
        `/search/multi?api_key=${APIKEY}&language=en-US&query=${searchText}`,
    }),
    getMoviesByGenre: builder.query({
      query: (genreId) =>
        `/discover/movie?api_key=${APIKEY}&language=en-US&with_genres=${genreId}`,
    }),
    getTvByGenre: builder.query({
      query: (genreId) =>
        `/discover/tv?api_key=${APIKEY}&language=en-US&with_genres=${genreId}`,
    }),
  }),
});
export const {
  useGetMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetLatestMoviesQuery,
  useGetLatestTvQuery,
  useGetPopularTvQuery,
  useGetTopRatedTvQuery,
  useGetMovieDetailsQuery,
  useGetMovieCastQuery,
  useGetTvCastQuery,
  useGetPeopleQuery,
  useGetSearchMovieQuery,
  useGetTvDetailsQuery,
  useGetMovieImagesQuery,
  useGetMovieVideosQuery,
  useGetMovieReviewsQuery,
  useGetTvImagesQuery,
  useGetTvVideosQuery,
  useGetTvReviewsQuery,

  useGetMoviesByGenreQuery,
  useGetTvByGenreQuery,
} = movieApi;
