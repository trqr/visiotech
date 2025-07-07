import {createContext, useState} from "react";
import type {Movie} from "../@types/movie";
import type {User} from "../@types/User.ts";
import type {FavAndSeen} from "../@types/FavAndSeen.ts";
import {url} from "../components/MovieItem.tsx";
import {Add, Delete, getFavByUserId} from "../db/indexedDb.service.tsx";
import MySnackBar from "../components/common/MySnackBar.tsx";

type SeenProviderType = {
    seenFilms: Movie[];
    getSeen: (user: User) => void;
    addSeen: (movie: Movie, type: string, user: User) => void;
    removeSeen: (id: number) => void;
    isSeen: (movie: Movie) => boolean;
    clearSeen: () => void;
}

export const SeenContext = createContext<SeenProviderType | undefined>(undefined);

export const SeenProvider = ({children}: { children: React.ReactNode }) => {
    const [seenFilms, setSeenFilms] = useState<FavAndSeen[]>([]);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackStatus, setSnackStatus] = useState<"success" | "error" | "info" | "warning">("info");

    const getSeen = async (user: User) => {
        setSeenFilms(await getFavByUserId(user.id!));
    }

    const addSeen = async (movie: Movie, type: string, user: User) => {
        if (!isSeen(movie)) {

            const seen: FavAndSeen = {
                media_id: movie.id,
                type: type,
                title: movie.title ?? movie.name,
                vote_average: movie.vote_average,
                vote_number: movie.vote_count,
                image: `${url}${movie.backdrop_path}`,
                user_id: user.id!
            }
            setSeenFilms([...seenFilms, seen]);
            setSnackMessage("Added to favorites");
            setSnackStatus("success");
            setOpenSnack(true);
            return await Add("seen", seen);
        }
    }

    const removeSeen = (id: number) => {
        setSeenFilms(seenFilms.filter(f => f.media_id !== id))
        Delete("seen", id)
        setSnackMessage("Removed from seen");
        setSnackStatus("info");
        setOpenSnack(true);
    }

    const isSeen = (movie: Movie) => {
        return seenFilms.some(film => film.media_id === movie.id);
    }

    const clearSeen = () => {
        setSeenFilms([]);
    }

    return (
        <>
            <SeenContext.Provider value={{seenFilms, getSeen, addSeen, removeSeen, isSeen, clearSeen}}>
                {children}
                <MySnackBar open={openSnack} setOpen={setOpenSnack} color={snackStatus}
                            message={snackMessage}></MySnackBar>
            </SeenContext.Provider>
        </>
    )
}