import {Card, CardContent, Grid, Skeleton} from "@mui/material";

const DashboardGridSkeleton = () => {
    return (
        <Grid sx={{
            justifyContent: "center",
            alignItems: "stretch",
            margin: "0px auto"
        }} spacing={4} container>
            {Array.from({length: 20}).map((_, i) =>(
                <Grid key={i} size={{xs: 12, md: 4, lg: 3, xl: 2.2}}>
                    <Card sx={{maxHeight: "750px"}}>
                        <Skeleton variant="rectangular" height={500}/> {/* En haut de la card */}
                        <CardContent>
                            <Skeleton height={40} width="70%"/>
                            <Skeleton height={25} width="100%"/>
                            <Skeleton height={25} width="100%"/>
                            <Skeleton height={25} width="100%"/>
                            <Skeleton height={25} width="100%"/>
                            <Skeleton height={60} width="45%" sx={{marginTop: "25px", marginBottom: "0px"}}/>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default DashboardGridSkeleton;