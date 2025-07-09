import Pages from "../Pages";
import MovieItem from "../../components/MovieItem.tsx";
import type {Movie} from "../../@types/movie";
import {useParams} from "react-router";
import {useEffect, useState, useTransition} from "react";
import {apiOptions} from "../../api/api.ts";
import {Box, Button, CircularProgress, Grid} from "@mui/material";
import MiniPeopleCard from "../../components/movieDetails/miniPeopleCard.tsx";

const Research= () => {
    const {search} = useParams();
    const [researchedMovies , setResearchedMovies] = useState<Movie[]>([]);
    const [reseachedActors , setResearchedActors] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [MovieOrPerson, setMovieOrPerson] = useState<string>("movie");
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition( () => {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=fr-FR&page=${page}`, apiOptions)
                .then(res => res.json())
                .then(data => setResearchedMovies(data.results))
                .catch(err => console.error(err));

            fetch(`https://api.themoviedb.org/3/search/person?query=${search}&include_adult=false&language=fr-FR&page=${page}`, apiOptions)
                .then(res => res.json())
                .then(data => setResearchedActors(data.results))
                .catch(err => console.error(err));
        });

    }, [page, search]);



    return (
        <Pages title={"Research"} description={"Research"}>
            <Box sx={{display: "flex", justifyContent: "center", margin: "20px 0"}}>
                <Button variant={"outlined"} onClick={() => setMovieOrPerson("movie")}>Films</Button>
                <Button variant={"outlined"} onClick={() => setMovieOrPerson("person")}>Acteurs</Button>
            </Box>
            <Grid container spacing={3} sx={{justifyContent:"center"}}>
            {MovieOrPerson === "movie" &&
            <>
                {researchedMovies.map((movie) => (
                    <Grid size={{xs: 12, md: 4, lg: 3, xl: 2.2}}>
                        <MovieItem movie={movie}/>
                    </Grid>
                ))}
            </>
            }
            {MovieOrPerson === "person" &&
            <>
                {reseachedActors.map(person =>
                    <Grid size={{xs: 12, md: 4, lg: 3, xl: 2}}>
                        <MiniPeopleCard actor={person}></MiniPeopleCard>
                    </Grid>
                )}
            </>
            }
            </Grid>
            {isPending && (
                <Box sx={{display: 'flex', justifyContent: "center"}}>
                    <CircularProgress/>
                </Box>
            )}
            <Button variant={"contained"} onClick={() => setPage(page + 1)}>Load more</Button>
        </Pages>
    );
};

export default Research;
