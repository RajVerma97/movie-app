import React from "react";
import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate} from "react-router-dom";

const BackArrow = () => {

  const navigate = useNavigate();

  return (
    <div style={{marginBottom: "1em"}}>
      <IconButton size="large"  label="go back" onClick={() => navigate(-1)}>
        <ArrowBack fontSize='large' />
      </IconButton>
    </div>
  );
};

export default BackArrow;
