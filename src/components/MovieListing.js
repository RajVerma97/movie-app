import React, {useEffect} from "react";
import {useState} from "react";

import {Link} from "react-router-dom";

import "./MovieListing.css";
import {
  Grid,
  Container,
  Paper,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const IMAGEPATH = "https://image.tmdb.org/t/p/w1280";

const MovieListing = ({data, mediaType, isSimplified}) => {
  if (isSimplified) {
    data = data?.slice(0, 4);
  }

  return (
    <div>
      <Grid container spacing={4}>
        {data?.map((media) => {
          return (
            <Grid key={media.id} item xs={12} sm={12} md={4} lg={3} xl={2}>
              <Link
                to={
                  mediaType === "movie"
                    ? `/movie/${media.id}`
                    : `/tv/${media.id}`
                }
                style={{textDecoration: "none"}}
              >
                <Card sx={{height: 450}} className="showcase__movie">
                  <CardMedia
                    sx={{height: "75%"}}
                    image={IMAGEPATH + media?.poster_path}
                    className="showcase__movie__image"
                    title="movie"
                  />
                  <CardContent>
                    <h1 className="showcase__movie__title">
                      {mediaType === "movie"
                        ? media.original_title
                        : media.original_name}
                    </h1>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default MovieListing;
