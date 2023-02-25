import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {
  useGetMoviesByGenreQuery,
  useGetTvByGenreQuery,
} from "../services/movieApi";
import ShowcaseRow from "./ShowcaseRow";

const Explore = () => {
  const {mediaType} = useParams();
  console.log(mediaType);

  const genres = [
    {id: 28, name: "Action"},
    {id: 12, name: "Adventure"},
    {id: 16, name: "Animation"},
    {id: 10749, name: "Romance"},
    {id: 878, name: "Sci-fi"},
    {id: 35, name: "Comedy"},
    {id: 14, name: "Fantasy"},
    {id: 53, name: "Thriller"},
    {id: 18, name: "Drama"},
    {id: 80, name: "Crime"},
    {id: 27, name: "Horror"},
  ];

  return (
    <div>
      {genres?.map((genre) => {
        if (mediaType === "movie") {
          return (
            <MoviePortal key={genre.id} genre={genre} mediaType={mediaType} />
          );
        } else {
          return (
            <TvPortal key={genre.id} genre={genre} mediaType={mediaType} />
          );
        }
      })}
    </div>
  );
};

function MoviePortal({genre, mediaType}) {

  const {data: response5, isFetching: isFetchingGenreMovies} =
    useGetMoviesByGenreQuery(genre.id);

  const result = response5?.results;

  return (
    <>
      {result?.length > 0 && (
        <>
          <ShowcaseRow
            title={genre.name}
            mediaType={mediaType}
            data={result}
            isFetching={isFetchingGenreMovies}
          />
        </>
      )}
    </>
  );
}

function TvPortal({genre, mediaType}) {

  const {data: response5, isFetching: isFetchingGenreMovies} =
    useGetTvByGenreQuery(genre.id);

  const result = response5?.results;
  return (
    <div>
      {result?.length > 0 && (
        <>
          <ShowcaseRow title={genre.name} mediaType={mediaType} data={result} />
        </>
      )}
    </div>
  );
}

export default Explore;
