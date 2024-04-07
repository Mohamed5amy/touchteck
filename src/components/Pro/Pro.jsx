import { Box, IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_FAV , DEL_FAV } from "../../store/favSlice";
import { ADD_CART } from "../../store/cartsSlice";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";



const Pro = ({product , fav}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()

  const [checkFav, setCheckFav] = useState(false)
  const [onCart, setOnCart] = useState(false)

  useEffect(() => {
    product.is_favorite ? setCheckFav(true) : setCheckFav(false)
    fav && setCheckFav(true)
  } , [product , fav])

  useEffect(() => {
    product.on_cart ? setOnCart(true) : setOnCart(false)
  } , [product])

  // Cart
  const [active, setactive] = useState(false)

  // Handle Fav
  const addToFav = () => {
    if(isAuthenticated()) {
      axios
      .post(import.meta.env.VITE_API + "favorite", {
        product_id : product.id,
      } , {
          headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
          },
      })
      .then((res) => {
          console.log(res.data);
          if (checkFav) {
            dispatch(DEL_FAV(product.id))
            setCheckFav(false)
          } else {
            dispatch(ADD_FAV(res.data.data.Product)) 
            setCheckFav(true)
          }
      })
      .catch((err) => {
          console.log(err);
      })
    } else {
      navigate("/login")
    }
  }

  // HandleCart
  const handleAddToCart = () => {
      if(isAuthenticated()) {
        axios
        .post(import.meta.env.VITE_API + "addProductToCart", {
          product_id : product.id,
          count : "1",
          price : product.price,
          plus : 1
        } , {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            console.log(res.data.data);
            setOnCart(true)
            const newPro = res.data.data.Cart.products
            dispatch(ADD_CART(newPro[newPro.length - 1]))
        })
        .catch((err) => {
            console.log(err);
        })
      } else {
        navigate("/login")
      }
  }
  
  return (
    <>
      <Box position={"relative"} >
        <Stack width={"100%"} sx={{aspectRatio : (270 / 250) }} bgcolor={"#F5F5F5"} borderRadius={"12px"} 
        mb={8} position={"relative"} overflow={"hidden"} onMouseEnter={() => setactive(true)} onMouseLeave={() => setactive(false)} >

          <Link to={`/products/${product.id}`} style={{position : "absolute" , left : "0" , top : 0 , width : "100%" , height : "100%"}}>
            <Stack p={{xs : "16px" , sm : "35px 50px"}} alignItems={"center"} justifyContent={"center"} height={"100%"} width={"100%"} > 
              <img src={"https://backend.touchtechco.com/public/" + product?.images[0]?.url} alt="" />
            </Stack>
          </Link>
          {/* 
          {!onCart ? <Stack direction={"row"} alignItems={"center"} spacing={5} position={"absolute"} bottom={active ? 0 : -50} left={0} width={"100%"} bgcolor={"primary.main"} zIndex={2} py={4} justifyContent={"center"} sx={{transition : ".5s" , "&:hover" : { bgcolor : "secondary.main" , cursor : "pointer"}}} onClick={handleAddToCart} >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5.694 6.43C15.542 5.093 17.97 5.257 19.5 7c1.53 1.743 1.172 7.488-.617 9.087-1.788 1.6-9.553 1.751-12.013 0-2.599-1.85-1.09-7.545-1.176-10.994C5.745 3.163 3.65 2.85 3.65 2.85M14.156 10.72h2.773"
              ></path>
              <path
                fill="#fff"
                fillRule="evenodd"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M7.264 20.128a.545.545 0 11-.001 1.089.545.545 0 01.001-1.09zM17.596 20.128a.545.545 0 110 1.09.545.545 0 010-1.09z"
                clipRule="evenodd"
              ></path>
            </svg>
            <Typography fontWeight={500} lineHeight={"24px"} color={"white"} > اضف لعربة التسوق </Typography>
          </Stack>
          :
          <Stack direction={"row"} alignItems={"center"} spacing={5} position={"absolute"} bottom={active ? 0 : -50} left={0} width={"100%"} bgcolor={"primary.main"} zIndex={2} py={4} justifyContent={"center"} sx={{transition : ".5s"}}>
            <CheckCircleIcon color="secondary" />
            <Typography fontWeight={500} lineHeight={"24px"} color={"white"} > المنتج موجود فى العربة </Typography>
          </Stack> } */}

        </Stack>
        <Typography fontWeight={500} mb={4} fontSize={{xs : 14 , sm : 16}} > {product?.title} </Typography>
        <Typography fontWeight={600} fontSize={{xs : 16 , sm : 18}} color={"primary"} > {product?.price} جنية </Typography>
        <IconButton className={checkFav ? "active" : ""} sx={{position : "absolute" , top : 8 , right : 8 , color : "#9EA7B8" , "&:hover , &.active" : {color : "red"}}} color="error" onClick={() => addToFav()}>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill={checkFav ? "red" : "none"}
              viewBox="0 0 22 22"
          >
            <path
              fillRule="evenodd"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.842"
              d="M3.086 11.39c-.936-2.921.158-6.552 3.225-7.54 1.612-.52 3.603-.086 4.733 1.474 1.067-1.617 3.114-1.99 4.726-1.473 3.065.987 4.165 4.618 3.23 7.538-1.456 4.63-6.535 7.04-7.956 7.04-1.419 0-6.453-2.357-7.958-7.04z"
              clipRule="evenodd"
            ></path>
            <path
              stroke={checkFav ? "white" : "currentColor"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.842"
              d="M14.303 7.133c1.052.108 1.71.942 1.671 2.111"
            ></path>
          </svg>
        </IconButton>
      </Box>
    </>
  )
}

export default Pro