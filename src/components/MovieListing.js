import React, {useEffect} from "react";
import {useState} from "react";


import {Grid, Skeleton} from "@mui/material";
import Media from "./Media";


const MovieListing = ({data, mediaType, isSimplified, isLoading}) => {
  // console.log(isFetching);

  const [y, setY] = useState(true);

  useEffect(() => {
    setY(isLoading);
  }, [isLoading]);

  if (isSimplified) {
    data = data?.slice(0, 4);
  }

  return (
    <div>
      <Grid container spacing={{xs: 3, sm: 3, md: 3, lg: 4, xl: 6}}>
        {data?.map((media) => {
          return (
            <Grid key={media.id} item xs={6} sm={4} md={3} lg={3} xl={3}>
              {y ? (
                <Skeleton variant="rectangular" width={"100%"} height={100} />
              ) : (
                <Media media={media} mediaType={mediaType} />
              )}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default MovieListing;
