import React from "react";
import MovieListing from "./MovieListing";
import {useState, useEffect} from "react";
import {CircularProgress, Button, Skeleton} from "@mui/material";

import {useNavigate} from "react-router-dom";

import "./ShowcaseRow.css";

const ShowcaseRow = ({title, mediaType, data, isFetching}) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(isFetching);
  }, [isFetching]);
  // console.log(isFetching);

  return (
    <div>
      <section className="showcase__section">
        <div className="showcase__section__top">
          {isLoading ? (
            <Skeleton variant="text" width={"50%"} height={40} />
          ) : (
            <>
              <h2 className="showcase__section__title">{title}</h2>
            </>
          )}

          {isLoading ? (
            <Skeleton variant="text" width={"20%"} height={40} />
          ) : (
            <>
              <button
                className="seeMoreBtn"
                onClick={() =>
                  navigate(`/discover/${mediaType}`, {state: data})
                }
              >
                see more
              </button>
            </>
          )}
        </div>

        <MovieListing
          data={data}
          mediaType={mediaType}
          isSimplified={true}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
};

export default ShowcaseRow;
