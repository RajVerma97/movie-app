import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./Header.css";
import {useNavigate} from "react-router-dom";
import {
  Drawer,
  IconButton,
  Button,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {, CloseIcon, HomeIcon, ContentPaste} from "@mui/icons-material";
// import CloseIcon from "@mui/icons-material/Close";
// import ContentPaste from "@mui/icons-material/ContentPaste";
// import HomeIcon from "@mui/icons-material/Home";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [variant, setVariant] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const width = window.innerWidth;

  useEffect(() => {
    // console.log(width);
    if (width > 768) {
      setVariant("permanent");
    } else {
      setVariant("temporary");
    }
  }, [width]);

  return (
    <div>
      <div className="header">
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon />
        </IconButton>
        <Link style={{textDecoration: "none"}} to="/" className="logo">
          {variant}
        </Link>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // go to /search
            navigate("/search/" + searchText);
          }}
        >
          <input
            className="searchInput"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
      </div>
      <Drawer
        anchor={"left"}
        open={open}
        variant={variant}
        style={{padding: "2em !important"}}
        // onClose={toggleDrawer(anchor, false)}
      >
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>

        <MenuList>
          <MenuItem onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>home</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => navigate("/explore/movie/popular")}>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>trending</ListItemText>
          </MenuItem>

          <MenuItem onClick={() => navigate("/explore/movie/popular")}>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>upcoming</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => navigate("/explore/tv/popular")}>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>trending</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => navigate("/explore/tv/popular")}>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>popular</ListItemText>
          </MenuItem>
        </MenuList>
      </Drawer>
    </div>
  );
};

export default Header;
