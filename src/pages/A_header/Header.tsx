import {MenuItem, useColorScheme, useTheme} from "@mui/material";
import { NavLink} from "react-router";
import { useNavigate} from "react-router";
import "./Header.css";
import AuthContainer from "../../components/header/AuthContainer.tsx";
import ResearchAutocomplete from "../../components/header/ResearchAutocomplete.tsx";

const Header = () => {
    const navigate = useNavigate();
    const { mode } = useColorScheme();
    const theme = useTheme();
    const menu : { name: string, navigation: string}[] = [
        {
            name: "Accueil",
            navigation: "/"
        },
        {
            name: "Favoris",
            navigation: "/favorites"
        },
        {
            name: "Watched",
            navigation: "/watched"
        },
        {
            name: "Best Movies",
            navigation: "/bestmovies"
        }];

    return (
        <header style={{display:"flex", justifyContent:"space-between", alignItems:"center", height:"80px"}}>
            <nav style={{display:"flex", justifyContent:"center", marginLeft:"10px"}}>
                {menu.map((item, index) =>
                    <>
                        <NavLink className={"navlink"} style={({isActive}) => ({border: isActive ? `1px solid ${theme.palette.primary.main}` : "none", color: mode === "light" ? "black" : "white"})}
                                 to={item.navigation}>
                            <MenuItem key={index}  onClick={()=> navigate(item.navigation)} sx={{cursor:"pointer"}}>{item.name}</MenuItem>
                        </NavLink>
                    </>
                )}
            </nav>
            <ResearchAutocomplete></ResearchAutocomplete>
            <AuthContainer></AuthContainer>
        </header>
    );
};

export default Header;
