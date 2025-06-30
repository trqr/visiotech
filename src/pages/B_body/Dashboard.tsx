import {Box, Button, Chip, CircularProgress, Grid} from "@mui/material";
import MovieItem from "../../components/MovieItem.tsx";
import Pages from "../Pages.tsx";
import {useEffect, useState, useTransition} from "react";
import type {Movie} from "../../@types/movie";
import { movieApi, options} from "../../api/api.ts";
import PeopleItem from "../../components/PeopleItem.tsx";
import type {People} from "../../@types/people";
import Carousel from "../../components/common/Carousel.tsx";
import movieGenres from "../../dataFake/movie_genres.json";

const Dashboard= () => {
    const [movies, setMovies] = useState<Movie[]>();
    const [series, setSeries ] = useState<Movie[]>();
    const [actors, setActors] = useState<People[]>();
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>();
    const [upcomingSeries, setUpcomingSeries] = useState<Movie[]>();
    const [page, setPage] = useState(1);
    const [selectedType, setSelectedType] = useState<string>("movie");
    const [ selectedGenreId, setSelectedGenreId] = useState<number>();
    const [isPending, startTransition] = useTransition();


    useEffect(() => {
        startTransition( async () => {
            const movies = await fetch(`${movieApi}/now_playing?language=fr-FR&page=${page}`, options)
                .then(res => res.json())
            const series = await fetch(`https://api.themoviedb.org/3/tv/airing_today?language=fr-FR&page=${page}`, options)
                .then(res => res.json())
            const actors = await fetch(`https://api.themoviedb.org/3/person/popular?language=fr-FR&page=${page}`, options)
                .then(res => res.json())
                startTransition(() => {
                    setMovies(movies.results);
                    setSeries(series.results);
                    setActors(actors.results);
                })
            }
        )
    }, [page])

    useEffect(() => {
        startTransition( async () => {
                const upcomingMovies = await fetch("https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1", options)
                    .then(res => res.json())
                const upcomingSeries = await fetch("https://api.themoviedb.org/3/tv/top_rated?language=fr-FR&page=1", options)
                    .then(res => res.json())
            startTransition(() => {
                setUpcomingSeries(upcomingSeries.results);
                setUpcomingMovies(upcomingMovies.results);
            })
        })
    }, [selectedType]);

    useEffect(() => {
        if (selectedGenreId){
        startTransition( async () => {
            const filteredMovies = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=${selectedGenreId}`, options)
                .then(res => res.json())
            startTransition(() => {
                setMovies(filteredMovies.results);
            })
        })
        }
    }, [selectedGenreId]);


    return (
        <>
            <Pages title={"Dashboard"} description={"Dashboard"}>
                <Box sx={{display: "flex", justifyContent: "center", margin: "20px 0"}}>
                    <Button sx={{ margin: "0 5px"}} variant={selectedType === "movie" ? "contained" : "outlined"} onClick={() => setSelectedType("movie")}>Films</Button>
                    <Button sx={{margin: "0 5px"}} variant={ selectedType === "tv" ? "contained" : "outlined"} onClick={() => setSelectedType("tv")}>Series</Button>
                    <Button sx={{margin: "0 5px"}} variant={selectedType === "person" ? "contained" : "outlined"} onClick={() => setSelectedType("person")}>Actors</Button>
                </Box>
                {!isPending && selectedType !== "person" && upcomingMovies && (
                <Carousel type={selectedType} movies={selectedType === "movie" ? upcomingMovies : upcomingSeries!}></Carousel>
                )}
                <Box sx={{display: "flex", width: "80%", margin: "30px auto", justifyContent: "space-evenly"}}>
                {movieGenres.genres.map(genre => (
                    <Chip key={genre.id} variant={"outlined"} color={"primary"} size={"small"} label={genre.name} onClick={() => setSelectedGenreId(genre.id)}></Chip>
                ))}
                </Box>
                <Grid container spacing={4}
                      sx={{
                          justifyContent: "center",
                          alignItems: "stretch",
                          margin: "30px auto"
                      }}>
                    {!isPending && selectedType === "movie" &&
                        <>
                            {movies && movies.map(movie =>
                                <Grid key={movie.id} size={{xs: 12, md: 4, lg: 3, xl: 2.2}}>
                                    <MovieItem  movie={movie}></MovieItem>
                                </Grid>
                            )}
                        </>}
                    {!isPending && selectedType === "tv" &&
                        <>
                            {series && series.map(serie =>
                                <Grid key={serie.id} size={{xs: 12, md: 4, lg: 3, xl: 2.2}}>
                                    <MovieItem  movie={serie}></MovieItem>
                                </Grid>
                            )}
                        </>}
                    {!isPending && selectedType === "person" &&
                        <>
                            {actors && actors.map(actor =>
                                <Grid key={actor.id} size={{xs: 12, md: 4, lg: 3, xl: 2.2}}>
                                    <PeopleItem  people={actor}></PeopleItem>
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
