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

    const addSeen = (movie: Movie) => {
        if (!isSeen(movie))
            setSeenFilms([...seenFilms, movie]);
    }

    const removeSeen = (movie: Movie) => {
        return setSeenFilms(seenFilms.filter(film => film.id !== movie.id));
    }

    const isSeen = (movie: Movie) => {
        return seenFilms.some(film => film.id === movie.id);
    }

    return (
        <>
            <SeenContext.Provider value={{seenFilms, addSeen, removeSeen, isSeen}}>
                {children}
            </SeenContext.Provider>
        </>
    )
}