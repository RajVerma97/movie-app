import {lazy, Suspense} from "react";
// import MovieListing from "../components/MovieListing";
import {useLocation, useParams} from "react-router-dom";
// import BackArrow from "../components/BackArrow";
const BackArrow = lazy(() => import("../components/BackArrow"));
const MovieListing = lazy(() => import("../components/MovieListing"));

const Discover = () => {
  const {state} = useLocation();
  const {mediaType} = useParams();

  return (
    <div>
      <Suspense>
        <BackArrow />
      </Suspense>
      <Suspense>
        <MovieListing data={state} mediaType={mediaType} isSimplified={false} />
      </Suspense>
    </div>
  );
};

export default Discover;
