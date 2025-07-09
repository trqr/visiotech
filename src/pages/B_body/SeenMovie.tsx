import {Box, Card, CardContent, CardMedia, Container, Grid, IconButton, Rating, Typography } from "@mui/material";
import Pages from "../Pages";
import type { Fav } from "../../@types/Fav.ts";
import {Delete, EmojiEvents, EmojiEventsOutlined, Favorite, FavoriteOutlined} from "@mui/icons-material";
import {useFav} from "../../context/useFav.tsx";
import {useSeen} from "../../context/useSeen.tsx";
import type {Seen} from "../../@types/Seen.ts";

const SeenMovie= () => {
    // @ts-expect-error biendslecontext
    const {favoriteFilms, addFavorite, removeFavorite, isFavorite} = useFav();
    // @ts-expect-error biendslecontext
    const {seenFilms, addSeen, removeSeen, isSeen} = useSeen();

    return (
        <>
            <Pages title={"Favoris"} description={"Mes favoris"}>
                <h1 style={{textAlign: "center"}}>{seenFilms.length > 0 ? "Mes favoris" : "Vous n'avez pas de favoris"}</h1>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {seenFilms.map((seen: Seen) => (
                            <Grid size={{xl: 6, lg: 6, md: 6, xs: 12}}>
                                <Card sx={{display: 'flex', minHeight: "180px", justifyContent: 'space-between'}}>
                                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                        <CardContent sx={{flex: '1 0 auto', width: "250px"}}>
                                            <Typography component="div" variant="h5">
                                                {seen.title}
                                            </Typography>
                                            <Typography
                                                variant={"caption"}>{seen.type === "movie" ? 'Film' : 'Serie'}</Typography>
                                        </CardContent>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: "space-between",
                                            alignContent: 'center',
                                            pl: 1,
                                            pb: 1
                                        }}>
                                            <Box>
                                                <IconButton color={"primary"}
                                                            onClick={() => isFavorite(seen) ? removeFavorite(seen) : addFavorite(seen)}>
                                                    {isFavorite(seen) ? <Favorite/> : <FavoriteOutlined/>}
                                                </IconButton>
                                                <IconButton onClick={() => removeSeen(seen.media_id)}><Delete
                                                    color={"primary"}/></IconButton>
                                            </Box>
                                            <Box sx={{
                                                display: "flex",
                                                flexDirection: 'column',
                                                justifyContent: 'flex-end',
                                                alignItems: 'flex-end'
                                            }}>
                                                <Typography sx={{textAlign: "right"}} fontSize={"x-small"}
                                                            component="legend">({seen.vote_number})</Typography>
                                                <Rating name="size-small"
                                                        size="small"
                                                        defaultValue={seen.vote_average / 2}
                                                        precision={0.1}
                                                        icon={<EmojiEvents/>}
                                                        emptyIcon={<EmojiEventsOutlined/>}
                                                        readOnly/>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <CardMedia
                                        component="img"
                                        sx={{width: 300}}
                                        image={seen.image}
                                        alt={seen.title}
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

export default SeenMovie;
