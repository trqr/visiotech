import { Route, Routes} from "react-router";
import Dashboard from "../pages/B_body/Dashboard.tsx";
import LayoutWithBar from "../layout/LayoutWithBar.tsx";
import Favorite from "../pages/B_body/Favorite.tsx";
import SeenMovie from "../pages/B_body/SeenMovie.tsx";
import MovieDetails from "../pages/B_body/MovieDetails.tsx";
import PeopleDetails from "../pages/B_body/PeopleDetails.tsx";

const Router= () => {
    return (
        <>
                <Routes>
                    <Route path="" element={<LayoutWithBar/>}>
                        <Route index element={<Dashboard/>}/>
                        <Route path="/favorites" element={<Favorite/>}/>
                        <Route path="/watched" element={<SeenMovie/>}/>
                        <Route path="/movie/:id" element={<MovieDetails/>}/>
                        <Route path="/people/:id" element={<PeopleDetails/>}/>
                        </Route>
                </Routes>
        </>
    );
};

export default Router;
