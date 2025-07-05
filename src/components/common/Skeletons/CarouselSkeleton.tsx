import {Skeleton, Stack} from "@mui/material";

type CarouselSkeletonProps = {
    gap: string;
    width: string;
}

const CarouselSkeleton = ({gap, width}: CarouselSkeletonProps) => {
    return (
        <>
            <Stack gap={gap}
                   sx={{alignItems: "center", justifyContent: "center", display: "flex", marginBottom: "35px"}}>
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={width}
                    height={"500px"}
                />
                <Skeleton animation="wave"
                          width={"10%"}
                          height={"20px"}/>
            </Stack>
        </>
    )
}

export default CarouselSkeleton;