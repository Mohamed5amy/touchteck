import { Stack, Typography } from "@mui/material";
import logo from "../../images/logo.svg"
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";

import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import useLang from "../../hooks/useLang";




const Middle = ({active , setActive}) => {

  return (
    <>
      <Stack py={8} direction={"row"} alignItems={"center"} justifyContent={"space-between"} spacing={{xs : 0 , md : 30 , lg : 50 , xl : 80}} borderBottom={"1px solid"} borderColor={"primary.border"} px={{ xs : 10 , sm : 20 , md : 10 , lg : 70 }} display={{xs : "none" , md : "flex"}} >
        <Stack minWidth={"120px"} maxWidth={"170px"}> <Link to={"/"} ><img src={logo} alt="" /></Link> </Stack>
        <Search />
        <Icons setActive={setActive} />
      </Stack>
      <Cart active={active} setActive={setActive} />
    </>
  )
}

const Icons = ({setActive}) => {

  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()
  const isEn = useLang()

  const name = JSON.parse(localStorage.getItem("user"))?.name?.split(" ")[0]
  
  return (
    <Stack direction={"row"} spacing={8} >
      {/* Login */}
      <Link to={isAuthenticated() ? "/profile" : "/login"} >
        <Stack direction={"row"} spacing={2} alignItems={"center"} pr={8} borderRight={"1px solid"} borderColor={"primary.border"} color={"#434E58"} sx={{transition : ".5s" , "&:hover" : {color : "primary.secondary"}}} >
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
          {isEn ? <Typography variant="breadcrumb" style={{textTransform : "capitalize"}} > {isAuthenticated() ? (name && "Hi, " + name || "profile") : "Login"} </Typography> : <Typography variant="breadcrumb" style={{textTransform : "capitalize"}} > {isAuthenticated() ? (name && "مرحبا, " + name || "الملف الشخصي") : "تسجيل الدخول"} </Typography>}
        </Stack>
      </Link>
      {/* Fav */}
      <Link to={isAuthenticated() ? "/wishlist" : "/login"} >
        <Stack direction={"row"} spacing={2} alignItems={"center"} pr={8} borderRight={"1px solid"} borderColor={"primary.border"} color={"#434E58"} sx={{transition : ".5s" , "&:hover" : {color : "primary.secondary"}}} >
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
          <Typography variant="breadcrumb" > {isEn ? "Wishlist" : "المفضلة"} </Typography>
        </Stack>
      </Link>
      {/* Cart */}
      <Stack direction={"row"} spacing={2} alignItems={"center"} color={"#434E58"} sx={{transition : ".5s" , "&:hover" : {color : "primary.secondary"} , cursor : "pointer"}} onClick={() => {
        isAuthenticated() ? setActive(true) : navigate("/login")
      }} >
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
        <Typography variant="breadcrumb"> {isEn ? "Cart" : "عربة التسوق"} </Typography>
      </Stack>
    </Stack>
  )
}

export default Middle
