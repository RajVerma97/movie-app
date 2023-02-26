import React, {useRef, memo, useCallback} from "react";
import {Link} from "react-router-dom";
import "./Header.css";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({isSidebarActive, setIsSidebarActive}) => {
  const logoRef = useRef();
  const formRef = useRef();
  const inputRef = useRef();
  const windowWidth = window.innerWidth;

  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (windowWidth < 700) {
        logoRef.current.style.display = "block";
        formRef.current.style.width = "30%";
      }

      inputRef.current.blur();
      const searchText = inputRef.current.value;
      navigate("/search/" + searchText);
      inputRef.current.value = "";
      // setSearchText("");
    },
    [inputRef, navigate, windowWidth]
  );

  return (
    <div>
      <div className="header">
        <div className="navbar">
          <div style={{display: "flex", alignItems: "center"}}>
            {!isSidebarActive ? (
              <IconButton
                onClick={() => {
                  setIsSidebarActive(true);
                  // appRef.current.style.position = "fixed";
                  document.body.style.position = "fixed";
                }}
              >
                <MenuIcon className="menuIcon" />
              </IconButton>
            ) : null}

            <Link
              style={{textDecoration: "none"}}
              to="/"
              className="logo"
              ref={logoRef}
            >
              movie zone
            </Link>
          </div>

          <form
            onSubmit={onSubmit}
            onFocus={() => {
              if (windowWidth < 700) {
                logoRef.current.style.display = "none";
                formRef.current.style.width = "80%";
              }
            }}
            className="searchForm"
            ref={formRef}
          >
            <SearchIcon className="searchForm__icon" />

            <input
              className="searchForm__input"
              type="search"
              ref={inputRef}
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
