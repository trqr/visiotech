import {useContext} from "react";
import {FavoriteContext} from "./FavoriteContext.tsx";

export const useFav = () => useContext(FavoriteContext);