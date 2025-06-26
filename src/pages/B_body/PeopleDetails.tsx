import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {options, personApi} from "../../api/api.ts";
import {Box, Paper, Typography} from "@mui/material";
import {url} from "../../components/MovieItem.tsx";

const PeopleDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [people, setPeople] = useState([]);
    const [credits, setCredits] = useState([]);

    useEffect(() => {
        fetch(`${personApi}${id}?language=fr-FR`, options)
            .then(res => res.json())
            .then(data => setPeople(data))
            .catch(err => console.error(err));

        fetch(`${personApi}${id}/combined_credits?language=fr-FR`, options)
            .then(res => res.json())
            .then(res => setCredits(res.cast))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <Paper sx={{width: "75%", margin: "40px auto", display: "flex"}} elevation={3}>
                <Box sx={{width: "300px", height: "400px", margin: "20px"}}>
                    <img style={{objectFit:"fill", height: "400px"}} src={url+people.profile_path} alt={people.name}/>
                </Box>
                <Box>
                    <Typography variant={"h1"}>{people.name} {people.id}</Typography>
                    <Typography variant={"h3"}>{people.birthday}</Typography>
                    <Typography variant={"body1"}>{people.also_known_as}</Typography>
                    <Typography variant={"body2"}>{people.biography}</Typography>
                    <Box sx={{display:"grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: "10px", margin: "20px"}}>
                    {credits.map((credit: any) => (
                        <Box sx={{cursor:"pointer"}} onClick={() => navigate(`/movie/${credit.id}`)}>
                            <img style={{height:"150px"}} src={url+credit.poster_path}/>
                            <Typography variant={"h4"}>{credit.title}</Typography>
                        </Box>
                    ))}
                    </Box>
                </Box>
            </Paper>

        </>
    );
};

export default PeopleDetails;
