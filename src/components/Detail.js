import {lazy, Suspense} from "react";
import {useState} from "react";
import {memo} from "react";

import StarIcon from "@mui/icons-material/Star";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";

// import {IMAGEPATH} from "../services/ApiImagePath";
import CircularProgress from "@mui/material/CircularProgress";

const BackArrow = lazy(() => import("../components/BackArrow"));
const IMAGEPATH = process.env.REACT_APP_IMAGE_PATH;

const Detail = ({
  media,
  mediaType,
  cast,
  images,
  videos,
  isFetchingMedia,
  isFetchingImages,
  isFetchingVideos,
  isFetchingCast,
}) => {
  const [isFrameLoading, setIsFrameLoading] = useState(true);
  return (
    <div>
      <Suspense>
        <BackArrow />
      </Suspense>

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
            {isFetchingMedia ? (
              <Skeleton variant="rectangular" width={"100%"} height={500} />
            ) : (
              <img
                className="movie movie__image"
                src={`${IMAGEPATH}/${media?.poster_path}`}
                alt="poster"
                loading="lazy"
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
              {isFetchingMedia ? (
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
                  {media?.genres?.map((genre, index) => {
                    return (
                      <Grid key={index} item xs={6} sm={6} md={4} lg={3} xl={3}>
                        {isFetchingMedia ? (
                          <Skeleton
                            variant="rectangular"
                            width={"100%"}
                            height={70}
                          />
                        ) : (
                          <Chip className="genre" label={genre?.name} />
                        )}
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
              <div className="description">
                {isFetchingMedia ? (
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
                  {isFetchingMedia ? (
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
                  {isFetchingMedia ? (
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
                      {isFetchingImages ? (
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
                          loading="lazy"
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
                {media?.production_companies.map((company, index) =>
                  company.logo_path ? (
                    <Grid
                      item
                      key={index}
                      className="company"
                      style={{justifySelf: "center"}}
                      xs={6}
                      sm={4}
                      md={3}
                      lg={3}
                      xl={4}
                    >
                      {isFetchingMedia ? (
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
                          loading="lazy"
                        />
                      )}
                    </Grid>
                  ) : null
                )}
              </Grid>
            </>
          )}
        </section>
        <section className="section">
          {cast?.length > 0 && (
            <>
              <h3 className="section__title">cast</h3>

              <Grid className="section__container" container spacing={3}>
                {cast?.map((cast, index) =>
                  cast.profile_path ? (
                    <Grid
                      item
                      key={index}
                      className="cast"
                      style={{justifySelf: "center"}}
                      xs={6}
                      sm={4}
                      md={2}
                      lg={2}
                      xl={2}
                    >
                      {isFetchingCast ? (
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
                          loading="lazy"
                        />
                      )}
                    </Grid>
                  ) : null
                )}
              </Grid>
            </>
          )}
        </section>

        <section className="section">
          {videos?.length > 0 && (
            <>
              <h3 className="section__title">videos</h3>

              <div className="section__container videos__container">
                {videos?.map((video, index) => {
                  return video.key ? (
                    <div
                      key={index}
                      className="videos video"
                      style={{display: "grid"}}
                    >
                      {isFetchingVideos ? (
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={150}
                        />
                      ) : (
                        <>
                          {isFrameLoading ? (
                            <CircularProgress style={{justifySelf: "center"}} />
                          ) : null}
                          <iframe
                            id="iframe"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "8px",
                              outline: "none",
                              border: "none",
                            }}
                            src={"https://www.youtube.com/embed/" + video.key}
                            loading="lazy"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            frameBorder="0"
                            onLoad={() => setIsFrameLoading(false)}
                          ></iframe>
                        </>
                      )}
                    </div>
                  ) : null;
                })}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default memo(Detail);
