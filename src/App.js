import {useState} from "react";
import {
  Header,
  Home,
  Footer,
  MovieDetail,
  Search,
  Discover,
  Explore,
  ScrollToTop,
  NotFound,
  Sidebar,
} from "./components";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

function App() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  return (
    <Router>
      <ScrollToTop />

      <div className="App">
        <Header
          isSidebarActive={isSidebarActive}
          setIsSidebarActive={setIsSidebarActive}
        />
        <Sidebar
          style={{display: "none"}}
          isSidebarActive={isSidebarActive}
          setIsSidebarActive={setIsSidebarActive}
        />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:mediaType/:mediaId" element={<MovieDetail />} />
            <Route path="/discover/:mediaType" element={<Discover />} />
            <Route path="/explore/:mediaType" element={<Explore />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
