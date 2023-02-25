import React from "react";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import {Card, CardContent, CardMedia, Skeleton} from "@mui/material";
import "./Media.css";
import {IMAGEPATH} from "../services/ApiImagePath";
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

export default Media;
