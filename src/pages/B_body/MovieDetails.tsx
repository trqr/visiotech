import { useParams } from "react-router";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Paper,
    Rating,
    Skeleton,
    Typography
} from "@mui/material";
import {useEffect, useState, useTransition} from "react";
import {url} from "../../components/MovieItem.tsx";
import { movieApi, apiOptions} from "../../api/api.ts";
import MiniPeopleCard from "../../components/movieDetails/miniPeopleCard.tsx";
import VideosCarousel from "../../components/common/VideosCarousel.tsx";
import CarouselSkeleton from "../../components/common/Skeletons/CarouselSkeleton.tsx";
import type {MovieDetails} from "../../@types/MovieDetails.ts";
import {emptyMovieDetails} from "../../@nullData/emptyMovieDetails.ts";
import type {MovieCredit} from "../../@types/MovieCredit.ts";
import "./MovieDetails.css"
import {numberFormat} from "../../Utils/format.ts";
import Pages from "../Pages.tsx";



const MovieDetails = () => {
    const {id} = useParams();
    const [movieData, setMovieData] = useState<MovieDetails>(emptyMovieDetails);
    const [images, setImages] = useState([]);
    const [credits, setCredits] = useState<MovieCredit[]>([]);
    const [videos, setVideos] = useState([]);
    const [providers, setProviders] = useState([]);
    const [reviews, setReviews] = useState([]);
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
            const movieProviders = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, apiOptions)
                .then(res => res.json());
            const movieReviews = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`, apiOptions)
                .then(res => res.json());
            startTransition( () => {
                setMovieData(movieData);
                setImages(movieImages.backdrops);
                setCredits(movieCredits.cast);
                setVideos(movieVideos.results.filter(video => video.type === "Trailer" || video.type === "Behind the Scenes").sort((a, b) => {
                    if (a.type === b.type) return 0;
                    return a.type === "Trailer" ? -1 : 1;
                }));
                setProviders(movieProviders?.results?.FR?.flatrate || []);
                setReviews(movieReviews.results);
            })
        })
    }, [id]);

    return (
        <>
            <Pages title={movieData.title || movieData.name} description={movieData.title}>
            <Paper sx={{width: "90%", margin: "40px auto", display: "flex", justifyContent: "flex-start", alignContent: "flex-start"}} elevation={3}>
                <Box sx={{width: "40%", margin: "20px 20px", position: "relative", justifyContent:"flex-start"}}>
                    {isPending
                        ? <Skeleton variant={"rectangular"} width={"100%"} height={"1200px"} sx={{alignSelf: "flex-start"}}></Skeleton>
                        : <img style={{width: "100%"}} src={url + movieData.poster_path} alt={movieData.title}/>
                    }
                    <Typography variant={"h3"} sx={{margin: "10px 0"}}>{isPending ? <Skeleton/> : `${movieData.title}`}</Typography>
                    <Typography variant={"body2"} sx={{textAlign: "justify"}}>
                        {isPending
                            ? <><Skeleton/><Skeleton/><Skeleton/><Skeleton/><Skeleton/><Skeleton width={"70%"}/></>
                            : `Synopsis : ${movieData.overview}`}
                    </Typography>
                    <Box sx={{display: "flex", justifyContent: "space-between", margin: "20px 20px", alignItems:"center"}}>
                        <Box>
                            <Typography variant={"h5"} sx={{margin: "5px 0"}}>{isPending ? <Skeleton/> : `Status: ${movieData.status}`}</Typography>
                            <Typography variant={"h5"} sx={{margin: "5px 0"}}>{isPending ? <Skeleton/> : `Budget: ${numberFormat(movieData.budget)} $`}</Typography>
                            <Typography variant={"h5"} sx={{margin: "5px 0"}}>{isPending ? <Skeleton/> : `Revenus: ${numberFormat(movieData.revenue)} $`}</Typography>
                        </Box>
                        <Box sx={{display: "flex", width: "50%", justifyContent: "space-around", alignItems: "center", alignContent: "center", flexWrap: "wrap"}}>
                            {movieData.production_companies && movieData.production_companies.map((production) => (
                                <Box key={production.id} style={{display:"flex", maxWidth: "120px", justifyContent:"center", maxHeight: "90px", margin: "5px"}}>
                                    <img style={{ objectFit:"contain"}} src={url+production.logo_path} alt={production.name}></img>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap", margin: "10px"}}>
                        {providers.map((provider, index) => (
                            <Box key={index} sx={{display:"flex",flexDirection: "column", alignItems:"center", justifyContent:"center", margin: "10px"}}>
                                <img style={{width: "50px"}} src={url+provider.logo_path}/>
                            </Box>
                        ))}
                    </Box>
                    <Box
                        className={"scrollable-grid"}
                        sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "10px",
                        margin: "20px",
                            overflowY: "auto",
                            maxHeight: "726px",

                    }}>
                        {credits.map((credit: MovieCredit) => (
                            <MiniPeopleCard
                                key={credit.id}
                                actor={credit}>
                            </MiniPeopleCard>
                        ))}
                    </Box>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    {isPending
                        ? <CarouselSkeleton gap={"40px"} width={"950px"}></CarouselSkeleton>
                        : <VideosCarousel videos={videos}></VideosCarousel>
                    }
                    <div className={"grid scrollable-grid"} style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gridTemplateRows: "gridAutoRows",
                        gap: "10px",
                        margin: "20px",
                        justifyContent: "center",
                        maxHeight: "600px",
                        overflowY: "auto"
                    }}>
                        {isPending ?
                            Array.from({length: 21}).map((_, i) => (
                                <div>
                                    <Skeleton key={i} variant={"rectangular"} width={300} height={168.75}/>
                                </div>
                            ))
                            :
                            images.map((image: any) => (
                                <div>
                                    <img style={{width: "300px"}} src={url + image.file_path}
                                         alt={movieData.title}></img>
                                </div>
                            ))
                        }
                    </div>
                    <Box className={"scrollable-grid"}
                         sx={{
                             display: "grid",
                             gridTemplateColumns: "repeat(3, 1fr)",
                             gridTemplateRows: "gridAutoRows",
                             gap: "10px",
                             margin: "20px"
                         }}>
                        {reviews.slice(0, 9).map((review: any) => (
                            <Card sx={{maxWidth: 310}}>
                                <CardHeader
                                    avatar={
                                        <Avatar src={url+review.author_details.avatar_path}>
                                        </Avatar>
                                    }
                                    title={review.author_details.username}
                                    subheader="September 14, 2016"
                                />
                                <CardContent>
                                    <Rating name="half-rating-read" defaultValue={review.author_details.rating/2} precision={0.5} readOnly/>
                                    <Typography variant="body2" sx={{color: 'text.secondary',
                                        display: "-webkit-box",
                                        WebkitLineClamp: 8,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden"}}>
                                        {review.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            </Paper>
            </Pages>
        </>
    );
};

export default MovieDetails;
