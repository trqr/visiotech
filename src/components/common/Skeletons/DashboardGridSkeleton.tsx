import {Grid, Skeleton} from "@mui/material";

const DashboardGridSkeleton = () => {
    return (
        <Grid sx={{
            justifyContent: "center",
            alignContent: "start",
            alignItems: "start",
            margin: "0px auto"
        }} spacing={4} container>
            {Array.from({length: 20}).map((_, i) =>(
                <Grid key={i} size={{xs: 12, md: 4, lg: 3, xl: 2.2}}>
                    <Skeleton height={300}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default DashboardGridSkeleton;