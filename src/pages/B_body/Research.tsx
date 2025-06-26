import Pages from "../Pages";
import MovieItem from "../../components/MovieItem.tsx";
import type {Movie} from "../../@types/movie";

type ResearchProps = {
    movies: Movie[];
}

const Research= ({movies}: ResearchProps) => {
    return (
        <Pages title={"Research"} description={"Research"}>
            <h1 style={{textAlign: "center"}}>Coucou, je suis dans le Research</h1>
            {movies.map((movie) => (
                <MovieItem movie={movie}/>
            ))}
        </Pages>
    );
};

export default Research;
