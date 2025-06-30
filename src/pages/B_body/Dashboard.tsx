import {Box, Button, CircularProgress, Grid} from "@mui/material";
import MovieItem from "../../components/MovieItem.tsx";
import Pages from "../Pages.tsx";
import {useEffect, useRef, useState, useTransition} from "react";
import type {Movie} from "../../@types/movie";
import { movieApi, options} from "../../api/api.ts";
import PeopleItem from "../../components/PeopleItem.tsx";
import type {People} from "../../@types/people";

const Dashboard= () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [series, setSeries ] = useState<Movie[]>([]);
    const [actors, setActors] = useState<People[]>([]);
    const [page, setPage] = useState(1);
    const [movieOrTVShow, setMovieOrTVShow] = useState<string>("movies");
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition( () => {
            fetch(`${movieApi}/now_playing?language=fr-FR&page=${page}`, options)
                .then(res => res.json())
                .then(data => setMovies(prevMovies => [...prevMovies, ...data.results]))
                .catch(err => console.error(err));

            fetch(`https://api.themoviedb.org/3/tv/airing_today?language=fr-FR&page=${page}`, options)
                .then(res => res.json())
                .then(data => setSeries(prevSeries => [...prevSeries, ...data.results]))
                .catch(err => console.error(err));

            fetch(`https://api.themoviedb.org/3/person/popular?language=fr-FR&page=${page}`, options)
                .then(res => res.json())
                .then(data => setActors(prevActors => [...prevActors, ...data.results]))
                .catch(err => console.error(err));
        });
    }, [page])

    return (
        <>
            <Pages title={"Dashboard"} description={"Dashboard"}>
                <Box sx={{display: "flex", justifyContent: "center", margin: "20px 0"}}>
                    <Button sx={{ margin: "0 5px"}} variant={movieOrTVShow === "movies" ? "contained" : "outlined"} onClick={() => setMovieOrTVShow("movies")}>Films</Button>
                    <Button sx={{margin: "0 5px"}} variant={ movieOrTVShow === "series" ? "contained" : "outlined"} onClick={() => setMovieOrTVShow("series")}>Series</Button>
                    <Button sx={{margin: "0 5px"}} variant={movieOrTVShow === "actors" ? "contained" : "outlined"} onClick={() => setMovieOrTVShow("actors")}>Actors</Button>
                </Box>

                <Grid container spacing={4}
                      sx={{
                          justifyContent: "center",
                          alignItems: "stretch",
                          margin: "30px auto"
                      }}>
                    {movieOrTVShow === "movies" &&
                        <>
                            {movies.map(movie =>
                                <Grid size={{xs: 12, md: 4, lg: 3, xl: 2.2}}>
                                    <MovieItem key={movie.id} movie={movie}></MovieItem>
                                </Grid>
                            )}
                        </>}
                    {movieOrTVShow === "series" &&
                        <>
                            {series.map(serie =>
                                <Grid size={{xs: 12, md: 4, lg: 3, xl: 2.2}}>
                                    <MovieItem key={serie.id} movie={serie}></MovieItem>
                                </Grid>
                            )}
                        </>}
                    {movieOrTVShow === "actors" &&
                        <>
                            {actors.map(actor =>
                                <Grid size={{xs: 12, md: 4, lg: 3, xl: 2.2}}>
                                    <PeopleItem key={actor.id} people={actor}></PeopleItem>
                                </Grid>
                            )}
                        </>}
                </Grid>
                {isPending && (
                    <Box sx={{display: 'flex', justifyContent: "center"}}>
                        <CircularProgress/>
                    </Box>
                    )}
                <Button variant={"contained"} sx={{display:"block", margin: "20px auto"}} onClick={() => setPage(page + 1)}>Load more</Button>
            </Pages>
        </>
    );
};

export default Dashboard;
