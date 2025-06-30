import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import './Carousel.css'
import {useState} from "react"
import type {Movie} from "../../@types/movie"
import {url} from "../MovieItem.tsx"
import {useNavigate} from "react-router";
import {Typography} from "@mui/material";

type CarouselProps = {
    movies: Movie[];
    type: string;
}

const Carousel = ({movies, type}: CarouselProps) => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 1,
        slides: {
            origin: "center",
            perView: 2,
            spacing: 15,
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {(setLoaded(true))},
    })

    const slidesLength = instanceRef.current?.track?.details?.slides?.length ?? 1

    return (
        <>
            <div className="navigation-wrapper">
                <div ref={sliderRef} className="keen-slider">
                    {movies.slice(0, 8).map((movie: Movie, index: number) => (
                        <div key={movie.id} style={{cursor:"pointer" ,position:"relative"}} className={`keen-slider__slide number-slide${index}`} onClick={() => navigate(`/${type}/${movie.id}}`)}>
                            <img src={url + movie.backdrop_path} alt={movie.title || "Movie"}/>
                                <Typography fontSize={"large"} color={"textSecondary"} variant={"overline"}
                                            sx={{
                                                position: "absolute",
                                                display: "flex",
                                                alignItems: "center",
                                                bottom: "10px",
                                                margin: "0px",
                                                padding: "10px",
                                                height: "30px",
                                                borderRadius: "5px",
                                                bgcolor: 'primary.main',
                                                '&:hover': {
                                                    bgcolor: 'primary.dark',
                                    }}} >{type === "movie" ? movie.title : movie.name}</Typography>
                        </div>
                    ))}
                </div>

                {loaded && instanceRef.current && (
                    <>
                        <Arrow
                            left
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.prev()
                            }
                            disabled={currentSlide === 0}
                        />

                        <Arrow
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.next()
                            }
                            disabled={currentSlide === slidesLength - 1}
                        />
                    </>
                )}
            </div>

            {loaded && instanceRef.current && (
                <div className="dots">
                    {Array.from({length: slidesLength}, (_, idx) => (
                        <button
                            key={idx}
                            onClick={() => instanceRef.current?.moveToIdx(idx)}
                            className={"dot" + (currentSlide === idx ? " active" : "")}
                        />
                    ))}
                </div>
            )}
        </>
    )
}

function Arrow({
                   disabled,
                   left,
                   onClick,
               }: {
    disabled: boolean
    left?: boolean
    onClick: (e: any) => void
}) {
    const disabledClass = disabled ? " arrow--disabled" : ""
    return (
        <svg
            onClick={onClick}
            className={`arrow ${left ? "arrow--left" : "arrow--right"}${disabledClass}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {left ? (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
            ) : (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
            )}
        </svg>
    )
}

export default Carousel
