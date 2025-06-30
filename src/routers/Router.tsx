import { Route, Routes} from "react-router";
import Dashboard from "../pages/B_body/Dashboard.tsx";
import LayoutWithBar from "../layout/LayoutWithBar.tsx";
import Favorite from "../pages/B_body/Favorite.tsx";
import SeenMovie from "../pages/B_body/SeenMovie.tsx";
import MovieDetails from "../pages/B_body/MovieDetails.tsx";
import PeopleDetails from "../pages/B_body/PeopleDetails.tsx";
import LayoutWithoutBar from "../layout/LayoutWithoutBar.tsx";
import RegisterForm from "../components/auth/RegisterForm.tsx";
import Error from "../pages/B_body/Error.tsx";
import Research from "../pages/B_body/Research.tsx";
import BestMovies from "../pages/B_body/BestMovies.tsx";
import SerieDetails from "../pages/B_body/SerieDetails.tsx";

const Router= () => {
    return (
        <>
                <Routes>
                    <Route path="" element={<LayoutWithBar/>}>
                        <Route index element={<Dashboard/>}/>
                        <Route path="/favorites" element={<Favorite/>}/>
                        <Route path="/watched" element={<SeenMovie/>}/>
                        <Route path="/bestmovies" element={<BestMovies/>}/>
                        <Route path="/movie/:id" element={<MovieDetails/>}/>
                        <Route path="/tv/:id" element={<SerieDetails/>}/>
                        <Route path="/people/:id" element={<PeopleDetails/>}/>
                        <Route path="/register" element={<RegisterForm/>}/>
                        <Route path="/research/:search" element={<Research/>}/>
                    </Route>
                    <Route path="" element={<LayoutWithoutBar/>}>
                        <Route path="/error" element={<Error />}/>
                    </Route>
                </Routes>
        </>
    );
};

export default Router;
