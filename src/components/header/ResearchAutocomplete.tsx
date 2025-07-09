import {Autocomplete, Box, Button, CircularProgress, TextField} from "@mui/material";
import {type ChangeEvent, useEffect, useRef, useState, useTransition} from "react";
import {apiOptions} from "../../api/api.ts";
import type {Movie} from "../../@types/movie";
import {useNavigate} from "react-router";

const ResearchAutocomplete = () => {
    const [options, setOptions] = useState<{ label: string, id: number }[]>();
    const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [isPending, startTransition] = useTransition();
    const searchTimeOut = useRef<ReturnType<typeof  setTimeout> | null>(null);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        startTransition( async () => {
        setOptions(searchedMovies.map(movie => ({label: movie.title, id: movie.id})));
        })
    }, [searchedMovies])


    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        if (searchTimeOut.current)
            clearTimeout(searchTimeOut.current)

        searchTimeOut.current = setTimeout(() => {
            setSearchValue(event.target.value);
            fetch(`https://api.themoviedb.org/3/search/movie?query=${event.target.value}&include_adult=false&language=fr-FR&page=1`, apiOptions)
                .then(res => res.json())
                .then(data => {
                    setSearchedMovies(data.results);
                });
        }, 500)
    }

    const handleSelectionChange = (event: React.SyntheticEvent, value: { label: string; id: number } | null) => {
        setSelectedMovieId(value ? value.id : null);
    };

    return (
        <>
            <Box sx={{display: "flex", width: "100%", justifyContent: "center"}}>
                <Autocomplete
                    disablePortal
                    options={options ?? []}
                    onChange={handleSelectionChange}
                    sx={{width: "40%"}}
                    renderInput={(params) => <TextField {...params} onChange={handleSearchInput} size="small" label="Search"/>}
                />
                <Button variant={"outlined"} onClick={() => navigate(`/movie/${selectedMovieId}`)}>Go</Button>
                <Button variant={"text"} onClick={() => navigate(`/research/${searchValue}`)}>More</Button>
            </Box>
        </>
    )
}

export default ResearchAutocomplete;