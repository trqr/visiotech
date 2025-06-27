import {createContext, useState} from "react";
import type {Movie} from "../@types/movie";

type SeenProviderType = {
    seenFilms: Movie[];
    addSeen: (movie: Movie) => void;
    removeSeen: (movie: Movie) => void;
    isSeen: (movie: Movie) => boolean;
}

export const SeenContext = createContext<SeenProviderType | undefined>(undefined);

export const SeenProvider = ({children}: { children: React.ReactNode }) => {
    const [seenFilms, setSeenFilms] = useState<Movie[]>([]);

/*    const getSeenFilms = () => {
        loadSeenFromLocalStorage();
    }*/

    const addSeen = (movie: Movie) => {
        if (!isSeen(movie))
            setSeenFilms([...seenFilms, movie]);
        saveSeenToLocalStorage()
    }

    const removeSeen = (movie: Movie) => {
        saveSeenToLocalStorage()
        return setSeenFilms(seenFilms.filter(film => film.id !== movie.id));

    }

    const isSeen = (movie: Movie) => {
        return seenFilms.some(film => film.id === movie.id);
    }

    function saveSeenToLocalStorage() {
        localStorage.setItem("seenFilms", JSON.stringify(seenFilms));
    }

    function loadSeenFromLocalStorage() {
        const seenFilms = localStorage.getItem("seenFilms");
        if (seenFilms)
            setSeenFilms(JSON.parse(seenFilms));
    }

    return (
        <>
            <SeenContext.Provider value={{seenFilms, addSeen, removeSeen, isSeen}}>
                {children}
            </SeenContext.Provider>
        </>
    )
}