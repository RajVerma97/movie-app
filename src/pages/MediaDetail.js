import {lazy, Suspense} from "react";

import {useParams} from "react-router-dom";

import "./MediaDetail.css";
const MovieDetail = lazy(() => import("../components/MovieDetail"));
const TvDetail = lazy(() => import("../components/TvDetail"));

const MediaDetail = () => {
  const {mediaType, mediaId} = useParams();

  return (
    <div>
      {mediaType === "movie" ? (
        <Suspense>
          <MovieDetail mediaType={mediaType} mediaId={mediaId} />
        </Suspense>
      ) : (
        <Suspense>
          <TvDetail mediaType={mediaType} mediaId={mediaId} />
        </Suspense>
      )}
    </div>
  );
};

export default MediaDetail;
