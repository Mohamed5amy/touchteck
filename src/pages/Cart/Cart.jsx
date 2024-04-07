import { Box, Breadcrumbs, Button, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import cartImg from "../../images/cart.png"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


const Cart = () => {

  const products = useSelector(state => state.carts.carts)

  // Total
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(0)
    products.map(pro => setTotal(prev => prev + (pro.count * pro.price)))
  } , [products])
  
  return (
    <Stack pt={8} px={{xs : 10 , sm : 20 , md : 10 , lg : 70}} bgcolor={"#ECF1F6"} pb={37} >
      <Breadcrumbs separator=">" sx={{mb : 14}} >
        <Link underline="hover" href="/">
          <Typography color={"#000"} sx={{opacity : ".5"}} variant="breadcrumbs" > الرئيسية </Typography>
        </Link>
        <Typography color="#000" variant="breadcrumbs"> عربة التسوق </Typography>
      </Breadcrumbs>
      {products.length > 0 && <Grid container spacing={20} mb={14}>
        <Grid item xs={12} md={7}>
          <Box bgcolor={"#FCFDFD"} border={"1px solid ECF1F6"} borderRadius={"16px"} p={"24px 16px"} overflow={"scroll"} >
            <Stack direction={"row"} alignItems={"center"} spacing={2} mb={10}>
              <Typography variant="h4" color={"#02111D"} > عربة التسوق الخاصة بك </Typography>
              <Typography variant="subtitle" color={"#78828A"} > ({products?.length} من المنتجات) </Typography>
            </Stack>
            <Stack spacing={8} minWidth={560}>
              <Stack p={12} borderRadius={"8px"} bgcolor={"#FFF"} direction={"row"} justifyContent={"space-between"} spacing={12} >
                <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={2} >المنتج</Typography>
                <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={1} >اللون</Typography>
                <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={1} >السعر</Typography>
                <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={1} >الكمية</Typography>
                <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={1} >المجموع</Typography>
              </Stack>
              {products?.map(product => {
                return (
                  <Stack p={12} borderRadius={"8px"} bgcolor={"#FFF"} direction={"row"} justifyContent={"space-between"} spacing={12} alignItems={"center"} key={product.id} >
                    <Stack alignItems={"center"} flex={2} direction={"row"} spacing={4} >
                      <img src={"https://backend.touchtechco.com/public/" + product?.details?.images[0].url} alt="Cart Image" width={54} height={54} style={{objectFit : "contain"}} />
                      <Typography lineHeight={"24px"} color={"#000"} > {product?.details?.title} </Typography>
                    </Stack>
                    <Typography lineHeight={"24px"} color={"#000"} flex={1} > {product?.color.title}</Typography>
                    <Typography lineHeight={"24px"} color={"#000"} flex={1} > {product?.details?.price} جنيه</Typography>
                    <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={1} > {product?.count} </Typography>
                    <Typography fontWeight={600} lineHeight={"24px"} color={"primary"} flex={1} > {product.count * product.price} جنيه</Typography>
                  </Stack>
                )
              })}
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box bgcolor={"#FCFDFD"} border={"1px solid ECF1F6"} borderRadius={"16px"} p={"24px 16px"} >
            <Typography variant="h4" color={"#02111D"}> الحساب </Typography>
            <Stack direction={"row"} justifyContent={"space-between"} py={12} borderBottom={"1px solid rgba(0, 0, 0, 0.20)"} >
              <Typography color={"#000"} > المجموع: </Typography>
              <Typography color={"#000"} > {total} جنيه </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} py={12} borderBottom={"1px solid rgba(0, 0, 0, 0.20)"} >
              <Typography color={"#000"} > التوصيل: </Typography>
              <Typography color={"#000"} > مجاني </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} pt={12} pb={16}>
              <Typography color={"#000"} > المجموع الكلي: </Typography>
              <Typography color={"#000"} > {total} جنيه </Typography>
            </Stack>
            <Link to={"/check"} >
              <Button variant="contained" sx={{py : "16px" , borderRadius : "8px"}} fullWidth >
                اكمال عملية الدفع 
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>}
      {products.length > 0 && <Link to={"/products"} >
        <Button variant="outlined" sx={{p : "16px 48px" , width : {xs : "100%" , sm : "fit-content"} , borderRadius : "8px"}} > العودة الى المتجر </Button>
      </Link>}
      {products.length == 0 && <Stack alignItems={"center"} spacing={24} pt={16}>
        <img src={cartImg} alt="Wish list No Item" />
        <Stack spacing={4} alignItems={"center"} >
          <Typography variant="h2" color={"#02111D"} textAlign={"center"} > لا يوجد اي منتجات في العربة </Typography>
          <Typography variant="subtitle" color={"#242432"} textAlign={"center"} >اذهب للتسوق و اضف بعض المنتجات</Typography>
        </Stack>
        <Link to={"/products"} >
          <Button variant="contained" sx={{p : {xs : "16px 70px" , sm : "16px 120px"} , borderRadius : "8px"}} > اكمال التسوق </Button>
        </Link>
      </Stack>}
    </Stack>
  )
}

export default Cart
