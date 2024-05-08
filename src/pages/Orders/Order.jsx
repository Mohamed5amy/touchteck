import { Box, Breadcrumbs, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { Link , useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useLang from "../../hooks/useLang";


const Order = () => {
  

  const {id} = useParams()
  
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios
        .get(import.meta.env.VITE_API + "getCartForClient", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            console.log(res.data.data.Cart.filter(item => item.id == id)[0]);
            setProducts(res.data.data.Cart.filter(item => item.id == id)[0]);
        })
        .catch((err) => {
            console.log(err);
        })
  }, [id]);
  
  // Total
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(0)
    products?.products?.map(pro => setTotal(prev => prev + (pro.count * pro.price)))
  } , [products])

  const isEn = useLang()

  
  return (
    <Stack pt={8} px={{xs : 10 , sm : 20 , md : 10 , lg : 70}} bgcolor={"#ECF1F6"} pb={37} >
      <Breadcrumbs separator=">" sx={{mb : 14}} >
        <Link underline="hover" href="/">
          <Typography color={"#000"} sx={{opacity : ".5"}} variant="breadcrumbs" > {isEn ? "Home" :"الرئيسية"} </Typography>
        </Link>
        <Typography color="#000" variant="breadcrumbs"> {isEn ? "Order Details" :"تفاصيل الطلب "}</Typography>
      </Breadcrumbs>
      {products?.products?.length > 0 && <Grid container spacing={20} mb={14}>
        <Grid item xs={12} md={7}>
          <Box bgcolor={"#FCFDFD"} border={"1px solid ECF1F6"} borderRadius={"16px"} p={"24px 16px"} overflow={"scroll"} >
            <Stack direction={"row"} alignItems={"end"} justifyContent={"space-between"}  mb={10}>
              <Stack direction={{xs : "column" , sm : "row"}} alignItems={{xs : "start" , sm : "center"}} spacing={2}>
                <Typography variant="h4" color={"#02111D"} > {isEn ? "Your Order Details" :"تفاصيل الطلب الخاص بك"} </Typography>
                <Typography variant="subtitle" color={"#78828A"} > ({products?.products?.length} {isEn ? "Products" :"من المنتجات"}) </Typography>
              </Stack>
              <Typography variant="subtitle" color={"#78828A"} > {products?.status} </Typography>
            </Stack>
            <Stack spacing={8} minWidth={560}>
              <Stack p={12} borderRadius={"8px"} bgcolor={"#FFF"} direction={"row"} justifyContent={"space-between"} spacing={12} >
                <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={2} >{isEn ? "Product" : "المنتج"}</Typography>
                <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={1} >{isEn ? "Color" : "اللون"}</Typography>
                <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={1} >{isEn ? "Price" : "السعر"}</Typography>
                <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={1} >{isEn ? "Count" : "الكمية"}</Typography>
                <Typography fontWeight={500} lineHeight={"24px"} color={"#000"} flex={1} >{isEn ? "Total" : "المجموع"}</Typography>
              </Stack>
              {products?.products?.map(product => {
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
          <Box mb={8} bgcolor={"#FCFDFD"} border={"1px solid ECF1F6"} borderRadius={"16px"} p={"24px 16px"} >
            <Typography variant="h4" color={"#02111D"}> الحساب </Typography>
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
          </Box>
          <Box bgcolor={"#FCFDFD"} border={"1px solid ECF1F6"} borderRadius={"16px"} p={"24px 16px"} >
            <Stack direction={"row"} spacing={4} alignItems={"center"} mb={8} >
              <Typography variant="h4" color={"#02111D"}> {isEn ? "Address" :"العنوان"} </Typography>
              <Typography fontSize={14} color={"#66707A"}> ({products?.address.label}) </Typography>
            </Stack>
            <Stack direction={"row"} spacing={8} mb={8}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                fill="none"
                viewBox="0 0 24 25"
              >
                <path
                  fill="#66707A"
                  d="M11.999 14.876c-2.13 0-3.87-1.73-3.87-3.87s1.74-3.86 3.87-3.86 3.87 1.73 3.87 3.87-1.74 3.86-3.87 3.86zm0-6.23c-1.3 0-2.37 1.06-2.37 2.37s1.06 2.37 2.37 2.37 2.37-1.06 2.37-2.37-1.07-2.37-2.37-2.37z"
                ></path>
                <path
                  fill="#66707A"
                  d="M12.002 23.466a5.97 5.97 0 01-4.13-1.67c-2.95-2.84-6.21-7.37-4.98-12.76 1.11-4.89 5.38-7.08 9.11-7.08h.01c3.73 0 8 2.19 9.11 7.09 1.22 5.39-2.04 9.91-4.99 12.75a5.97 5.97 0 01-4.13 1.67zm0-20.01c-2.91 0-6.65 1.55-7.64 5.91-1.08 4.71 1.88 8.77 4.56 11.34a4.425 4.425 0 006.17 0c2.67-2.57 5.63-6.63 4.57-11.34-1-4.36-4.75-5.91-7.66-5.91z"
                ></path>
              </svg>
              <Stack spacing={4} >
                <Typography fontSize={18} fontWeight={600} lineHeight={"140%"} color={"#02111D"} >
                  {products.address.first_name + " " + products.address.last_name}
                </Typography>
                <Typography fontSize={15} fontWeight={400} lineHeight={"140%"} color={"#66707A"} maxWidth={250} > {products.address.address}</Typography>
              </Stack>
            </Stack>
            <Stack direction={"row"} spacing={8} alignItems={"center"}>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 23.4558H9C4.59 23.4558 3.25 22.1158 3.25 17.7058V7.70581C3.25 3.29581 4.59 1.95581 9 1.95581H15C19.41 1.95581 20.75 3.29581 20.75 7.70581V17.7058C20.75 22.1158 19.41 23.4558 15 23.4558ZM9 3.45581C5.42 3.45581 4.75 4.13581 4.75 7.70581V17.7058C4.75 21.2758 5.42 21.9558 9 21.9558H15C18.58 21.9558 19.25 21.2758 19.25 17.7058V7.70581C19.25 4.13581 18.58 3.45581 15 3.45581H9Z" fill="#66707A"/>
                <path d="M14 6.95581H10C9.59 6.95581 9.25 6.61581 9.25 6.20581C9.25 5.79581 9.59 5.45581 10 5.45581H14C14.41 5.45581 14.75 5.79581 14.75 6.20581C14.75 6.61581 14.41 6.95581 14 6.95581Z" fill="#66707A"/>
                <path d="M11.9992 20.5658C10.7292 20.5658 9.69922 19.5358 9.69922 18.2658C9.69922 16.9958 10.7292 15.9658 11.9992 15.9658C13.2692 15.9658 14.2992 16.9958 14.2992 18.2658C14.2992 19.5358 13.2692 20.5658 11.9992 20.5658ZM11.9992 17.4558C11.5592 17.4558 11.1992 17.8158 11.1992 18.2558C11.1992 18.6958 11.5592 19.0558 11.9992 19.0558C12.4392 19.0558 12.7992 18.6958 12.7992 18.2558C12.7992 17.8158 12.4392 17.4558 11.9992 17.4558Z" fill="#66707A"/>
                </svg>
                <Typography fontSize={16} fontWeight={600} lineHeight={"140%"} color={"#02111D"} > {products?.address.mobile} </Typography>
            </Stack>
            {/* <Button variant="contained" sx={{py : "16px" , borderRadius : "8px", mt : 16}} color="error" fullWidth >
              الغاء الطلب
            </Button> */}
          </Box>
        </Grid>
      </Grid>}
      {products.length == 0 && <Stack alignItems={"center"} spacing={24} pt={16}>
        <CircularProgress />
      </Stack>}
    </Stack>
  )
}

export default Order
