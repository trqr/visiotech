import {createContext, useState} from "react";
import type {Movie} from "../@types/movie";
import type {Fav} from "../@types/Fav.ts";
import {url} from "../components/MovieItem.tsx";
import {Add, Delete, getFavByUserId} from "../db/indexedDb.service.tsx";
import type {User} from "../@types/User.ts";

type FavoriteProviderType = {
    favoriteFilms: Fav[];
    getFavorites: (user: User) => void;
    addFavorite: (movie: Movie, type: string, user: User) => void;
    removeFavorite: (id: number) => void;
    isFavorite: (movie: Movie) => boolean;
    clearFavorites: () => void;
}

export const FavoriteContext = createContext<FavoriteProviderType | undefined>(undefined);

export const FavoriteProvider = ({children} : { children: React.ReactNode }) => {
    const [favoriteFilms, setFavoriteFilms] = useState<Fav[]>([]);

    const getFavorites = async (user: User) => {
        setFavoriteFilms(await getFavByUserId(user.id!));
    }

    const addFavorite = async (movie: Movie, type: string, user: User) => {
        if (!isFavorite(movie)){

            const fav: Fav = {
                id : movie.id,
                type: type,
                title: movie.title ?? movie.name,
                vote_average: movie.vote_average,
                vote_number: movie.vote_count,
                image: `${url}${movie.backdrop_path}`,
                user_id: user.id!
            }

            setFavoriteFilms([...favoriteFilms, fav]);
            return await Add("fav", fav);
        }
    }

    const removeFavorite = (id: number) => {
        setFavoriteFilms(favoriteFilms.filter(f => f.id !== id))
        Delete("fav", id)
    }

    const isFavorite = (movie: Movie) => {
        return favoriteFilms.some(film => film.id === movie.id);
    }

    const clearFavorites = () => {
        setFavoriteFilms([]);
    }

    return (
        <>
            <FavoriteContext.Provider value={{favoriteFilms, getFavorites, addFavorite, removeFavorite, isFavorite, clearFavorites}}>
                {children}
            </FavoriteContext.Provider>
        </>
    )
}