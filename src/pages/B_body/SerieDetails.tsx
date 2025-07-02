import {useParams} from "react-router";
import {Box, Paper, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {url} from "../../components/MovieItem.tsx";
import { apiOptions, serieApi} from "../../api/api.ts";
import MiniPeopleCard from "../../components/movieDetails/miniPeopleCard.tsx";


const SerieDetails = () => {
    const {id} = useParams();
    const [movieData, setMovieData] = useState([]);
    const [images, setImages] = useState([]);
    const [credits, setCredits] = useState([]);

    useEffect(() => {
        fetch(`${serieApi}${id}?language=fr-FR`, apiOptions)
            .then(res => res.json())
            .then(data => setMovieData(data))
            .catch(err => console.error(err));

        fetch(`${serieApi}${id}/images`, apiOptions)
            .then(res => res.json())
            .then(data => {
                setImages(data.backdrops);
                console.log(data);
            })
            .catch(err => console.error(err));

        fetch(`${serieApi}${id}/credits?language=fr-FR`, apiOptions)
            .then(res => res.json())
            .then(res => setCredits(res.cast))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <Paper sx={{width: "90%", margin: "40px auto", display: "flex"}} elevation={3}>
                <Box sx={{width: "40%", margin: "20px 20px"}}>
                    <img style={{width: "100%"}} src={url + movieData.poster_path} alt={movieData.title}/>
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
            </Paper>
        </>
    );
};

export default SerieDetails;
