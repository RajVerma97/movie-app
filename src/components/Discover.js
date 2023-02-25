import React from "react";
import MovieListing from "./MovieListing";
import {useLocation, useParams} from "react-router-dom";
import BackArrow from "./BackArrow";

const Discover = () => {
  const {state} = useLocation();
  const {mediaType} = useParams();

  return (
    <div>
      <BackArrow />
      <MovieListing data={state} mediaType={mediaType} isSimplified={false} />
    </div>
  );
};

export default Discover;
