import {memo} from "react";
import {lazy, Suspense} from "react";
import {
  useGetMovieDetailsQuery,
  useGetMovieCastQuery,
  useGetMovieImagesQuery,
  useGetMovieVideosQuery,
} from "../services/movieApi";
const Detail = lazy(() => import("../components/Detail"));

const IMAGES_LIMIT = 8;
const CAST_LIMIT = 6;
const VIDEOS_LIMIT = 2;

const MovieDetail = ({mediaType, mediaId}) => {
  const {data: movie, isFetching: isFetchingMovie} =
    useGetMovieDetailsQuery(mediaId);

  const {data: movieCredits, isFetching: isFetchingMovieCredits} =
    useGetMovieCastQuery(mediaId);
  const {data: movieImagesData, isFetching: isFetchingMovieImages} =
    useGetMovieImagesQuery(mediaId);
  const {data: movieVideosData, isFetching: isFetchingMovieVideos} =
    useGetMovieVideosQuery(mediaId);

  let media,
    cast,
    images,
    videos,
    isFetchingMedia,
    isFetchingImages,
    isFetchingCast,
    isFetchingVideos;

  media = movie;
  cast = movieCredits?.cast?.slice(0, CAST_LIMIT);
  images = movieImagesData?.backdrops?.slice(0, IMAGES_LIMIT);
  videos = movieVideosData?.results.slice(0, VIDEOS_LIMIT);
  isFetchingMedia = isFetchingMovie;
  isFetchingImages = isFetchingMovieImages;
  isFetchingVideos = isFetchingMovieVideos;
  isFetchingCast = isFetchingMovieCredits;
  return (
    <Suspense>
      <Detail
        media={media}
        mediaType={mediaType}
        cast={cast}
        images={images}
        videos={videos}
        isFetchingMedia={isFetchingMedia}
        isFetchingImages={isFetchingImages}
        isFetchingVideos={isFetchingVideos}
        isFetchingCast={isFetchingCast}
      />
    </Suspense>
  );
};

export default memo(MovieDetail);
