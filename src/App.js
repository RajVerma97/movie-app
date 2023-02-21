import logo from "./logo.svg";
import "./App.css";
import {
  Header,
  Home,
  Footer,
  MovieDetail,
  Search,
  Discover,
  Explore,
  ScrollToTop,
} from "./components";

import {BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import MovieListing from "./components/MovieListing";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:mediaType/:mediaId" element={<MovieDetail />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/explore/:mediaType/:category" element={<Explore/>} />

            <Route path="/search/:query" element={<Search />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
