import React from "react";
import {useParams} from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import {Grid, Chip, Skeleton} from "@mui/material";
import {
  useGetMovieDetailsQuery,
  useGetMovieCastQuery,
 
  useGetTvDetailsQuery,
  useGetMovieImagesQuery,
  useGetMovieVideosQuery,
 
  useGetTvImagesQuery,
  useGetTvVideosQuery,
 
  useGetTvCastQuery,
} from "../services/movieApi";

import "./MovieDetail.css";
import BackArrow from "./BackArrow";
import {IMAGEPATH} from "../services/ApiImagePath";
const IMAGES_LIMIT = 8;
const CAST_LIMIT = 6;
const VIDEOS_LIMIT = 4;

const MovieDetail = () => {
  // const posterRef = useRef(null);

  // const [posterHeight, setPosterHeight] = useState(
  //   posterRef?.current?.clientHeight
  // );

  // useEffect(() => {
  //   setPosterHeight(posterRef?.current?.clientHeight);
  // }, [posterRef?.current?.clientHeight]);

  const {mediaType, mediaId} = useParams();
  const {data: movie, isFetching: isMovieFetching} =
    useGetMovieDetailsQuery(mediaId);
  const {data: tv, isFetching: isTvFetching} = useGetTvDetailsQuery(mediaId);
  const {data: movieCredits, isFetching: isMovieCreditsFetching} =
    useGetMovieCastQuery(mediaId);

  const {data: tvCredits, isFetching: isTvCreditsFetching} =
    useGetTvCastQuery(mediaId);

  const {data: movieImagesData, isFetching: isFetchingMovieImages} =
    useGetMovieImagesQuery(mediaId);
  const {data: tvImagesData, isFetching: isFetchingTvImages} =
    useGetTvImagesQuery(mediaId);

  const {data: movieVideosData, isFetching: isFetchingMovieVideos} =
    useGetMovieVideosQuery(mediaId);

  const {data: tvVideosData, isFetching: isFetchingTvVideos} =
    useGetTvVideosQuery(mediaId);

  let media, cast, images, videos;
  if (mediaType === "movie") {
    media = movie;
    cast = movieCredits?.cast?.slice(0, CAST_LIMIT);
    images = movieImagesData?.backdrops?.slice(0, IMAGES_LIMIT);
    videos = movieVideosData?.results.slice(0, VIDEOS_LIMIT);
  } else {
    media = tv;
    cast = tvCredits?.cast?.slice(0, CAST_LIMIT);
    images = tvImagesData?.backdrops?.slice(0, IMAGES_LIMIT);
    videos = tvVideosData?.results.slice(0, VIDEOS_LIMIT);
  }

  

  return (
    <div>
      <BackArrow />

      <div className="wrapper">
        <Grid container rowSpacing={1}>
          <Grid
            className=" movie movie__left"
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
          >
            {isMovieFetching || isTvFetching ? (
              <Skeleton variant="rectangular" width={"100%"} height={500} />
            ) : (
              <img
                className="movie movie__image"
                src={`${IMAGEPATH}/${media?.poster_path}`}
                alt="poster"
              />
            )}
          </Grid>

          <Grid
            className="movie__right"
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
          >
            <div className="movie__info">
              {isMovieFetching || isTvFetching ? (
                <Skeleton variant="text" width={"100%"} height={50} />
              ) : (
                <>
                  <span className="movie__title">
                    {mediaType === "movie"
                      ? media?.original_title
                      : media?.original_name}
                    ({" "}
                    {mediaType === "movie"
                      ? media?.release_date.split("-")[0]
                      : media?.first_air_date.split("-")[0]}
                    )
                  </span>
                </>
              )}

              <div className="genreWrapper">
                <Grid container columnSpacing={3} rowSpacing={2}>
                  {media?.genres?.map((genre) => {
                    return (
                      <Grid item xs={6} sm={6} md={4} lg={3} xl={3}>
                        {isMovieFetching || isTvFetching ? (
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={70}
                          />
                        ) : (
                          <Chip
                            className="genre"
                            label={genre?.name}
                            key={genre.id}
                          />
                        )}
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
              <div className="description">
                {isMovieFetching || isTvFetching ? (
                  <Skeleton variant="text" width={"100%"} height={100} />
                ) : (
                  <p className="movie__description">
                    {media?.overview.length > 150
                      ? media?.overview.substring(0, 150) + "..."
                      : media?.overview}
                  </p>
                )}
              </div>
              <div className="col">
                <div className="movie__rating">
                  {isMovieFetching || isTvFetching ? (
                    <Skeleton variant="rectangular" width={70} height={70} />
                  ) : (
                    <>
                      <span className="rating__value">
                        {`${media?.vote_average.toFixed(1)}`}
                      </span>
                      <StarIcon className="starIcon" />
                    </>
                  )}
                </div>
                <div className="movie__runtime">
                  {isMovieFetching || isTvFetching ? (
                    <Skeleton variant="text" width={100} height={100} />
                  ) : mediaType === "movie" ? (
                    `${parseInt(media?.runtime / 60)}h ${media?.runtime % 60}m `
                  ) : (
                    `${media?.seasons?.length} seasons`
                  )}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>

        <section className="section">
          {images?.length > 0 && (
            <>
              <h3 className="section__title">Images</h3>

              <Grid
                className="section__container"
                container
                rowSpacing={{xs: 2, sm: 2, md: 2, lg: 3, xl: 4}}
                columnSpacing={{xs: 2, sm: 2, md: 2, lg: 3, xl: 4}}
              >
                {images?.map((image, index) => {
                  return (
                    <Grid
                      item
                      key={index}
                      className="images"
                      style={{justifySelf: "center"}}
                      xs={6}
                      sm={4}
                      md={3}
                      lg={3}
                      xl={4}
                    >
                      {isFetchingMovieImages || isFetchingTvImages ? (
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={100}
                        />
                      ) : (
                        <img
                          className="images__image"
                          src={`${IMAGEPATH}${image.file_path}`}
                          alt=""
                        />
                      )}
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
        </section>

        <section className="section">
          {media?.production_companies.length > 0 && (
            <>
              <h3 className="section__title">companies</h3>

              <Grid className="section__container" container spacing={3}>
                {media?.production_companies.map((company) => {
                  if (company.logo_path) {
                    return (
                      <Grid
                        item
                        key={company.id}
                        className="company"
                        style={{justifySelf: "center"}}
                        xs={6}
                        sm={4}
                        md={3}
                        lg={3}
                        xl={4}
                      >
                        {isMovieFetching || isTvFetching ? (
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={100}
                          />
                        ) : (
                          <img
                            className="company__image"
                            src={`${IMAGEPATH}${company.logo_path}`}
                            alt=""
                          />
                        )}
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </>
          )}
        </section>
        <section className="section">
          {cast?.length > 0 && (
            <>
              <h3 className="section__title">cast</h3>

              <Grid className="section__container" container spacing={3}>
                {cast?.map((cast) => {
                  if (cast.profile_path) {
                    return (
                      <Grid
                        item
                        key={cast.id}
                        className="cast"
                        style={{justifySelf: "center"}}
                        xs={6}
                        sm={4}
                        md={2}
                        lg={2}
                        xl={2}
                      >
                        {isMovieCreditsFetching || isTvCreditsFetching ? (
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={150}
                          />
                        ) : (
                          <img
                            className="cast__image"
                            src={`${IMAGEPATH}${cast.profile_path}`}
                            alt=""
                          />
                        )}
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </>
          )}
        </section>

        <section className="section">
          {videos?.length > 0 && (
            <>
              <h3 className="section__title">videos</h3>

              <div className="section__container videos__container">
                {videos?.map((video) => {
                  return (
                    <div key={video.id} className="videos video">
                      {isFetchingMovieVideos || isFetchingTvVideos ? (
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={150}
                        />
                      ) : (
                        <iframe
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "8px",
                            outline: "none",
                            border: "none",
                          }}
                          src={"https://www.youtube.com/embed/" + video.key}
                          title="YouTube video player"
                          frameBorder="1"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          frameBorder="0"
                        ></iframe>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default MovieDetail;
