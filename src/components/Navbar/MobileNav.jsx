import { Button, IconButton, Stack, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../../images/logo.svg"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";



const MobileNav = () => {

  const [active, setActive] = useState(false)
  
  return (
    <Stack position={"relative"} >
      <Top setActive={setActive} />
      <Search />
      <Menu active={active} setActive={setActive} />
    </Stack>
  )
}

const Top = ({setActive}) => {
  return (
    <Stack py={10} direction={"row"} alignItems={"center"} justifyContent={"space-between"} >
      <MenuIcon sx={{cursor : "pointer" , transition : ".5s" , "&:hover" : {color : "primary.main"}}} onClick={() => setActive(true)} />
      <img src={logo} alt="" width={100} />
      <Stack direction={"row"} alignContent={"center"} spacing={4} sx={{ "svg" : { maxWidth : "25px" } }} >
        <Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 32 32"
          >
            <path
              fillRule="evenodd"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15.793 28.883c-4.923 0-9.127-.767-9.127-3.834 0-3.068 4.178-5.9 9.127-5.9 4.922 0 9.126 2.805 9.126 5.872 0 3.067-4.177 3.861-9.126 3.861zM15.783 14.898a5.85 5.85 0 10-5.85-5.848 5.828 5.828 0 005.809 5.848h.04z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
        <Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 32 32"
          >
            <path
              fillRule="evenodd"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3.896 16.595c-1.431-4.467.242-10.02 4.932-11.53 2.466-.795 5.51-.131 7.24 2.254 1.63-2.473 4.762-3.044 7.226-2.253 4.688 1.509 6.37 7.062 4.941 11.529-2.226 7.08-9.995 10.768-12.168 10.768-2.17 0-9.87-3.605-12.171-10.768z"
              clipRule="evenodd"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21.051 10.085c1.61.165 2.616 1.441 2.556 3.23"
            ></path>
          </svg>
        </Link>
        <Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 32 32"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7.592 8.574C20.723 6.79 23.959 7.01 26 9.334c2.04 2.323 1.563 9.983-.823 12.115-2.384 2.132-12.737 2.335-16.017 0-3.465-2.468-1.455-10.06-1.568-14.658C7.66 4.217 4.867 3.8 4.867 3.8M18.875 14.293h3.697"
            ></path>
            <path
              fill="currentColor"
              fillRule="evenodd"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.685 26.837a.726.726 0 11-.001 1.452.726.726 0 01.001-1.452zM23.46 26.837a.726.726 0 11.001 1.452.726.726 0 010-1.452z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </Stack>
    </Stack>
  )
}

const Search = () => {
  return (
    <Stack className="search" direction={"row"} alignItems={"center"} mb={8} >
      <input type="text" placeholder="Search" />
    </Stack>
  )
}

const Menu = ({active , setActive}) => {

  const items = [
    {
      name : "Home"
    },
    {
      name : "About"
    },
    {
      name : "Our Brands"
    },
    {
      name : "Accessories"
    },
    {
      name : "Audio"
    },
    {
      name : "Networks"
    },
    {
      name : "Devices"
    },
    {
      name : "Repair Equipments"
    },
    {
      name : "Protections"
    },
  ]

  const itemStyle = {
    transition : ".5s",
    cursor : "pointer",
    borderLeft: "2px solid",
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
  
  return (
    <Stack className="menu" position={"fixed"} width={active ? "300px" : "0px"} overflow={"hidden"} height={"100vh"} top={0} left={0} bgcolor={"primary.whiteBg"} py={20} boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"} sx={{transition : ".5s"}} zIndex={10000} >
      <Stack width={"300px"} >

        <img src={logo} alt="" width={"150px"} style={{marginLeft : "20px" , marginBottom : "24px"}} />

        <Stack mb={16} >
          {items.map((item , i) => {
            return (
              <Stack key={i} direction={"row"} alignItems={"center"} spacing={4} pl={10} py={7} color={"#434E58"} sx={itemStyle} >
                <Typography variant="subtitle" > {item.name} </Typography>
              </Stack>
            )
          })}
        </Stack>

        <Stack px={10} > <Button variant="contained" sx={{py : "16px"}} > All Categories </Button> </Stack>

        <IconButton color="primary" sx={{ position : "absolute" , right : "10px" , top : "10px" }} onClick={() => setActive(false)} > <ClearIcon /> </IconButton>

      </Stack>
    </Stack>
  )
}

export default MobileNav
