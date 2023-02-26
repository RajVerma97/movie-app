import {lazy, Suspense} from "react";

import {memo} from "react";
import {
  useGetTvDetailsQuery,
  useGetTvImagesQuery,
  useGetTvVideosQuery,
  useGetTvCastQuery,
} from "../services/movieApi";

const Detail = lazy(() => import("../components/Detail"));

const IMAGES_LIMIT = 8;
const CAST_LIMIT = 6;
const VIDEOS_LIMIT = 2;

const TvDetail = ({mediaType, mediaId}) => {
  const {data: tv, isFetching: isTvFetching} = useGetTvDetailsQuery(mediaId);
  const {data: tvCredits, isFetching: isFetchingTvCredits} =
    useGetTvCastQuery(mediaId);

  const {data: tvImagesData, isFetching: isFetchingTvImages} =
    useGetTvImagesQuery(mediaId);

  const {data: tvVideosData, isFetching: isFetchingTvVideos} =
    useGetTvVideosQuery(mediaId);

  let media,
    cast,
    images,
    videos,
    isFetchingMedia,
    isFetchingImages,
    isFetchingCast,
    isFetchingVideos;

  media = tv;
  cast = tvCredits?.cast?.slice(0, CAST_LIMIT);
  images = tvImagesData?.backdrops?.slice(0, IMAGES_LIMIT);
  videos = tvVideosData?.results.slice(0, VIDEOS_LIMIT);
  isFetchingMedia = isTvFetching;
  isFetchingImages = isFetchingTvImages;
  isFetchingVideos = isFetchingTvVideos;
  isFetchingCast = isFetchingTvCredits;

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

export default memo(TvDetail);
