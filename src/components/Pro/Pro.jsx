import { Box, IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_FAV , DEL_FAV } from "../../store/favSlice";
import { ADD_CART } from "../../store/cartsSlice";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";



const Pro = ({product , fav , newP}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()

  const [checkFav, setCheckFav] = useState(false)

  useEffect(() => {
    product.is_favorite ? setCheckFav(true) : setCheckFav(false)
    fav && setCheckFav(true)
  } , [product , fav])

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

  
  return (
    <>
      <Box position={"relative"} >
        <Stack width={"100%"} sx={{aspectRatio : (270 / 250) }} bgcolor={"#F5F5F5"} borderRadius={"12px"} 
        mb={8} position={"relative"} overflow={"hidden"} >

          <Link to={`/products/${product.id}`} style={{position : "absolute" , left : "0" , top : 0 , width : "100%" , height : "100%"}}>
            <Stack p={{xs : "16px" , sm : "35px 50px"}} alignItems={"center"} justifyContent={"center"} height={"100%"} width={"100%"} > 
              <img src={"https://backend.touchtechco.com/public/" + product?.images[0]?.url} alt="" />
            </Stack>
          </Link>

        </Stack>
        <Typography fontWeight={500} mb={4} fontSize={{xs : 14 , sm : 16}} > {product?.title} </Typography>
        <Typography fontWeight={600} fontSize={{xs : 16 , sm : 18}} color={"primary"} > {product?.price} ₪ </Typography>
        <Stack sx={{position : "absolute" , top : 8}} direction={"row"} alignItems={"center"} justifyContent={"space-between"} width={"100%"} px={8} >
          {newP ? <Typography fontSize={12} color={"#FAFAFA"} bgcolor={"primary.secondary"} p={"4px 12px"} borderRadius={"8px"}> جديدنا </Typography> : <Stack></Stack>}
          <IconButton className={checkFav ? "active" : ""} sx={{color : "#9EA7B8" , "&:hover , &.active" : {color : "red"}}} color="error" onClick={() => addToFav()}>
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
        </Stack>
      </Box>
    </>
  )
}

export default Pro