import { Stack } from "@mui/material";
import Top from "./Top";
import Middle from "./Middle";
import "./style.scss"
import Bottom from "./Bottom";
import MobileNav from "./MobileNav";
import { useState } from "react";


const Navbar = () => {

  const [active, setActive] = useState(false)
  
  return (
    <Stack className="navbar" bgcolor={"primary.whiteBg"} >
      {/* Top */}
      <Top />
      {/* Desktop */}
      <Stack >
        {/* Middle */}
        <Middle active={active} setActive={setActive} />
        {/* Bottom */}
        <Bottom />
      </Stack>
      {/* Mobile */}
      <Stack display={{xs : "flex" , md : "none"}} px={{xs: 10 , sm : 20}} >
        <MobileNav setActiveCart={setActive} />
      </Stack>
    </Stack>
  )
}

export default Navbar
