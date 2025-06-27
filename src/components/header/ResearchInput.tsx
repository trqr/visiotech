import {Box, Button, TextField } from "@mui/material";
import {useState} from "react";
import { useNavigate } from "react-router";


const ResearchInput= () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }

    const handleSearch= (e) => {
        e.preventDefault();
        navigate(`/research/${searchValue}`);
    }

    return (
        <Box sx={{width: "40%", display: "flex", justifyContent: "space-between"}}>
            <TextField sx={{width: "100%"}} size={"small"} label="Search" onChange={handleChange}/>
            <Button variant={"outlined"} onClick={handleSearch} >Search</Button>
        </Box>
    );
};

export default ResearchInput;
