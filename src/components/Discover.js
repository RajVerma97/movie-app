import React from "react";
import MovieListing from "./MovieListing";
import { Link, useLocation } from "react-router-dom";
import BackArrow from "./BackArrow";

const Discover = () => {
  const {state} = useLocation();

  return (
    <div style={{padding: "2em"}}>
      <BackArrow />
      <h1>Discover</h1>
      <MovieListing data={state} mediaType={"movie"} isSimplified={false} />
    </div>
  );
};

export default Discover;
