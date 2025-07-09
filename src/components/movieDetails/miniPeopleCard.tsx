import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import {url} from "../MovieItem.tsx";
import { useNavigate } from "react-router";
import type {MovieCredit} from "../../@types/MovieCredit.ts";

type MiniPeopleCardProps = {
    actor: MovieCredit;
}

const MiniPeopleCard = ({actor}: MiniPeopleCardProps) => {
    const navigate = useNavigate();
  return (
      <Card sx={{maxWidth: 200}} onClick={() => navigate(`/people/${actor.id}`)}
      >
          <CardActionArea>
              <CardMedia
                  component="img"
                  height="200"
                  image={url+actor.profile_path}
                  alt={actor.name}
              />
              <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                      {actor.name}
                  </Typography>
                  <Typography variant="body2" sx={{color: 'text.secondary'}}>
                      Rôle: {actor.character}
                  </Typography>
              </CardContent>
          </CardActionArea>
          <CardActions>
              <Button size="small"
                      color="primary"
                      onClick={() => navigate(`/people/${actor.id}`)}
              >
                  En savoir plus
              </Button>
          </CardActions>
      </Card>
  )
};

export default MiniPeopleCard;