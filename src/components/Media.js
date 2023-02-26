import {memo} from "react";

import {Link} from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import "./Media.css";
// import {IMAGEPATH} from "../services/ApiImagePath";
const IMAGEPATH = process.env.REACT_APP_IMAGE_PATH;

const Media = ({media, mediaType}) => {
  return (
    <div>
      <Link
        to={mediaType === "movie" ? `/movie/${media.id}` : `/tv/${media.id}`}
        style={{textDecoration: "none"}}
      >
        <Card className="showcase__movie">
          <CardMedia
            sx={{height: "100%"}}
            image={IMAGEPATH + media?.poster_path}
            className="showcase__movie__image"
            title="movie"
            loading="lazy"
          />
          <CardContent className="showcase__content">
            <div className="showcase__movie__title">
              {mediaType === "movie"
                ? media.original_title
                : media.original_name}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default memo(Media);
