import { Stack, Typography } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Bottom = () => {

  const itemStyle = {
    transition : ".5s",
    cursor : "pointer",
    borderBottom : "2px solid",
    borderColor : "transparent",
    "svg" : {
      transition : ".5s",
    },
    "span" : {
      transition : ".5s",
    },
    "&:hover" : {
      bgcolor : "#79D70A0a",
      borderColor : "primary.secondary",
      "svg" : {
        color : "primary.secondary"
      },
      "span" : {
        color : "primary.secondary"
      },
    },
  }

  const items = [
    {
      name : "الرئيسة",
      link : "/",
    },
    {
      name : "منتجاتنا",
      link : "/products",
    },
    {
      name : "من نحن",
      link : "/about",
    },
    {
      name : "علاماتنا التجارية",
      link : "/brands",
    },
    {
      name : "تواصل معنا",
      link : "/contact",
    },
  ]

  const [cats, setCats] = useState([])
  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "category", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            // console.log(res.data.data.Category);
            setCats(res.data.data.Category);
        })
        .catch((err) => {
            console.log(err);
        })
  }, []);
  
  return (
    <Stack direction={"row"} alignItems={"end"} spacing={2} 
    height={"70px"} sx={{ maxWidth: "100%", overflowX : "scroll" }} px={{ xs : 10 , sm : 20 , md : 10 , lg : 70 }} >
      {/* <button className="all_cat" >
        <MenuIcon />
        <span>All Categories</span>
      </button> */}
      {items.map((item , i) => {
        return (
          <Stack key={i} spacing={4} direction={"row"} alignItems={"center"} px={4} height={"100%"} color={"#434E58"} sx={itemStyle}>
            <Link to={item.link} >
              <Typography variant="button" color={"text.secondary"} noWrap >{item.name}</Typography>
            </Link>
          </Stack>
        )
      })}
      {cats?.map((item , i) => {
        return (
          <Stack key={i} spacing={4} direction={"row"} alignItems={"center"} px={4} height={"100%"} color={"#434E58"} sx={itemStyle}>
            <Link to={"/category/" + item.id} >
              <Typography variant="button" color={"text.secondary"} noWrap >{item.name}</Typography>
            </Link>
          </Stack>
        )
      })}
    </Stack>
  )
}

export default Bottom
