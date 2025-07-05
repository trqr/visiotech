import {
    EmojiEvents,
    EmojiEventsOutlined,
    Favorite,
    FavoriteBorder,
    Visibility,
    VisibilityOutlined
} from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Rating,
    Typography,
    useTheme
} from "@mui/material";
import type { Movie } from "../@types/movie";
import { useFav } from "../context/useFav";
import {useSeen} from "../context/useSeen.tsx";
import {useNavigate} from "react-router";
import {useAuth} from "../context/useAuth.tsx";

type MovieItemProps = {
    movie: Movie;
    selectedType: string;
}

export const url = "https://image.tmdb.org/t/p/original/";


const MovieItem= ({movie, selectedType}: MovieItemProps) => {
    const {user, isLogged, setOpenLoginDialog} = useAuth();
    const theme = useTheme();
    // @ts-ignore
    const { isFavorite, addFavorite, removeFavorite } = useFav();
    // @ts-ignore
    const { isSeen, addSeen, removeSeen } = useSeen();
    const navigate = useNavigate();

    return (
        <>
            <Card
                sx={{boxShadow: isFavorite(movie) ? `0 0 6px ${theme.palette.primary.main}` : "none", position: "relative", display:"flex", flexDirection: "column", maxWidth: 345 ,minHeight: 750,margin: "0 auto", justifyContent: "space-between", alignContent: "space-between"}}>
                <CardMedia
                    sx={{height: 500}}
                    image={url+movie.poster_path}
                    title={movie.title}
                />
                <IconButton color={"primary"} sx={{position: "absolute", top: 460, right: 50}} onClick={() => isFavorite(movie) ? removeFavorite(movie.id) : (isLogged ? addFavorite(movie, selectedType, user) : setOpenLoginDialog(true))}>
                    {isFavorite(movie) ? <Favorite/> : <FavoriteBorder/>}
                </IconButton>
                <IconButton color={"primary"} sx={{position: "absolute", top: 460, right: 10}} onClick={() => isSeen(movie) ? removeSeen(movie) : addSeen(movie)}>
                    {isSeen(movie) ? <Visibility/> : <VisibilityOutlined/>}
                </IconButton>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{}}>
                        {movie.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' , display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden"}}>
                        {movie.overview}
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: "space-between"}}>
                    <Button size="medium" variant={"contained"}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                    >Plus d'infos</Button>
                    <Box>
                        <Typography sx={{textAlign: "right"}} fontSize={"x-small"}
                                    component="legend">({movie.vote_count})</Typography>
                        <Rating name="size-small"
                            size="small"
                            defaultValue={movie.vote_average/2}
                            precision={0.1}
                            icon={<EmojiEvents/>}
                            emptyIcon={<EmojiEventsOutlined/>}
                            readOnly/>
                    </Box>
                </CardActions>
            </Card>
        </>
    );
};

export default MovieItem;
