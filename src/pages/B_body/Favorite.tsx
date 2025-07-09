import {useFav} from "../../context/useFav.tsx";
import {Box, Card, CardContent, CardMedia, Container, Grid, IconButton, Rating, Typography} from "@mui/material";
import { useSeen } from "../../context/useSeen.tsx";
import {Delete, EmojiEvents, EmojiEventsOutlined, Visibility, VisibilityOutlined} from "@mui/icons-material";
import Pages from "../Pages.tsx";
import type {Fav} from "../../@types/Fav.ts";

const Favorite = () => {
    // @ts-expect-error biendslecontext
    const { favoriteFilms, removeFavorite, isFavorite } = useFav();
    // @ts-expect-error biendslecontext
    const { seenFilms, addSeen, removeSeen, isSeen } = useSeen();

    return (
        <>
            <Pages title={"Favoris"} description={"Mes favoris"}>
                <h1 style={{textAlign: "center"}}>{favoriteFilms.length > 0 ? "Mes favoris" : "Vous n'avez pas de favoris"}</h1>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                    {favoriteFilms.map((fav: Fav) => (
                        <Grid size={{xl: 6, lg: 6, md: 6, xs: 12}}>
                            <Card sx={{display: 'flex', minHeight: "180px", justifyContent: 'space-between'}}>
                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                    <CardContent sx={{flex: '1 0 auto', width: "250px"}}>
                                        <Typography component="div" variant="h5">
                                            {fav.title}
                                        </Typography>
                                        <Typography variant={"caption"}>{fav.type === "movie" ? 'Film' : 'Serie'}</Typography>
                                    </CardContent>
                                    <Box sx={{display: 'flex', justifyContent: "space-between",  alignContent: 'center', pl: 1, pb: 1}}>
                                        <Box>
                                        <IconButton color={"primary"}
                                                    onClick={() => isSeen(fav) ? removeSeen(fav.media_id) : addSeen(fav, fav.type, fav.user_id)}>
                                            {isSeen(fav) ? <Visibility/> : <VisibilityOutlined/>}
                                        </IconButton>
                                        <IconButton onClick={() => removeFavorite(fav.media_id)}><Delete color={"primary"}/></IconButton>
                                        </Box>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: 'column',
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-end'
                                        }}>
                                            <Typography sx={{textAlign: "right"}} fontSize={"x-small"}
                                                        component="legend">({fav.vote_number})</Typography>
                                            <Rating name="size-small"
                                                    size="small"
                                                    defaultValue={fav.vote_average / 2}
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
                                    image={fav.image}
                                    alt={fav.title}
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

