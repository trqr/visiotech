import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {options, personApi} from "../../api/api.ts";
import {Box, Paper, Typography} from "@mui/material";
import {url} from "../../components/MovieItem.tsx";
import type {PeopleDetailsType} from "../../@types/peopleDetails";

const PeopleDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [people, setPeople] = useState<PeopleDetailsType>({} as PeopleDetailsType);
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
            <Paper sx={{width: "75%", margin: "40px auto", display: "flex", flexDirection:"column"}} elevation={3}>
                <Box sx={{display:"flex", margin: "20px"}}>
                    <img style={{objectFit:"fill",width: "350px"}} src={url+people.profile_path} alt={people.name}/>
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", margin: "20px"}}>
                        <Typography variant={"h1"}>{people.name}</Typography>
                        <Typography variant={"h5"}>Naissance: Le {people.birthday} à {people.place_of_birth}.</Typography>
                        <Typography variant={"body1"} sx={{margin: "10px 0px",
                            display: "-webkit-box",
                            WebkitLineClamp: 15,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"}}>{people.biography}</Typography>
                    </Box>
                </Box>
                <Typography variant={"h3"} sx={{textAlign:"center"}}>Filmographie</Typography>

                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    gridGap: "10px",
                    margin: "20px"
                }}>
                    {credits.map((credit: any) => (
                        <Box sx={{transition: "all ease 0.3s",cursor: "pointer", margin: "5px",  "&:hover": { transform: "scale(1.05)"} }} onClick={() => navigate(`/movie/${credit.id}`)}>
                            <img style={{display: "block", height: "250px", margin: "auto"}}
                                 src={url + credit.poster_path}/>
                            <Typography variant={"h6"} sx={{textAlign: "center", display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden"}}>{credit.title}</Typography>
                        </Box>
                    ))}
                </Box>
            </Paper>

        </>
    );
};

export default PeopleDetails;
