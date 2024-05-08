import { Box, Breadcrumbs, Button, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import cartImg from "../../images/cart.png"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useLang from "../../hooks/useLang";


const Cart = () => {

  const products = useSelector(state => state.carts.carts)

  // Total
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(0)
    products.map(pro => setTotal(prev => prev + (pro.count * pro.price)))
  } , [products])

  const isEn = useLang()
  
  return (
    <Stack pt={8} px={{xs : 10 , sm : 20 , md : 10 , lg : 70}} bgcolor={"#ECF1F6"} pb={37} >
      <Breadcrumbs separator=">" sx={{mb : 14}} >
        <Link underline="hover" href="/">
        <Typography color={"#000"} sx={{opacity : ".5"}} variant="breadcrumbs" > {isEn ? "Home" :"الرئيسية"} </Typography>
        </Link>
        <Typography color="#000" variant="breadcrumbs"> {isEn ? "Cart" : "عربة التسوق"}</Typography>
      </Breadcrumbs>
      {products.length > 0 && <Grid container spacing={20} mb={14}>
        <Grid item xs={12} md={7}>
          <Box bgcolor={"#FCFDFD"} border={"1px solid ECF1F6"} borderRadius={"16px"} p={"24px 16px"} overflow={"scroll"} >
            <Stack direction={{xs : "column" , sm : "row"}} alignItems={{xs : "start" , sm : "center"}} spacing={2} mb={10}>
              <Typography variant="h4" color={"#02111D"} > {isEn ? "Your Cart" :"عربة التسوق الخاصة بك"} </Typography>
              <Typography variant="subtitle" color={"#78828A"} > ({products?.length} {isEn ? "Products" : "من المنتجات"}) </Typography>
            </Stack>
            <Stack spacing={8} minWidth={560}>
              <Stack p={12} borderRadius={"8px"} bgcolor={"#FFF"} direction={"row"} justifyContent={"space-between"} spacing={12} >
                <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={2} >{isEn ? "Product" : "المنتج"}</Typography>
                <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={1} >{isEn ? "Color" : "اللون"}</Typography>
                <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={1} >{isEn ? "Price" : "السعر"}</Typography>
                <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={1} >{isEn ? "Count" : "الكمية"}</Typography>
                <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={1} >{isEn ? "Total" : "المجموع"}</Typography>
              </Stack>
              {products?.map(product => {
                return (
                  <Stack p={12} borderRadius={"8px"} bgcolor={"#FFF"} direction={"row"} justifyContent={"space-between"} spacing={12} alignItems={"center"} key={product.id} >
                    <Stack alignItems={"center"} flex={2} direction={"row"} spacing={4} >
                      <img src={"https://backend.touchtechco.com/public/" + product?.details?.images[0].url} alt="Cart Image" width={54} height={54} style={{objectFit : "contain"}} />
                      <Typography lineHeight={"24px"} color={"#000"} > {product?.details?.title} </Typography>
                    </Stack>
                    <Typography lineHeight={"24px"} color={"#000"} flex={1} > {product?.color.title}</Typography>
                    <Typography lineHeight={"24px"} color={"#000"} flex={1} > {product?.details?.price} ₪</Typography>
                    <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={1} > {product?.count} </Typography>
                    <Typography fontWeight={600} lineHeight={"24px"} color={"primary"} flex={1} > {product.count * product.price} ₪</Typography>
                  </Stack>
                )
              })}
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box bgcolor={"#FCFDFD"} border={"1px solid ECF1F6"} borderRadius={"16px"} p={"24px 16px"} >
            <Typography variant="h4" color={"#02111D"}> {isEn ? "Checkout" :"الحساب"} </Typography>
            <Stack direction={"row"} justifyContent={"space-between"} py={12} borderBottom={"1px solid rgba(0, 0, 0, 0.20)"} >
              <Typography color={"#000"} > {isEn ? "Sub Total" :"المجموع"}: </Typography>
              <Typography color={"#000"} > {total} ₪ </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} py={12} borderBottom={"1px solid rgba(0, 0, 0, 0.20)"} >
              <Typography color={"#000"} > {isEn ? "Delivery" :"التوصيل"}: </Typography>
              <Typography color={"#000"} > {isEn ? "Free" :"مجاني"} </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} pt={12} pb={16}>
              <Typography color={"#000"} > {isEn ? "Total" :"المجموع الكلي"}: </Typography>
              <Typography color={"#000"} > {total} ₪ </Typography>
            </Stack>
            <Link to={"/check"} >
              <Button variant="contained" sx={{py : "16px" , borderRadius : "8px"}} fullWidth >
                {isEn ? "Continue" : "استمرار"} 
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>}
      {products.length > 0 && <Link to={"/products"} >
        <Button variant="outlined" sx={{p : "16px 48px" , width : {xs : "100%" , sm : "fit-content"} , borderRadius : "8px"}} > {isEn ? "Back to shop" :"العودة الى المتجر"} </Button>
      </Link>}
      {products.length == 0 && <Stack alignItems={"center"} spacing={24} pt={16}>
        <img src={cartImg} alt="Wish list No Item" />
        <Stack spacing={4} alignItems={"center"}>
          <Typography variant="h2" color={"#02111D"} textAlign={"center"} > {isEn ? "Don’t have any products" :"لا يوجد اي منتجات في المفضلة"} </Typography>
          <Typography variant="subtitle" color={"#242432"} textAlign={"center"} >{isEn ? "Go to shopping and add products." :"اذهب للتسوق و اضف بعض المنتجات"}</Typography>
        </Stack>
        <Link to={"/products"}>
          <Button variant="contained" sx={{p : {xs : "16px 70px" , sm : "16px 120px"} , borderRadius : "8px"}} > {isEn ? "Continue Shopping" :"اكمال التسوق "}</Button>
        </Link>
      </Stack>}
    </Stack>
  )
}

export default Cart
