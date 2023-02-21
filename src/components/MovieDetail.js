import React from "react";
import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Container, Grid, Chip, IconButton, Avatar} from "@mui/material";
import {
  useGetMovieDetailsQuery,
  useGetMovieCastQuery,
  useGetPeopleQuery,
  useGetTvDetailsQuery,
  useGetMovieImagesQuery,
  useGetMovieVideosQuery,
  useGetMovieReviewsQuery,
  useGetTvImagesQuery,
  useGetTvVideosQuery,
  useGetTvReviewsQuery,
} from "../services/movieApi";

import "./MovieDetail.css";
import BackArrow from "./BackArrow";
const IMAGEPATH = "https://image.tmdb.org/t/p/w1280";
const IMAGES_LIMIT = 8;
const CAST_LIMIT = 6;
const VIDEOS_LIMIT = 6;

const MovieDetail = () => {
  const {mediaType, mediaId} = useParams();
  const {data: movie, isFetching: isMovieFetching} =
    useGetMovieDetailsQuery(mediaId);
  const {data: tv, isFetching: isTvFetching} = useGetTvDetailsQuery(mediaId);
  const {data: movieCredits, isFetching: isMovieCreditsFetching} =
    useGetMovieCastQuery(mediaId);

  const {data: tvCredits, isFetching: isTvCreditsFetching} =
    useGetMovieCastQuery(mediaId);

  const {data: movieImagesData, isFetching: isFetchingMovieImages} =
    useGetMovieImagesQuery(mediaId);
  const {data: tvImagesData, isFetching: isFetchingTvImages} =
    useGetTvImagesQuery(mediaId);

  const {data: movieVideosData, isFetching: isFetchingMovieVideos} =
    useGetMovieVideosQuery(mediaId);

  const {data: tvVideosData, isFetching: isFetchingTvVideos} =
    useGetTvVideosQuery(mediaId);

  let media, cast, images, videos;
  if (mediaType === "movie") {
    media = movie;
    cast = movieCredits?.cast?.slice(0, CAST_LIMIT);
    images = movieImagesData?.backdrops?.slice(0, IMAGES_LIMIT);
    videos = movieVideosData?.results.slice(0, VIDEOS_LIMIT);
  } else {
    media = tv;
    cast = tvCredits?.cast?.slice(0, CAST_LIMIT);
    images = tvImagesData?.backdrops?.slice(0, IMAGES_LIMIT);
    videos = movieVideosData?.results.slice(0, VIDEOS_LIMIT);
  }

  console.log(videos);

  const navigate = useNavigate();

  return (
    <div>
      <BackArrow />
      <div className="wrapper">
        <Grid container rowSpacing={2}>
          <Grid
            className=" movie movie__left"
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
          >
            <img
              className="movie movie__image"
              src={`${IMAGEPATH}/${media?.poster_path}`}
              alt="poster"
            />
          </Grid>
          <Grid
            className="movie__right"
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
          >
            <div className="movie__info">
              <span className="movie__title">{media?.original_title}</span>

              <span className="movie__year">
                (
                {mediaType === "movie"
                  ? media?.release_date.split("-")[0]
                  : media?.first_air_date.split("-")[0]}
                )
              </span>
              <div className="genreWrapper">
                {media?.genres?.map((genre) => {
                  return (
                    <Chip
                      className="genre"
                      label={genre?.name}
                      key={genre.id}
                    />
                  );
                })}
              </div>

              <span>
                {mediaType === "movie"
                  ? `${parseInt(media?.runtime / 60)}h ${media?.runtime % 60}m `
                  : `${media?.seasons?.length} seasons`}
              </span>
              <span>{`${media?.vote_average.toFixed(1)}`}</span>
              <div className="description">
                <p className="movie__description">{media?.overview}</p>
              </div>
            </div>
          </Grid>
        </Grid>

        <div className="companiesWrapper">
          <h3 className="companies__title">companies</h3>

          <Grid container spacing={5}>
            {media?.production_companies.map((company) => {
              if (company.logo_path) {
                return (
                  <Grid
                    item
                    key={company.id}
                    className="company"
                    style={{justifySelf: "center"}}
                    xs={4}
                    sm={4}
                    md={3}
                    lg={2}
                    xl={2}
                  >
                    <img
                      className="company__image"
                      src={`${IMAGEPATH}${company.logo_path}`}
                      alt=""
                    />
                  </Grid>
                );
              }
            })}
          </Grid>
        </div>
        <div className="companiesWrapper">
          <h3 className="companies__title">cast</h3>

          <Grid container spacing={4}>
            {cast?.map((cast) => {
              if (cast.profile_path) {
                return (
                  <Grid
                    item
                    key={cast.id}
                    className="cast"
                    style={{justifySelf: "center"}}
                    xs={4}
                    sm={4}
                    md={2}
                    lg={2}
                    xl={4}
                  >
                    <img
                      className="cast__image"
                      src={`${IMAGEPATH}${cast.profile_path}`}
                      alt=""
                    />
                  </Grid>
                );
              }
            })}
          </Grid>
        </div>

        <div className="companiesWrapper">
          <h3 className="companies__title">Images</h3>

          <Grid container spacing={2}>
            {images?.map((image, index) => {
              return (
                <Grid
                  item
                  key={index}
                  className="images"
                  style={{justifySelf: "center"}}
                  xs={4}
                  sm={4}
                  md={3}
                  lg={2}
                  xl={4}
                >
                  <img
                    className="image"
                    style={{width: "100%", height: "100%"}}
                    src={`${IMAGEPATH}${image.file_path}`}
                    alt=""
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>

        <div className="companiesWrapper">
          <h3 className="companies__title">videos</h3>

          <Grid container spacing={2}>
            {videos?.map((video, index) => {
              return (
                <Grid
                  item
                  key={index}
                  className="videos"
                  style={{justifySelf: "center"}}
                  xs={4}
                  sm={4}
                  md={4}
                  lg={2}
                  xl={4}
                >
                  <iframe
                    style={{width:'100%',height:'100%'}}
                    src={"https://www.youtube.com/embed/"+video.key}
                    title="YouTube video player"
                    frameborder="1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
