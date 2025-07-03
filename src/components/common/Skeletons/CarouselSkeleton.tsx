import {Skeleton, Stack} from "@mui/material";

const CarouselSkeleton = () => {
    return (
        <>
            <Stack gap={"5px"}
                   sx={{alignItems: "center", justifyContent: "center", display: "flex", marginBottom: "35px"}}>
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={"100%"}
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