import {useState, lazy, Suspense} from "react";
import {Header, Footer, ScrollToTop, Sidebar} from "./components";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const MediaDetail = lazy(() => import("./pages/MediaDetail"));
const Explore = lazy(() => import("./pages/Explore"));
const Discover = lazy(() => import("./pages/Discover"));
const Search = lazy(() => import("./pages/Search"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
        <div className="container" style={{display: "grid"}}>
          <Suspense>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:mediaType/:mediaId" element={<MediaDetail />} />
              <Route path="/discover/:mediaType" element={<Discover />} />
              <Route path="/explore/:mediaType" element={<Explore />} />
              <Route path="/search/:query" element={<Search />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
