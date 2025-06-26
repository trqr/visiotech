import {useFav} from "../../context/useFav.tsx";
import {Box, Button, Card, CardContent, CardMedia, Container, Grid, IconButton, Typography} from "@mui/material";
import type {Movie} from "../../@types/movie";
import {url} from "../../components/MovieItem.tsx";
import { useSeen } from "../../context/useSeen.tsx";
import {Delete, Visibility, VisibilityOutlined} from "@mui/icons-material";
import Pages from "../Pages.tsx";

const Favorite = () => {
    // @ts-ignore
    const { favoriteFilms, addFavorite, removeFavorite, isFavorite } = useFav();
    // @ts-ignore
    const { seenFilms, addSeen, removeSeen, isSeen } = useSeen();

    return (
        <>
            <Pages title={"Favoris"} description={"Mes favoris"}>
                <h1 style={{textAlign: "center"}}>Mes favoris</h1>
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                    {favoriteFilms.map((movie: Movie) => (
                        <Grid size={{xl: 6, lg: 6, md: 6, xs: 12}}>
                            <Card sx={{display: 'flex'}}>
                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                    <CardContent sx={{flex: '1 0 auto', width: "250px"}}>
                                        <Typography component="div" variant="h5">
                                            {movie.title}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            component="div"
                                            sx={{color: 'text.secondary'}}
                                        >
                                            Mac Miller
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                        <IconButton color={"primary"}
                                                    onClick={() => isSeen(movie) ? removeSeen(movie) : addSeen(movie)}>
                                            {isSeen(movie) ? <Visibility/> : <VisibilityOutlined/>}
                                        </IconButton>
                                        <Button variant={"text"} onClick={() => removeFavorite(movie)}>Remove</Button>
                                    </Box>
                                </Box>
                                <CardMedia
                                    component="img"
                                    sx={{width: 151}}
                                    image={url+movie.poster_path}
                                    alt={movie.title}
                                />
                            </Card>
                        </Grid>
                    ))}
                    </Grid>
                </Container>
            </Pages>
        </>
    );
};

export default Favorite;

