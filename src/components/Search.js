import React from "react";
import {useParams} from "react-router-dom";
import {useGetSearchMovieQuery} from "../services/movieApi";
import {Grid, Skeleton, CircularProgress} from "@mui/material";
import BackArrow from "./BackArrow";
import Media from "./Media";

const Search = () => {
  const {query} = useParams();
  const {data, isFetching: isSearching} = useGetSearchMovieQuery(query);
  const response = data?.results;

  const filteredArr = response?.filter((elem) => {
    if (elem.poster_path) {
      return elem;
    }
  });

  return (
    <div style={{display: "grid"}}>
      <BackArrow />

      {isSearching ? (
        <CircularProgress
          style={{justifySelf: "center", marginBottom: "2em"}}
        />
      ) : null}

      {filteredArr?.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1em",
            width: "80%",
            margin: "0 auto",
            maxWidth: "400px",
            height: "80vh",
          }}
        >
          <img
            alt=""
            src="../assets/tryAgain.svg"
            style={{width: "100%", marginBottom: "2em"}}
          />
          <h2 style={{color: "red"}}>data not found!!</h2>
        </div>
      )}
      <Grid
        style={{marginBottom: "3em"}}
        container
        spacing={{xs: 3, sm: 3, md: 4, lg: 4, xl: 5}}
      >
        {filteredArr?.map((media) => {
          return (
            <Grid key={media?.id} item xs={6} sm={4} md={4} lg={4} xl={3}>
              {isSearching ? (
                <Skeleton variant="rectangular" width={"100%"} height={300} />
              ) : (
                <Media media={media} mediaType={media?.media_type} />
              )}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Search;
