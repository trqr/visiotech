import {Box, Button, Chip, Grid, IconButton, useTheme} from "@mui/material";
import MovieItem from "../../components/MovieItem.tsx";
import Pages from "../Pages.tsx";
import {useEffect, useRef, useState, useTransition} from "react";
import type {Movie} from "../../@types/movie";
import { movieApi, apiOptions} from "../../api/api.ts";
import PeopleItem from "../../components/PeopleItem.tsx";
import type {People} from "../../@types/people";
import Carousel from "../../components/common/Carousel.tsx";
import movieGenres from "../../dataFake/movie_genres.json";
import tvGenres from "../../dataFake/tv_genres.json";
import { Clear } from "@mui/icons-material";
import CarouselSkeleton from "../../components/common/Skeletons/CarouselSkeleton.tsx";
import DashboardGridSkeleton from "../../components/common/Skeletons/DashboardGridSkeleton.tsx";
import {useAuth} from "../../context/useAuth.tsx";
import {useFav} from "../../context/useFav.tsx";
import { useSeen } from "../../context/useSeen.tsx";

const Dashboard= () => {
    const theme = useTheme();
    const gridRef = useRef<HTMLDivElement>(null)
    const [movies, setMovies] = useState<Movie[]>();
    const [noFilterMovies, setNoFilterMovies] = useState<Movie[]>();
    const [series, setSeries ] = useState<Movie[]>();
    const [noFilterSeries, setNoFilterSeries] = useState<Movie[]>();
    const [actors, setActors] = useState<People[]>();
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>();
    const [upcomingSeries, setUpcomingSeries] = useState<Movie[]>();
    const [page, setPage] = useState(1);
    const [selectedType, setSelectedType] = useState<string>("movie");
    const [ selectedGenreId, setSelectedGenreId] = useState<number>();
    const [isPending, startTransition] = useTransition();
    const {isLogged, user} = useAuth();
    // @ts-expect-error okk
    const {getFavorites} = useFav();
    // @ts-expect-error okk
    const {getSeen} = useSeen();


    useEffect(() => {
        if (isLogged){
            getFavorites(user);
            getSeen(user)
        }

        startTransition( async () => {
            const movies = await fetch(`${movieApi}/now_playing?language=fr-FR&page=${page}`, apiOptions)
                .then(res => res.json())
            const series = await fetch(`https://api.themoviedb.org/3/tv/airing_today?language=fr-FR&page=${page}`, apiOptions)
                .then(res => res.json())
            const actors = await fetch(`https://api.themoviedb.org/3/person/popular?language=fr-FR&page=${page}`, apiOptions)
                .then(res => res.json())
            startTransition(()  => {
                    setNoFilterMovies(movies.results)
                    setNoFilterSeries(series.results)
                    setMovies(movies.results);
                    setSeries(series.results);
                    setActors(actors.results);
                })
            }
        )
    }, [page, isLogged])

    useEffect(() => {
        startTransition( async () => {
                const upcomingMovies = await fetch("https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=1", apiOptions)
                    .then(res => res.json())
                const upcomingSeries = await fetch("https://api.themoviedb.org/3/tv/top_rated?language=fr-FR&page=1", apiOptions)
                    .then(res => res.json())
            startTransition(() => {
                setUpcomingSeries(upcomingSeries.results);
                setUpcomingMovies(upcomingMovies.results);
            })
        })
    }, [selectedType]);

    useEffect(() => {
        if (selectedGenreId) {

            if (selectedType === "movie"){
                fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=${selectedGenreId}`, apiOptions)
                    .then(res => res.json())
                    .then(data => setMovies(data.results))
            }
            if (selectedType === "tv") {
                fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=${selectedGenreId}`, apiOptions)
                    .then(res => res.json())
                    .then(data => setSeries(data.results))
            }
        }

    }, [selectedGenreId]);


    return (
        <>
            <Pages title={"Dashboard"} description={"Dashboard"}>
                <Box sx={{display: "flex", justifyContent: "center", margin: "20px 0", maxWidth: "max-content",
                    justifySelf: "center",
                    borderBottomRightRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    padding: "5px",
                    backgroundColor: `${theme.palette.background.default}`,
                }}>
                    <Button sx={{ margin: "0 5px"}} variant={selectedType === "movie" ? "contained" : "outlined"} onClick={() => setSelectedType("movie")}>Films</Button>
                    <Button sx={{margin: "0 5px"}} variant={ selectedType === "tv" ? "contained" : "outlined"} onClick={() => setSelectedType("tv")}>Series</Button>
                    <Button sx={{margin: "0 5px"}} variant={selectedType === "person" ? "contained" : "outlined"} onClick={() => setSelectedType("person")}>Actors</Button>
                </Box>
                {!isPending && selectedType !== "person" && upcomingMovies && (
                <Carousel type={selectedType} movies={selectedType === "movie" ? upcomingMovies : upcomingSeries!}></Carousel>
                )}
                {isPending &&  (
                    <CarouselSkeleton gap={"5px"} width={"100%"}></CarouselSkeleton>
                )}
                <Box sx={{display: "flex", width: "80%", margin: "30px auto", justifyContent: "space-evenly", alignItems: "center",
                    position: "sticky", href:"#grid", top: "0px", zIndex: "30", borderRadius: "10px", padding: "0 5px", backgroundColor: `${theme.palette.background.default}`}}>
                    {selectedType !== "person" &&
                        <>
                            {(selectedType === "movie" ? movieGenres : tvGenres).genres.map(genre => (
                            <Chip
                                key={genre.id}
                                sx={{borderRadius:"10px", backgroundColor: selectedGenreId === genre.id ? `${theme.palette.primary.main}` : `${theme.palette.background.default}`}}
                                variant={selectedGenreId === genre.id ? "filled" : "outlined"}
                                color={selectedGenreId === genre.id ? "primary" : "default"}
                                size={"medium"}
                                label={genre.name}
                                onClick={() => {
                                    setSelectedGenreId(genre.id);
                                    gridRef.current?.scrollIntoView({behavior: "smooth"})
                                }}></Chip>
                            ))}
                            <IconButton onClick={() => {setSelectedGenreId(0);setMovies(noFilterMovies);setSeries(noFilterSeries) }}>
                                <Clear></Clear>
                            </IconButton>
                        </>
                    }
                </Box>
                {isPending &&
                    <DashboardGridSkeleton></DashboardGridSkeleton>
                }
                <Grid id={"grid"} ref={gridRef} container spacing={4}
                      sx={{
                          justifyContent: "center",
                          alignItems: "stretch",
                          margin: "30px auto"
                      }}>
                    {!isPending && selectedType === "movie" &&
                        <>
                            {movies && movies.map(movie =>
                                <Grid key={movie.id} size={{xs: 12, md: 4, lg: 3, xl: 2.2}}>
                                    <MovieItem  movie={movie} selectedType={selectedType}></MovieItem>
                                </Grid>
                            )}
                        </>}
                    {!isPending && selectedType === "tv" &&
                        <>
                            {series && series.map(serie =>
                                <Grid key={serie.id} size={{xs: 12, md: 4, lg: 3, xl: 2.2}}>
                                    <MovieItem  movie={serie} selectedType={selectedType}></MovieItem>
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
                <Button variant={"contained"} sx={{display:"block", margin: "20px auto"}} onClick={() => setPage(page + 1)}>Load more</Button>
            </Pages>
        </>
    );
};

export default Dashboard;
