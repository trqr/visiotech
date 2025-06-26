import {MenuItem } from "@mui/material";
import { NavLink} from "react-router";
import { useNavigate} from "react-router";
import "./Header.css";


const Header = () => {
    const navigate = useNavigate();
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
        }];

    return (
        <>
            <nav style={{display:"flex", justifyContent:"center"}}>
                {menu.map((item, index) =>
                    <>
                        <NavLink className={"navlink"} style={({isActive}) => ({border: isActive ? "1px solid #d67e28" : "none"})}
                                 to={item.navigation}>
                            <MenuItem key={index}  onClick={()=> navigate(item.navigation)} sx={{cursor:"pointer"}}>{item.name}</MenuItem>
                        </NavLink>
                    </>
                )}
            </nav>
        </>
    );
};

export default Header;
