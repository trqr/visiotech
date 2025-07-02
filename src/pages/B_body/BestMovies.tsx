import {useEffect, useState} from "react";
import Pages from "../Pages.tsx";
import {Button, Grid} from "@mui/material";
import MovieItem from "../../components/MovieItem.tsx";
import type {Movie} from "../../@types/movie";
import {apiOptions} from "../../api/api.ts";

const BestMovies = () => {
    const [bestMovies, setBestMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=revenue.desc', apiOptions)
            .then(res => res.json())
            .then(data => setBestMovies(data.results))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <Pages title={"Best Movies"} description={"Best Movies"}>
                <Grid container spacing={4}
                      sx={{
                          justifyContent: "center",
                          alignItems: "stretch",
                          margin: "30px auto"
                      }}>
                    {bestMovies.map(movie =>
                        <Grid size={{xs: 12, md: 4, lg: 3, xl: 2.2}}>
                            <MovieItem key={movie.id} movie={movie}></MovieItem>
                        </Grid>
                    )}
                </Grid>
                <Button variant={"contained"} sx={{display: "block", margin: "20px auto"}}
                        onClick={() => setPage(page + 1)}>Load more</Button>
            </Pages>
        </>
    );
};

export default BestMovies;