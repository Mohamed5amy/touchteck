import { Box, Breadcrumbs, Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Pro from "../../components/Pro/Pro";
import wish from "../../images/wish.png"
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GET_FAV } from "../../store/favSlice";
import useLang from "../../hooks/useLang";



const WishList = () => {

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const fav = useSelector(state => state.fav.fav)

  useEffect(() => {
    setLoading(true)
    axios
        .get(import.meta.env.VITE_API + "favorite", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            console.log(res.data.data.Product);
            dispatch(GET_FAV(res.data.data.Product))
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => setLoading(false))
  }, [dispatch]);

  const isEn = useLang()

  
  return (
    <Stack pt={8} px={{xs : 10 , sm : 20 , md : 10 , lg : 70}} bgcolor={"#F8FAFC"} >
      <Breadcrumbs separator=">" sx={{mb : 14}} >
        <Link underline="hover" to="/">
        <Typography color={"#000"} sx={{opacity : ".5"}} variant="breadcrumbs" > {isEn ? "Home" :"الرئيسية"} </Typography>
        </Link>
        <Typography color="#000" variant="breadcrumbs"> {isEn ? "Wishlist" :"المفضلة"} </Typography>
      </Breadcrumbs>
      {!loading ? <Box pt={24} pb={65}>
        {fav?.length > 0 && <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} mb={16}>
          <Typography fontSize={20}> {isEn ? "Wishlist" :"المفضلة"} : <span style={{color : "#0A5C99"}} >{fav?.length}</span> </Typography>
          {/* <Button variant="outlined" sx={{p : "16px 28px" , borderRadius :"12px"}} > اضف </Button> */}
        </Stack>}
        {fav?.length > 0 && <Grid container spacing={{xs : 8 , sm : 15}}>
          {fav?.map(pro => {
            return(
              <Grid item xs={6} md={4} lg={3} key={pro.id} >
                <Pro product={pro} fav={true} />
              </Grid>
            )
          })}
        </Grid>}
        {fav?.length == 0 && <Stack alignItems={"center"} spacing={24} pt={16}>
          <img src={wish} alt="Wish list No Item" />
          <Stack spacing={4} alignItems={"center"}>
            <Typography variant="h2" color={"#02111D"} textAlign={"center"} > {isEn ? "Don’t have any products" :"لا يوجد اي منتجات في المفضلة"} </Typography>
            <Typography variant="subtitle" color={"#242432"} textAlign={"center"} >{isEn ? "Go to shopping and add products." :"اذهب للتسوق و اضف بعض المنتجات"}</Typography>
          </Stack>
          <Link to={"/products"}>
            <Button variant="contained" sx={{p : {xs : "16px 70px" , sm : "16px 120px"} , borderRadius : "8px"}} > {isEn ? "Continue Shopping" :"اكمال التسوق "}</Button>
          </Link>
        </Stack>},
      </Box> : <Stack alignItems={"center"} py={60}><CircularProgress /></Stack>}
    </Stack>
  )
}

export default WishList
