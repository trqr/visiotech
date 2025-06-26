import {Button, Grid} from "@mui/material";
import MovieItem from "../../components/MovieItem.tsx";
import Pages from "../Pages.tsx";
import {useEffect, useState} from "react";
import type {Movie} from "../../@types/movie";
import { movieApi, options} from "../../api/api.ts";

const Dashboard= () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {

        fetch(`${movieApi}/now_playing?language=en-US&page=${page}`, options)
            .then(res => res.json())
            .then(data => setMovies(prevMovies => [...prevMovies, ...data.results]))
            .catch(err => console.error(err));
    }, [page])

    return (
        <>
            <Pages title={"Dashboard"} description={"Dashboard"}>
                <Grid container spacing={4}
                      sx={{
                          justifyContent: "center",
                          alignItems: "stretch",
                          margin: "30px auto"
                      }}>
                    {movies.map(movie =>
                        <Grid size={{xs: 12, md: 4, lg: 3, xl: 2.2}}>
                            <MovieItem key={movie.id} movie={movie}></MovieItem>
                        </Grid>
                    )}
                </Grid>
                <Button variant={"contained"} sx={{display:"block", margin: "20px auto"}} onClick={() => setPage(page + 1)}>Load more</Button>
            </Pages>
        </>
    );
};

export default Dashboard;
