import { Button, IconButton, Stack, Typography } from "@mui/material";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { DEL_CART, GET_CARTS } from "../../store/cartsSlice"
import useLang from "../../hooks/useLang";


const Cart = ({active , setActive}) => {

  const dispatch = useDispatch()
  const products = useSelector(state => state.carts.carts)

  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "getActive", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            dispatch(GET_CARTS(res.data.data.Cart?.products))
        })
        .catch((err) => {
            console.log(err);
        })
  }, [dispatch]);
  // Total
  const [total, setTotal] = useState(0)
  useEffect(() => {
    setTotal(0)
    products.map(pro => setTotal(prev => prev + (pro.count * pro.price)))
  } , [products])

  const isEn = useLang()
  
  return (
    <Stack position={"fixed"} width={active ? "100%" : "0px"} overflow={"hidden"} height={"100vh"} bgcolor={"#13131bad"} right={0} top={0} zIndex={100} ml={0} sx={{transition : ".5s"}} >
      <Stack position={"absolute"} left={0} top={0} height={"100vh"} width={{xs : 350 , sm : 500}} bgcolor={"primary.whiteBg"} p={{xs : 12 , sm : 20}}>
        <Stack direction={{xs : "column", sm : "row"}} alignItems={"center"} spacing={3} pb={4} borderBottom={"1px solid"} borderColor={"primary.border"} mb={12}>
          <Typography variant="h4" > {isEn ? "Your Cart" :"عربة التسوق الخاصة بك"}</Typography>
          <Typography variant="subtitle" color={"text.secondary"} >({products?.length} {isEn ? "Products" : "من المنتجات"})</Typography>
        </Stack>
        {/* Products */}
        {products.length > 0 && <Stack spacing={12} pb={12} mb={12} borderBottom={"1px solid"} borderColor={"primary.border"} maxHeight={350} overflow={"scroll"} >
          {products && products.map(product => {
            return (
              <CartProduct key={product.id} product={product} />
            )
          })}
        </Stack>}
        {/* Price */}
        {products.length > 0 && <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} mb={6} >
          <Typography variant="subtitle" >{isEn ? "Delivery" :"التوصيل"}</Typography>
          <Typography variant="title" > {isEn ? "Free" :"مجاني"} </Typography>
        </Stack>}
        {products.length > 0 && <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} mb={24} >
          <Typography variant="subtitle" >{isEn ? "Sub Total" :"المجموع"}</Typography>
          <Typography variant="title" > {total} ₪</Typography>
        </Stack>}
        {products.length == 0 && <Typography fontSize={20} fontWeight={500} color={"text.third"} mb={8} > {isEn ? "No products in your cart untill now go add some" :"لا يوجد منتجات حتي الان في عربة التسوق الخاصة بك اضف بعض المنتجات الان!"} </Typography>}
        {/* Buttons */}
        <Stack direction={{xs : "column" , sm : "row"}} spacing={4} justifyContent={"space-between"} >
          {products.length > 0 && <Link to={"/cart"} >
          <Button variant="contained" sx={{ py : 8 , borderRadius : "8px" , width : {xs : "100%" , sm : "190px"} }} onClick={() => setActive(false)}> {isEn ? "Checkout" :"الحساب"} </Button>
          </Link>}
          <Button variant="outlined" sx={{ py : 8 , borderRadius : "8px" , width : {xs : "100%" , sm : "190px"} }} onClick={() => setActive(false)} > {isEn ? "Continue Shopping" : "اكمل التسوق"} </Button>
        </Stack>
        {/* Close */}
        <IconButton sx={{ position : "absolute" , right : 10 , top : 10 }} onClick={() => setActive(false)} > <CloseRoundedIcon /> </IconButton>
      </Stack>
    </Stack>
  )
}

const CartProduct = ({product}) => {

  const dispatch = useDispatch()

  const handleDel = () => {
    axios
        .post(import.meta.env.VITE_API + "removeProductFromCart", {product_id : product.details.id , color_id : product.color.id} , {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            console.log(res.data.data);
            dispatch(DEL_CART(product.id))
        })
        .catch((err) => {
            console.log(err);
        })
  }

  const isEn = useLang()
  
  return (
    <Stack direction={"row"} spacing={8} alignItems={"center"} position={"relative"} >
      {/* Image */}
      <Stack borderRadius={"8px"} overflow={"hidden"} width={120} height={120}> 
      <img src={"https://backend.touchtechco.com/public/" + product?.details?.images[0]?.url} alt="product" height={"100%"} style={{objectFit : "contain"}} /></Stack>
      {/* Content */}
      <Stack maxWidth={"180px"} spacing={2} >
        <Typography variant="label" > {product?.details?.title} </Typography>
        <Typography variant="button" > {product?.details?.price} ₪ </Typography>
        <Typography variant="inputs" color={"text.secondary"} > 
        {isEn ? "Count" : "الكمية"}: <strong> {product?.count} </strong> , 
        {isEn ? "Color" : "اللون"}: <strong> {product?.color?.title} </strong>
        </Typography>
      </Stack>
      {/* Delete */}
      <IconButton color="error" sx={{ position : "absolute" , right : 0 , top : -10 }} onClick={() => handleDel()} > <DeleteOutlineRoundedIcon /> </IconButton>
    </Stack>
  )
}

export default Cart
