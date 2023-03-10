import {lazy, Suspense} from "react";

import {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetPopularTvQuery,
  useGetTopRatedTvQuery,
} from "../services/movieApi";

const ShowcaseRow = lazy(() => import("../components/ShowcaseRow"));

const Home = () => {
  const {data: response1, isFetching: isFetchingPopularMovies} =
    useGetPopularMoviesQuery();
  const popularMovies = response1?.results;

  const {data: response3, isFetching: isFetchingTopRatedMovies} =
    useGetTopRatedMoviesQuery();
  const topRatedMovies = response3?.results;

  const {data: response5, isFetching: isFetchingPopularTv} =
    useGetPopularTvQuery();
  const popularTv = response5?.results;

  const {data: response6, isFetching: isFetchingTopRatedTv} =
    useGetTopRatedTvQuery();
  const topRatedTv = response6?.results;

  return (
    <div className="home">
      <Suspense>
        <ShowcaseRow
          title={"popular movies"}
          mediaType={"movie"}
          data={popularMovies}
          isFetching={isFetchingPopularMovies}
        />
        <ShowcaseRow
          title={"top rated movies"}
          mediaType={"movie"}
          data={topRatedMovies}
          isFetching={isFetchingTopRatedMovies}
        />
        <ShowcaseRow
          title={"popular shows"}
          mediaType={"tv"}
          data={popularTv}
          isFetching={isFetchingPopularTv}
        />
        <ShowcaseRow
          title={"top rated tv"}
          mediaType={"tv"}
          data={topRatedTv}
          isFetching={isFetchingTopRatedTv}
        />
      </Suspense>
    </div>
  );
};

export default Home;
