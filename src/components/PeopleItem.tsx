import {Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import type {People} from "../@types/people";
import { url } from "./MovieItem";
import {useNavigate} from "react-router";

type PeopleItemProps = {
    people: People;
}

const PeopleItem= ({people}:PeopleItemProps) => {
    const navigate = useNavigate();
    return (
        <>
            <Card
                sx={{
                    position: "relative",
                    maxWidth: 345,
                    margin: "0 auto",
                    justifyContent: "space-between",
                    alignContent: "space-between"
                }}>
                <CardMedia
                    sx={{height: 500}}
                    image={url + people.profile_path}
                    title={people.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{}}>
                        {people.name}
                    </Typography>
                    <Typography variant="body2" sx={{
                        color: 'text.secondary',
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                    }}>
                        {people.known_for_department}
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: "space-between"}}>
                    <Button size="medium" variant={"contained"}
                            onClick={() => navigate(`/people/${people.id}`)}
                            >Plus d'infos
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};

export default PeopleItem;
