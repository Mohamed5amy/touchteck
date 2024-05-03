import { Button, IconButton, Stack, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../../images/logo.svg"
import { Link } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import { Fragment, useEffect, useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import axios from "axios";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import LinkIcon from '@mui/icons-material/Link';



const MobileNav = ({setActiveCart}) => {

  const [active, setActive] = useState(false)
  
  return (
    <Stack position={"relative"} pb={8} >
      <Top setActive={setActive} setActiveCart={setActiveCart} />
      <Search />
      <Menu active={active} setActive={setActive} />
    </Stack>
  )
}

const Top = ({setActive , setActiveCart}) => {

  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()
  
  return (
    <Stack py={10} direction={"row"} alignItems={"center"} justifyContent={"space-between"} >
      <MenuIcon sx={{cursor : "pointer" , transition : ".5s" , "&:hover" : {color : "primary.main"}}} onClick={() => setActive(true)} />
      <Link to={"/"} ><img src={logo} alt="" width={80} /></Link>
      <Stack direction={"row"} alignContent={"center"} spacing={4} sx={{ "svg" : { maxWidth : "25px" } }} >
        <Link to={isAuthenticated() ? "/profile" : "/login"}>
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
        <Link to={isAuthenticated() ? "/wishlist" : "/login"}>
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
        <Stack sx={{transition : ".5s" , "&:hover" : {color : "primary.secondary"} , cursor : "pointer"}} onClick={() => {isAuthenticated() ? setActiveCart(true) : navigate("/login")}}>
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
        </Stack>
      </Stack>
    </Stack>
  )
}

const Menu = ({active , setActive}) => {

  const items = [
    {
      name : "الرئيسة",
      link : "/",
    },
    {
      name : "من نحن",
      link : "/about",
    },
  ]

  const items2 = [
    {
      name : "منتجاتنا",
      link : "/products",
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

  const itemStyle = {
    transition : ".5s",
    cursor : "pointer",
    "svg" : {
      transition : ".5s",
    },
    "span" : {
      transition : ".5s",
    },
    "&:hover" : {
      bgcolor : "#79D70A0a",
      "svg" : {
        color : "primary.secondary"
      },
      "span" : {
        color : "primary.secondary"
      },
    },
  }

  const navigate = useNavigate()
  
  return (
    <Stack className="menu" position={"fixed"} width={active ? "300px" : "0px"} overflow={"hidden"} height={"100vh"} top={0} left={0} bgcolor={"primary.whiteBg"} py={20} boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"} sx={{transition : ".5s" , overflowY : "scroll"}} zIndex={10000} maxHeight={"100vh"} >
      <Stack width={"300px"}>

        <img src={logo} alt="" width={"150px"} style={{marginRight : "20px" , marginBottom : "24px"}} />

        <Stack mb={16} >
          {items.map((item , i) => {
            return (
              <Link key={i} to={item.link} onClick={() => setActive(false)}>
                <Stack direction={"row"} alignItems={"center"} spacing={4} pl={10} py={7} color={"#434E58"} sx={itemStyle}>
                  <Typography variant="subtitle" > {item.name} </Typography>
                </Stack>
              </Link>
            )
          })}
          {cats?.map((item , i) => {
              return <GCategory key={i} item={item} itemStyle={itemStyle} setNav={setActive} />
          })}
          {items2.map((item , i) => {
            return (
              <Link key={i} to={item.link} onClick={() => setActive(false)}>
                <Stack direction={"row"} alignItems={"center"} spacing={4} pl={10} py={7} color={"#434E58"} sx={itemStyle}>
                  <Typography variant="subtitle" > {item.name} </Typography>
                </Stack>
              </Link>
            )
          })}
        </Stack>

        <Stack px={10}> <Button variant="contained" sx={{py : "16px"}} onClick={() => {navigate("/products") ; setActive(false)}} > جميع المنتجات </Button> </Stack>

        <IconButton color="primary" sx={{ position : "absolute" , right : "10px" , top : "10px" }} onClick={() => setActive(false)} > <ClearIcon /> </IconButton>

      </Stack>
    </Stack>
  )
}


const GCategory = ({item , itemStyle , setNav}) => {

  const [active, setActive] = useState(false)
  
  return (
    <>
      <Stack spacing={4} direction={"row"} alignItems={"center"} px={4} height={"100%"} pl={10} py={7} color={"#434E58"} sx={itemStyle} position={"relative"} onClick={() => setActive(!active)} justifyContent={"space-between"}>
          <Typography variant="button" noWrap >{item.name}</Typography>
          <Link to={"/general-category/" + item?.id} onClick={() => {setNav(false) ; setActive(false)}} ><IconButton color="primary" > <LinkIcon /> </IconButton></Link>
      </Stack>
      {active && <Category cats={item?.categories} itemStyle={itemStyle} setNav={setNav} />}
    </>
  )
}

const Category = ({cats , itemStyle , setNav}) => {

  const [active, setActive] = useState(false)
  const [catId, setCatId] = useState("")
  
  return (
      cats?.map((cat , i) => {
        return (
          <Fragment key={i}>
            <Stack spacing={4} direction={"row"} alignItems={"center"} height={"100%"} pl={16} py={7} color={"#434E58"} sx={itemStyle} position={"relative"} justifyContent={"space-between"} pr={4}
            onClick={() => {setActive(!active) ; setCatId(cat.id)}}>
              <Typography variant="button" noWrap display={"flex"} alignItems={"center"} > 
                <ArrowLeftIcon style={{transition : ".5s" , rotate : (active && catId == cat.id) ? "-90deg" : "0deg"}} /> {cat.name}
              </Typography>
              <Link to={"/category/" + cat?.id} onClick={() => {setNav(false)}} ><IconButton color="primary" > <LinkIcon /> </IconButton></Link>
            </Stack>
            {(active && catId == cat.id && cat?.sub_categories?.length > 0) && <SCategory cats={cat.sub_categories} itemStyle={itemStyle} setNav={setNav} />}
          </Fragment>
        )
      })
  )
}

const SCategory = ({cats , itemStyle , setNav}) => {
  return (
      cats?.map((cat , i) => {
        return (
          <Link key={i} to={"/sub-category/" + cat.id} onClick={() => setNav(false)}>
            <Stack spacing={4} direction={"row"} alignItems={"center"} height={"100%"} pl={32} py={7} color={"#434E58"} sx={itemStyle} position={"relative"}>
              <Typography variant="button" noWrap >{cat.title}</Typography>
            </Stack>
          </Link>
        )
      })
  )
}



export default MobileNav
