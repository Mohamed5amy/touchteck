import { Stack } from "@mui/material";
import Top from "./Top";
import Middle from "./Middle";
import "./style.scss"
import Bottom from "./Bottom";
import MobileNav from "./MobileNav";
import { useEffect } from "react";


const Navbar = () => {

  useEffect(() => {
    !localStorage.getItem("carts") && localStorage.setItem("carts", JSON.stringify([]))
  } , [])
  
  return (
    <Stack className="navbar" bgcolor={"primary.whiteBg"} >
      {/* Top */}
      <Top />
      {/* Desktop */}
      <Stack display={{xs : "none" , md : "flex"}} >
        {/* Middle */}
        <Middle />
        {/* Bottom */}
        <Bottom />
      </Stack>
      {/* Mobile */}
      <Stack display={{xs : "flex" , md : "none"}} px={{xs: 10 , sm : 20}} >
        <MobileNav />
      </Stack>
    </Stack>
  )
}

export default Navbar
