import React from "react";
import {useParams, Link} from "react-router-dom";
import MovieListing from "./MovieListing";
import {useGetSearchMovieQuery} from "../services/movieApi";
import { Grid } from "@mui/material";
import BackArrow from "./BackArrow";

const IMAGEPATH = "https://image.tmdb.org/t/p/w1280";

const Search = () => {
  const {query} = useParams();
  const {data, isFetching} = useGetSearchMovieQuery(query);
  const response = data?.results;

  const filteredArr = response?.filter((elem) => {
    if (elem.poster_path) {
      return elem;
    }
  });

  return (
    <div style={{ padding: "3em" }}>
      <BackArrow/>
      <Grid container spacing={4}>
        {filteredArr?.map((media) => {
          return (
            <Grid key={media.id} item xs={6} sm={6} md={4} lg={3} xl={2}>
              <Link
                style={{height: "200px"}}
                to={
                  media?.media_type === "movie"
                    ? `/movie/${media.id}`
                    : `/tv/${media.id}`
                }
              >
                <img
                  style={{width: "100%", height: "100%"}}
                  src={
                    IMAGEPATH + media?.poster_path ||
                    IMAGEPATH + media?.backdrop_path
                  }
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Search;
