import { useParams } from "react-router";
import {Box, CircularProgress, Paper, Typography} from "@mui/material";
import {useEffect, useState, useTransition} from "react";
import {url} from "../../components/MovieItem.tsx";
import {fetching, movieApi, apiOptions} from "../../api/api.ts";
import MiniPeopleCard from "../../components/movieDetails/miniPeopleCard.tsx";



const MovieDetails = () => {
    const {id} = useParams();
    const [movieData, setMovieData] = useState([]);
    const [images, setImages] = useState([]);
    const [credits, setCredits] = useState([]);
    const [isPending, startTransition] = useTransition();


    useEffect(() => {
        startTransition( () => {
            fetch(`${movieApi}${id}?language=fr-FR`, apiOptions)
                .then(res => res.json())
                .then(data => setMovieData(data))
                .catch(err => console.error(err));
            fetch(`${movieApi}${id}/images`, apiOptions)
                .then(res => res.json())
                .then(data => {
                    setImages(data.backdrops);
                })
                .catch(err => console.error(err));
            fetch(`${movieApi}${id}/credits?language=fr-FR`, apiOptions)
                .then(res => res.json())
                .then(res => setCredits(res.cast))
                .catch(err => console.error(err));
        })
    }, []);

    return (
        <>
            <Paper sx={{width: "90%", margin: "40px auto", display: "flex"}} elevation={3}>
                {isPending && (
                    <Box sx={{display: 'flex', justifyContent: "center"}}>
                        <CircularProgress/>
                    </Box>
                )}
                <Box sx={{width: "40%", margin: "20px 20px"}}>
                <img style={{width:"100%"}} src={url+movieData.poster_path} alt={movieData.title}/>
                    <h1>{movieData.title}</h1>
                    <Typography variant={"body2"}>Synopsis : {movieData.overview}</Typography>
                    <h2>Status: {movieData.status}</h2>
                    <h2>Budget: {movieData.budget}</h2>
                    <h2>Revenue: {movieData.revenue}</h2>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gridGap: "10px",
                        margin: "20px"
                    }}>
                        {credits.map((credit: any) => (
                            <MiniPeopleCard
                                key={credit.id}
                                actor={credit}>

                            </MiniPeopleCard>
                        ))}
                    </Box>
                </Box>
                <div className={"grid"} style={{display:"grid", gridTemplateColumns: "repeat(3, 1fr)",
                    gridTemplateRows: "gridAutoRows", gridGap: "10px", margin: "20px", justifyContent: "center", maxHeight: "500px"}}>
                    {images.map((image: any) => (
                        <div>
                            <img style={{width: "300px"}} src={url + image.file_path} alt={movieData.title}></img>
                        </div>
                    ))}
                </div>
            </Paper>
        </>
    );
};

export default MovieDetails;
