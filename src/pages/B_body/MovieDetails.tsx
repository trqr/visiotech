import { useParams } from "react-router";
import {Box, CircularProgress, Paper, Typography} from "@mui/material";
import {useEffect, useState, useTransition} from "react";
import {url} from "../../components/MovieItem.tsx";
import { movieApi, apiOptions} from "../../api/api.ts";
import MiniPeopleCard from "../../components/movieDetails/miniPeopleCard.tsx";
import VideosCarousel from "../../components/common/VideosCarousel.tsx";



const MovieDetails = () => {
    const {id} = useParams();
    const [movieData, setMovieData] = useState([]);
    const [images, setImages] = useState([]);
    const [credits, setCredits] = useState([]);
    const [videos, setVideos] = useState([]);
    const [isPending, startTransition] = useTransition();


    useEffect(() => {
        startTransition( async () => {
            const movieData = await fetch(`${movieApi}${id}?language=fr-FR`, apiOptions)
                .then(res => res.json())
            const movieImages = await fetch(`${movieApi}${id}/images`, apiOptions)
                .then(res => res.json());
            const movieCredits = await fetch(`${movieApi}${id}/credits?language=fr-FR`, apiOptions)
                .then(res => res.json());
            const movieVideos = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, apiOptions)
                .then(res => res.json());
            startTransition( () => {
                setMovieData(movieData);
                setImages(movieImages.backdrops);
                setCredits(movieCredits.cast);
                setVideos(movieVideos.results);
            })
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
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    {!isPending &&
                        <VideosCarousel videos={videos}></VideosCarousel>
                    }
                    <div className={"grid"} style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gridTemplateRows: "gridAutoRows",
                        gridGap: "10px",
                        margin: "20px",
                        justifyContent: "center",
                        maxHeight: "500px"
                    }}>
                        {images.map((image: any) => (
                            <div>
                                <img style={{width: "300px"}} src={url + image.file_path} alt={movieData.title}></img>
                            </div>
                        ))}
                    </div>
                </Box>
            </Paper>
        </>
    );
};

export default MovieDetails;
