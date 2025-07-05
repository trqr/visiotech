import {useKeenSlider} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import './Carousel.css'
import {useState} from "react"
import { useTheme} from "@mui/material";

type VideosCarouselProps = {
    videos: never[];
}

const VideosCarousel = ({videos}: VideosCarouselProps) => {
    const theme = useTheme();
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    const slidesLength = instanceRef.current?.track?.details?.slides?.length ?? 1

    return (
        <>
            <div className="navigation-wrapper" style={{margin: "20px"}}>
                <div ref={sliderRef} style={{width: "950px"}} className="keen-slider">
                    {videos.slice(0,10).map((video, index: number) => (
                        <>
                            <div key={video.id} style={{cursor: "pointer", position: "relative"}}
                                 className={`keen-slider__slide number-slide${index}`}>
                                <iframe
                                    width={"100%"}
                                    height={"100%"}
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                                </iframe>
                            </div>
                        </>
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
                            style={{background: (currentSlide === idx) ? `${theme.palette.primary.main}` : `#c5c5c5`}}
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
            style={{fill: useTheme().palette.primary.main}}
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

export default VideosCarousel
