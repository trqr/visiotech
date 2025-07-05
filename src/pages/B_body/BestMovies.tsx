import {useEffect, useState, useTransition} from "react";
import Pages from "../Pages.tsx";
import {Box, Button, Grid} from "@mui/material";
import MovieItem from "../../components/MovieItem.tsx";
import type {Movie} from "../../@types/movie";
import {apiOptions} from "../../api/api.ts";
import DashboardGridSkeleton from "../../components/common/Skeletons/DashboardGridSkeleton.tsx";

const BestMovies = () => {
    const [bestMovies, setBestMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition( async () => {
            const bestMovies = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=revenue.desc', apiOptions)
                .then(res => res.json())
            startTransition( () => {
                setBestMovies(bestMovies.results);
            })
        })

    }, []);

    return (
        <>
            <Pages title={"Best Movies"} description={"Best Movies"}>
                {isPending ?
                    <>
                        <Box sx={{margin: "30px"}}></Box>
                        <DashboardGridSkeleton></DashboardGridSkeleton>
                    </>
                :
                    <Grid container spacing={4}
                          sx={{
                              justifyContent: "center",
                              alignItems: "stretch",
                              margin: "30px auto"
                          }}>
                        {bestMovies.map(movie =>
                            <Grid size={{xs: 12, md: 4, lg: 3, xl: 2.2}}>
                                <MovieItem key={movie.id} movie={movie} selectedType={"movies"}></MovieItem>
                            </Grid>
                        )}
                    </Grid>
                }
                <Button variant={"contained"} sx={{display: "block", margin: "20px auto"}}
                        onClick={() => setPage(page + 1)}>Load more</Button>
            </Pages>
        </>
    );
};

export default BestMovies;