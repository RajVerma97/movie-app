import React from "react";

import {useEffect, useRef} from "react";

import {useNavigate} from "react-router-dom";

import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TvIcon from "@mui/icons-material/Tv";
import MovieIcon from "@mui/icons-material/Movie";
import HomeIcon from "@mui/icons-material/Home";

import "./Sidebar.css";

function Sidebar({isSidebarActive, setIsSidebarActive}) {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    if (isSidebarActive) {
      if (isMounted) {
        sidebarRef.current.style.display = "block";
        document.body.style.position = "fixed";
      }
    } else {
      if (isMounted) {
        sidebarRef.current.style.display = "none";
        document.body.style.position = "static";
      }
    }

    return () => {
      isMounted = false;
    };
  }, [isSidebarActive]);
  return (
    <div className="sidebar" style={{display: "none"}} ref={sidebarRef}>
      <IconButton
        className="closeIconBtn"
        onClick={() => {
          setIsSidebarActive(false);
        }}
      >
        <CloseIcon style={{fontSize: "1.5em"}} />
      </IconButton>
      <button
        href="/"
        onClick={() => {
          navigate("/");
          setIsSidebarActive(false);
        }}
        className="sidebar-btn"
      >
        <HomeIcon className="sidebar__icon" />
        <span> home</span>
      </button>
      <button
        onClick={() => {
          navigate("/explore/movie");
          setIsSidebarActive(false);
        }}
        className="sidebar-btn"
      >
        <MovieIcon className="sidebar__icon" />
        movie
      </button>
      <button
        onClick={() => {
          navigate("/explore/tv");
          setIsSidebarActive(false);
        }}
        className="sidebar-btn"
      >
        <TvIcon className="sidebar__icon" />
        tv
      </button>
    </div>
  );
}

export default Sidebar;
