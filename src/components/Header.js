import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import "./Header.css";
import {useNavigate} from "react-router-dom";
import {IconButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({isSidebarActive, setIsSidebarActive}) => {
  const [searchText, setSearchText] = useState("");
  const [variant, setVariant] = useState("temporary");
  const logoRef = useRef(null);
  const formRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const width = window.innerWidth;

  useEffect(() => {
    if (width > 700) {
      setVariant("permanent");
    } else {
      setVariant("temporary");
    }
  }, [width]);

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
                  document.body.style.position = 'fixed';
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
            onSubmit={(e) => {
              e.preventDefault();
              if (variant === "temporary") {
                logoRef.current.style.display = "block";
                formRef.current.style.width = "30%";
              }

              inputRef.current.blur();

              navigate("/search/" + searchText);
              setSearchText("");
            }}
            onFocus={() => {
              if (variant === "temporary") {
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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              ref={inputRef}
            ></input>
          </form>
        </div>
       
      </div>
    </div>
  );
};

export default Header;
