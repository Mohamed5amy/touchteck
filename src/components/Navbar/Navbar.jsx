import { Stack } from "@mui/material";
import Top from "./Top";
import Middle from "./Middle";
import "./style.scss"
import Bottom from "./Bottom";
import MobileNav from "./MobileNav";
import { useEffect, useState } from "react";
import axios from "axios";


const Navbar = () => {

  const [active, setActive] = useState(false)
  
  const [cats, setCats] = useState([])
  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "generalCategory", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setCats(res.data.data.GeneralCategory);
            console.log(res.data.data.GeneralCategory);
        })
        .catch((err) => {
            console.log(err);
        })
  }, []);
  
  return (
    <Stack className="navbar" bgcolor={"primary.whiteBg"} >
      {/* Top */}
      <Top />
      {/* Desktop */}
      <Stack >
        {/* Middle */}
        <Middle active={active} setActive={setActive} />
        {/* Bottom */}
        <Bottom cats={cats} />
      </Stack>
      {/* Mobile */}
      <Stack display={{xs : "flex" , md : "none"}} px={{xs: 10 , sm : 20}} >
        <MobileNav setActiveCart={setActive} cats={cats} />
      </Stack>
    </Stack>
  )
}

export default Navbar
