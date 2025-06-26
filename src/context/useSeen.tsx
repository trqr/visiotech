import {SeenContext} from "./SeenContext.tsx";
import {useContext} from "react";

export const useSeen = () => useContext(SeenContext);