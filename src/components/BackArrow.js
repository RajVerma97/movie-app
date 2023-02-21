import React from "react";
import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {useParams, useNavigate} from "react-router-dom";

const BackArrow = () => {

  const navigate = useNavigate();

  return (
    <div>
      <IconButton label="go back" onClick={() => navigate(-1)}>
        <ArrowBack />
      </IconButton>
    </div>
  );
};

export default BackArrow;
