import {createContext, useState} from "react";
import type {Movie} from "../@types/movie";

type FavoriteProviderType = {
    favoriteFilms: Movie[];
    addFavorite: (movie: Movie) => void;
    removeFavorite: (movie: Movie) => void;
    isFavorite: (movie: Movie) => boolean;
}

export const FavoriteContext = createContext<FavoriteProviderType | undefined>(undefined);

export const FavoriteProvider = ({children} : { children: React.ReactNode }) => {
    const [favoriteFilms, setFavoriteFilms] = useState<Movie[]>([]);

    const addFavorite = (movie: Movie) => {
        if (!isFavorite(movie)){
            setFavoriteFilms([...favoriteFilms, movie]);
            saveFavoriteToLocalStorage();
        }
    }

    const removeFavorite = (movie: Movie) => {
        setFavoriteFilms(favoriteFilms.filter(film => film.id !== movie.id));
        saveFavoriteToLocalStorage()
    }

    const isFavorite = (movie: Movie) => {
        return favoriteFilms.some(film => film.id === movie.id);
    }

    function saveFavoriteToLocalStorage() {
        localStorage.setItem("favoriteFilms", JSON.stringify(favoriteFilms));
    }

    function loadFavoriteFromLocalStorage() {
        const favoriteFilms = localStorage.getItem("favoriteFilms");4
        if (favoriteFilms)
            setFavoriteFilms(JSON.parse(favoriteFilms));
    }

    return (
        <>
            <FavoriteContext.Provider value={{favoriteFilms, addFavorite, removeFavorite, isFavorite}}>
                {children}
            </FavoriteContext.Provider>
        </>
    )
}