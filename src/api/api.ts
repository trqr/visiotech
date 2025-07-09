import {type Dispatch, type SetStateAction} from "react";

export const apiOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjJhMzBiMzIwMDc4OTc3YzQ5ODg1MTk3ZmIwYzE0ZSIsIm5iZiI6MTc0NDQ2NDcwMi40NjUsInN1YiI6IjY3ZmE2YjNlZDNhYjdkN2E4YmFkZGFlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xb9GpGoRsKOQ2pIdndHarxCMUHzlD6oc2uxjz9QxHg0'
    }
};

export const movieApi: string = "https://api.themoviedb.org/3/movie/";
export const serieApi: string = "https://api.themoviedb.org/3/tv/";
export const personApi: string = "https://api.themoviedb.org/3/person/";

export async function fetching<T>(url: string, setter: Dispatch<SetStateAction<T[]>>){
    fetch(url, apiOptions)
        .then(res => res.json())
        .then(data => setter(prev => [...prev, ...data.results]))
        .catch(err => console.error(err));
}
